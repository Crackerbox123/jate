import { Workbox } from 'workbox-window';
import Editor from './editor';
import { initdb, getDb, putDb } from './database';


// imports from other js files

import "./database";
import "./editor";
import "./header";
import "./install";


// import CSS

import "../css/index.css";

// import bootstrap and popper

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
  
  
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}

window.addEventListener('load', function() {
  initdb();
});
