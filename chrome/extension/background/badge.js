chrome.storage.local.get('state', (obj) => {  // 툴바 아이콘에 todo 개수 표시
  // console.log('[badge] obj: ' + JSON.stringify(obj));
  const state = JSON.parse(obj.state);
  console.log('[badge] state: ' + JSON.stringify(state));
  const todos = state.todos;
  if (todos) {
    const len = todos.filter(todo => !todo.marked).length;
    if (len > 0) {
      chrome.browserAction.setBadgeText({ text: len.toString() });
    }
  } else {
    // Initial
    chrome.browserAction.setBadgeText({ text: '1' });
  }
});
