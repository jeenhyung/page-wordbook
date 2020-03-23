function saveState(state) {
  chrome.storage.local.set({ state: JSON.stringify(state) });
}
/*
{
  state : '{
    words: [
      {
        id: 0,
        completed: false,
        text: '',
      },
    ],
  }'
}
*/



// words unmarked count
function setBadge(words) {
  if (chrome.browserAction) {
    const count = words.filter(word => !word.marked).length;
    chrome.browserAction.setBadgeText({ text: count > 0 ? count.toString() : '' });
  }
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state); // { words: [...]}
      setBadge(state.words);  // [...]
    });
    return store;
  };
}

