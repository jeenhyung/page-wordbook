import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as WordActions from '../actions/words';
import style from './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

@connect(
  state => ({
    words: state.words
  }),
  dispatch => ({
    actions: bindActionCreators(WordActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    words: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { words, actions } = this.props;

    return (
      <div className={style.normal}>
        <Header addWord={actions.addWord} />
        <MainSection words={words} actions={actions} />
      </div>
    );
  }
}
