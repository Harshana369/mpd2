// scroll bar
import 'simplebar/src/simplebar.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { StoreProvider } from './Store';
import store from './Redux/store';
import * as serviceWorker from './serviceWorker'; // Add this line
import reportWebVitals from './reportWebVitals'; // Add this line

import App from './App';
// import { AuthProvider } from './context/AuthProvider';

// ----------------------------------------------------------------------

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter basename="/mpd">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
