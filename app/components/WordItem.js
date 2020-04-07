import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import WordTextInput from './WordTextInput';
import style from './WordItem.css';
// import Button from 'react-bootstrap/Button';

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
          url={word.url}
          editing={this.state.editing}
          onSave={this.handleSave}
        />
      );
    } else {
      element = (
        <div>
          {/* <div className={style.view}> */}
          <div style={{ }}>
            <button
                className={style.destroy}
                onClick={this.handleDelete}
              />
              <text style={{fontSize: "10px",  "margin-left": "10px"}}>{word.created}</text>
          </div>
            {/* <input
              className={style.toggle}
              type="checkbox"
              checked={word.completed}
              onChange={this.handleComplete}
            /> */}
            {/* <label onDoubleClick={this.handleDoubleClick}>
              {word.text}
            </label> */}
            <label>
              {word.text}
            </label>
            {/* <a href={`javascript:(${word.url})`}>LINK</a> */}
            {/* <a href={`javascript:openURL('${word.url}')`}> LINK </a> */}
            {/* <input type="button" id="btnOpenNewTab" value="Click to open new tab"/> */}
            {/* <button onClick={`openURL(${word.url})`}> LINK </button> */}
              {/* <button id="linkBtn" value={word.url}> LINK </button> */}
          
          <div className="link" style={{paddingBottom: "5px"}}>
            { word.url ? <a href={word.url} target="_blank" style={{ fontSize: "12px", "margin-left": "10px" }}> {word.url} </a> : <a>   </a> }
          </div>
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style.editing]: false,
          [style.normal]: true
        })}
      >
        {element}
      </li>
    );
  }
}
