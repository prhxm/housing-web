import fetch from 'node-fetch';
import { supabase } from './src/lib/supabase.js';

// پاک‌سازی آدرس‌ها
function cleanLocation(raw) {
  if (!raw) return '';
  return raw
    .split(/[,;]/)[0]                     // فقط اولین بخش مفید
    .replace(/\d{3,}/g, '')               // حذف پلاک یا کد پستی
    .replace(/Downtown|Not specified/gi, '') // حذف موارد مبهم
    .trim();
}

// گرفتن مختصات
async function geocodeLocation(locationText) {
  const cleaned = cleanLocation(locationText);
  if (!cleaned) return null;

  const baseQuery = `${cleaned}, Vancouver, BC, Canada`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(baseQuery)}&addressdetails=1&limit=1`;

  const response = await fetch(url, {
    headers: {
      'User-Agent': 'housing-heatmap-script'
    }
  });

  const data = await response.json();

  if (
    data.length > 0 &&
    data[0].address &&
    (
      data[0].address.city === 'Vancouver' ||
      data[0].address.town === 'Vancouver' ||
      data[0].address.state === 'British Columbia'
    )
  ) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }

  return null;
}

// اجرای نهایی
async function runGeocoding() {
  const { data: messages, error } = await supabase
    .from('messages')
    .select('id, location')
    .is('lat', null)
    .is('lng', null);

  if (error) {
    console.error('❌ خطا در دریافت پیام‌ها:', error);
    return;
  }

  for (const msg of messages) {
    const coords = await geocodeLocation(msg.location);
    if (coords) {
      console.log(`✅ Updating ID ${msg.id} with:`, coords);
      await supabase
        .from('messages')
        .update({ ...coords, geocode_status: 'success' })
        .eq('id', msg.id);
    } else {
      console.log(`❌ No coords found for: ${msg.location}`);
      await supabase
        .from('messages')
        .update({ geocode_status: 'failed' })
        .eq('id', msg.id);
    }
  }
}

runGeocoding();

