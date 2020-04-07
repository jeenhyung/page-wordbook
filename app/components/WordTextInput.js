import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './WordTextInput.css';

export default class WordTextInput extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    url: PropTypes.string,
    wordplaceholder: PropTypes.string,
    urlplaceholder: PropTypes.string,
    wordEditing: PropTypes.bool,
    newWord: PropTypes.bool,
    urlEditing: PropTypes.bool,
    newUrl: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || '',
      url: this.props.url || '',
    };
  }

  handleSubmit = (evt) => {
    // const text = evt.target.value.trim();
    if (evt.which === 13) {
      this.props.onSave(this.state.text, this.state.url);
      if (this.props.newWord) {
        this.setState({ text: '', url: '' });
      }
    }
  };

  handleWordChange = (evt) => {
    this.setState({ text: evt.target.value });
  };

  handleUrlChange = (evt) => {
    this.setState({ url: evt.target.value });
  };


  handleWordBlur = (evt) => {
    if (!this.props.newWord) {
      this.props.onSave(evt.target.value);
    }
  };

  handleUrlBlur = (evt) => {
    if (!this.props.newWord) {
      this.props.onSave(evt.target.value);
    }
  };

  render() {
    return (
      <div>
        <div className="input">
          <input
            className={classnames({ [style.edit]: this.props.wordEditing, [style.new]: this.props.newWord })}
            type="text"
            placeholder={this.props.wordplaceholder}
            autoFocus="false"
            value={this.state.text}
            onBlur={this.handleWordBlur}
            onChange={this.handleWordChange}
            onKeyDown={this.handleSubmit}
          />
        </div>
        <div>
          <input
            className={classnames({
              [style.edit]: this.props.urlEditing,
              [style.new]: this.props.newUrl
            })}
            type="url"
            placeholder={this.props.urlplaceholder}
            autoFocus="false"
            value={this.state.url}
            onBlur={this.handleUrlBlur}
            onChange={this.handleUrlChange}
            onKeyDown={this.handleSubmit}
          />
        </div>
      </div>
    );
  }
}
