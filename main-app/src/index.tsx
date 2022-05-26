import React from 'react';
import ReactDOM from 'react-dom/client';
import './jslibs/rem'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { registerMicroApps, start } from 'qiankun'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

registerMicroApps([
    {
        name: 'qunar',
        entry: '//localhost:8081',
        container: '#qunarApp',
        activeRule: '/qunar-app',
        props: {
            name: 'qunar'
        }
    },
    {
        name: 'vue',
        entry: '//localhost:8082',
        container: '#vueApp',
        activeRule: '/vue-app',
        props: {
            name: 'vue'
        }
    },
],  {
    beforeLoad: [
        (app): any => {
            console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
        },
    ],
    beforeMount: [
        (app): any => {
            console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
        },
    ],
    afterUnmount: [
        (app): any => {
            console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
        },
    ],
});

start();

reportWebVitals();
