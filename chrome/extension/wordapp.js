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
  console.log('[todoapp] chrome.tabs.query()');
  chrome.tabs.sendMessage(tabs[0].id, { greeting: 'contenthello' }, (response) => {
    console.log('[todoapp] chrome.tabs.sendMessage(): '+response.farewell);
  });
});