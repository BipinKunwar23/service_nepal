import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
//  Websocketconnection with pusher and

import Pusher from "pusher-js";
import Echo from "laravel-echo";
window.Pusher = Pusher;
// Pusher.logToConsole = true;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "6a693dbd8c8818c87135",
  cluster: "mt1",
  wsHost: "127.0.0.1",
  wsPort: 6001,
  encrypted: true,
  forceTLS: false,
  disableStats: true,

  enabledTransports: ["ws", "wss"],
  authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// window.Echo.channel(`messenger`).listen("chatEvent", (e) => {
//   console.log(e);
// });

