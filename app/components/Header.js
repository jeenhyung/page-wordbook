import React, { PropTypes, Component } from 'react';
import WordTextInput from './WordTextInput';

export default class Header extends Component {

  static propTypes = {
    addWord: PropTypes.func.isRequired
  };

  handleSave = (text) => {
    if (text.length !== 0) {
      this.props.addWord(text);
    }
  };

  render() {
    return (
      <header>
        {/* <h1>Page Wordbook</h1> */}
        <WordTextInput
          newWord
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
