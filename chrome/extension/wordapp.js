import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/containers/Root';
import './wordapp.css';

chrome.storage.local.get('state', (obj) => {
  const { state } = obj;
  const initialState = JSON.parse(state || '{}');

  const createStore = require('../../app/store/configureStore');

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  );
});


// 메시지 센더 to selection.js
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log('[wordapp] chrome.tabs.query()');
  chrome.tabs.sendMessage(tabs[0].id, { greeting: 'contenthello' }, (response) => {
    console.log('[wordapp] chrome.tabs.sendMessage(): '+response.farewell);
  });
});

function openURL(location) {
  chrome.tabs.create({ url: location });
}

// document.getElementById("linkBtn").addEventListener("click", (e) => {
//   openURL(e.value);
// });

window.addEventListener('DOMContentLoaded', function() {
  console.log('window.addEventListener(DOMContentLoaded)');
  // your button here
  // var link = document.getElementById('btnOpenNewTab');
  // console.log('link:'+JSON.stringify(link));
  // // onClick's logic below:
  // link.addEventListener('click', function() {
  //   console.log('link.addEventListener(click)');
  //     var newURL = "http://stackoverflow.com/";
  //     chrome.tabs.create({ url: newURL });
  // });

  document.addEventListener('DOMContentLoaded', function () {
    for (const anchor of document.getElementsByTagName('a')) {
      anchor.onclick = () => {
        chrome.tabs.create({active: true, url: anchor.href});
      };
    };
  });

});


