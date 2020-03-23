import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WordTextInput from './WordTextInput';
import style from './WordItem.css';

export default class WordItem extends Component {

  static propTypes = {
    word: PropTypes.object.isRequired,
    editWrod: PropTypes.func.isRequired,
    deleteWord: PropTypes.func.isRequired,
    completeWord: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (text) => {
    const { word, deleteWord, editWrod } = this.props;
    if (text.length === 0) {
      deleteWord(word.id);
    } else {
      editWrod(word.id, text);
    }
    this.setState({ editing: false });
  };

  handleComplete = () => {
    const { word, completeWord } = this.props;
    completeWord(word.id);
  };

  handleDelete = () => {
    const { word, deleteWord } = this.props;
    deleteWord(word.id);
  };

  render() {
    const { word } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <WordTextInput
          text={word.text}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div className={style.view}>
          <input
            className={style.toggle}
            type="checkbox"
            checked={word.completed}
            onChange={this.handleComplete}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {word.text}
          </label>
          <button
            className={style.destroy}
            onClick={this.handleDelete}
          />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.completed]: word.completed,
          [style.editing]: this.state.editing,
          [style.normal]: !this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}
