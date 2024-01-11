import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Firebase from "./Firebase";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
firebase.initializeApp(Firebase);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
	<ToastContainer />
  </React.StrictMode>
);
reportWebVitals();
