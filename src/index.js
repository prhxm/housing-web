import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./App.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


/*
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import './App.css';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
;
const clerkJSUrl = process.env.REACT_APP_CLERK_JS_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={clerkPubKey} clerkJSUrl={clerkJSUrl}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkProvider>
);
*/