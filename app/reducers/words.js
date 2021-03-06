import * as ActionTypes from '../constants/ActionTypes';

function dateFormat(date) {
  return date.getFullYear() + "-" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
  ("00" + date.getDate()).slice(-2) + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
}

const initialState = [{
  text: 'Welcome',
  completed: false,
  id: 0,
  url: '',
  created: dateFormat(new Date()),
}];

const actionsMap = {
  [ActionTypes.ADD_WORD](state, action) {
    return [{
      id: state.reduce((maxId, word) => Math.max(word.id, maxId), -1) + 1,
      completed: false,
      text: action.text,
      url: action.url,
      created: dateFormat(new Date()),
    }, ...state];
  },
  [ActionTypes.DELETE_WORD](state, action) {
    return state.filter(word =>
      word.id !== action.id
    );
  },
  [ActionTypes.EDIT_WORD](state, action) {
    return state.map(word =>
      (word.id === action.id ?
        Object.assign({}, word, { text: action.text }) :
        word)
    );
  },
  [ActionTypes.COMPLETE_WORD](state, action) {
    return state.map(word =>
      (word.id === action.id ?
        Object.assign({}, word, { completed: !word.completed }) :
        word)
    );
  },
  [ActionTypes.COMPLETE_ALL](state/*, action*/) {
    const areAllCompleted = state.every(word => word.completed);
    return state.map(word => Object.assign({}, word, {
      completed: !areAllCompleted
    }));
  },
  [ActionTypes.CLEAR_COMPLETED](state/*, action*/) {
    return state.filter(word => word.completed === false);
  }
};

export default function words(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
