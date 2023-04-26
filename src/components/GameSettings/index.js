import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSettings, saveSettings } from '../../redux/actions';
import categorys from '../../services/GetCategory';

class GameSettings extends Component {
  state = {
    difficulty: null,
    // category: [],
    categorySelected: null,
  };

  selectDifficulty = ({ target }) => {
    this.setState({ difficulty: target.value });
  };

  selectCategory = ({ target }) => {
    this.setState({ categorySelected: target.value });
  };

  render() {
    const { dispatch } = this.props;
    const { difficulty, categorySelected } = this.state;
    return (
      <>
        <h1 data-testid="settings-title">Configurações do jogo</h1>
        <label htmlFor="difficulty">
          Selecione a dificuldade:

          <select name="difficulty" onChange={ this.selectDifficulty }>
            <option value="null">...</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <label htmlFor="category">
          Selecione a categoria:
          <select name="category" onChange={ this.selectCategory }>
            <option value="null">...</option>
            {categorys.map((categoria) => (
              <option
                value={ categoria.id }
                key={ categoria.id }
              >
                {categoria.name}
              </option>))}
          </select>
        </label>
        <button
          type="button"
          data-testid="btn-close-settings"
          onClick={ () => {
            dispatch(saveSettings(difficulty, categorySelected));
            dispatch(closeSettings());
          } }
        >
          Salvar Configurações

        </button>
      </>
    );
  }
}
GameSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GameSettings);
