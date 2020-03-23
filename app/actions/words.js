import * as types from '../constants/ActionTypes';

export function addWord(text) {
  return { type: types.ADD_WORD, text };
}

export function deleteWord(id) {
  return { type: types.DELETE_WORD, id };
}

export function editWrod(id, text) {
  return { type: types.EDIT_WORD, id, text };
}

export function completeWord(id) {
  return { type: types.COMPLETE_WORD, id };
}

export function completeAll() {
  return { type: types.COMPLETE_ALL };
}

export function clearCompleted() {
  return { type: types.CLEAR_COMPLETED };
}
