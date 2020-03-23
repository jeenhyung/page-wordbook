const bluebird = require('bluebird');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
// require('./background/selection');


// 메시지 리스너 from selection.js
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    console.log('[background] chrome.runtime.onMessage.addListener()');
    console.log(sender.tab ? "[background] from a content script:" + sender.tab.url : "[background] from the extension");

    if (request.greeting === 'backgroundhello') {
      console.log("[background] request:" + request.greeting);

      sendResponse({ farewell: 'contentgoodbye' });
    } else if (request.selection !== "") {
      console.log("[background] request:" + request.selection);

      chrome.storage.local.get('state', (obj) => {  // 기존 저장된 리스트 가져오기
        console.log('[badge] obj: ' + JSON.stringify(obj));
        const state = JSON.parse(obj.state);
        console.log('[badge] state: ' + JSON.stringify(state));
        if (state.words) {
          // 단어 추가
          const words = [{
            id: state.words.reduce((maxId, word) => Math.max(word.id, maxId), -1) + 1,
            completed: false,
            text: request.selection
          }, ...state.words];

          chrome.storage.local.set({ state: JSON.stringify({ words }) });
          
          //뱃지 숫자 변경
          const len = words.filter(word => !word.marked).length;
          if (len > 0) {
            chrome.browserAction.setBadgeText({ text: len.toString() });
          }
        } else {
          // first word
          chrome.storage.local.set({ state: JSON.stringify({ words: [{ id: 1, completed: false, text: request.selection }] }) });

          // 뱃지 숫자 변경
          chrome.browserAction.setBadgeText({ text: '1' });
        }
      });


      sendResponse({ farewell: 'received selection' });
    }
});