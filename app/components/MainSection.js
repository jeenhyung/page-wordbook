import React, { Component, PropTypes } from 'react';
import WordItem from './WordItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/WordFilters';
import style from './MainSection.css';

const WORD_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: word => !word.completed,
  [SHOW_COMPLETED]: word => word.completed
};

export default class MainSection extends Component {

  static propTypes = {
    words: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleClearCompleted = () => {
    const atLeastOneCompleted = this.props.words.some(word => word.completed);
    if (atLeastOneCompleted) {
      this.props.actions.clearCompleted();
    }
  };

  handleShow = (filter) => {
    this.setState({ filter });
  };

  renderToggleAll(completedCount) {
    const { words, actions } = this.props;
    if (words.length > 0) {
      return (
        <input
          className={style.toggleAll}
          type="checkbox"
          checked={completedCount === words.length}
          onChange={actions.completeAll}
        />
      );
    }
  }

  renderFooter(completedCount) {
    const { words } = this.props;
    const { filter } = this.state;
    const activeCount = words.length - completedCount;

    if (words.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
        />
      );
    }
  }

  render() {
    const { words, actions } = this.props;
    const { filter } = this.state;

    const filteredWords = words.filter(WORD_FILTERS[filter]);
    const completedCount = words.reduce(
      (count, word) => (word.completed ? count + 1 : count),
      0
    );

    return (
      <section className={style.main}>
        {/* {this.renderToggleAll(completedCount)} */}
        <ul className={style.wordList}>
          {filteredWords.map(word =>
            <WordItem key={word.id} word={word} {...actions} />
          )}
        </ul>
        {/* {this.renderFooter(completedCount)} */}
      </section>
    );
  }
}
