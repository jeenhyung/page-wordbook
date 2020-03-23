import { expect } from 'chai';
import * as types from '../../../app/constants/ActionTypes';
import * as actions from '../../../app/actions/todos';

describe('wordapp todo actions', () => {
  it('addWord should create ADD_WORD action', () => {
    expect(actions.addWord('Use Redux')).to.eql({
      type: types.ADD_WORD,
      text: 'Use Redux'
    });
  });

  it('deleteWord should create DELETE_WORD action', () => {
    expect(actions.deleteWord(1)).to.eql({
      type: types.DELETE_WORD,
      id: 1
    });
  });

  it('editWrod should create EDIT_WORD action', () => {
    expect(actions.editWrod(1, 'Use Redux everywhere')).to.eql({
      type: types.EDIT_WORD,
      id: 1,
      text: 'Use Redux everywhere'
    });
  });

  it('completeWord should create COMPLETE_WORD action', () => {
    expect(actions.completeWord(1)).to.eql({
      type: types.COMPLETE_WORD,
      id: 1
    });
  });

  it('completeAll should create COMPLETE_ALL action', () => {
    expect(actions.completeAll()).to.eql({
      type: types.COMPLETE_ALL
    });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted('Use Redux')).to.eql({
      type: types.CLEAR_COMPLETED
    });
  });
});
