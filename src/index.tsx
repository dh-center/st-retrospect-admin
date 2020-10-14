import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App/index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

if (process.env.REACT_APP_MAPBOX_ACCESS_TOKEN) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
} else {
  console.warn('You must provide Mapbox access token to work with map');
}

if (process.env.REACT_APP_SENTRY_DNS) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DNS,
  });
} else {
  console.warn('You must provide Sentry DNS for tracking errors');
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
