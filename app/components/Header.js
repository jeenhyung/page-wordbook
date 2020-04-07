import React, { PropTypes, Component } from 'react';
import WordTextInput from './WordTextInput';

export default class Header extends Component {

  static propTypes = {
    addWord: PropTypes.func.isRequired
  };

  handleSave = (text, url = '') => {
    if (text.length !== 0) {
      this.props.addWord(text, url);
    }
  };

  render() {
    return (
      <header>
        {/* <h1>Page Wordbook</h1> */}
        <WordTextInput
          newWord
          newUrl
          onSave={this.handleSave}
          wordplaceholder="input text everything."
          urlplaceholder="input url (optional)"
        />
      </header>
    );
  }
}
