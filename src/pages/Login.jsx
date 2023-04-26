import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import ReactPlayer from 'react-player';
import { fetchQuestions, openSettings, saveUser } from '../redux/actions';
import GameSettings from '../components/GameSettings';
import logo from '../trivia.png';
import '../App.css';
import getTokens from '../services/getTokes';
import openning from '../assets/opennng.mp4';

const MIN_LENGTH = 0;

class Login extends Component {
  state = {
    email: '',
    name: '',
    buttonIsDisable: true,
    video: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });

    const { email, name } = this.state;
    if (email.length > MIN_LENGTH && name.length > MIN_LENGTH) {
      this.setState({
        buttonIsDisable: false,
      });
    }
  };

  handleClick = async (event) => {
    event.preventDefault();
    await getTokens();
    const { email } = this.state;
    const { dispatch, history, difficulty, category } = this.props;
    const changeEmailforImg = md5(email).toString();
    const token = localStorage.getItem('token');
    dispatch(saveUser(this.state, changeEmailforImg));
    dispatch(fetchQuestions(history, difficulty, category, token));
  };

  render() {
    const { email, name, buttonIsDisable } = this.state;
    const { dispatch, settings } = this.props;
    return (
      settings
        ? <GameSettings />
        : (
          <>
            <header className="App-header">
              <video className="videoTag" autoPlay loop muted>
                <source src={ openning } type="video/mp4" />
              </video>
            </header>
            <form>
              <input
                type="email"
                name="email"
                onChange={ this.handleChange }
                value={ email }
                placeholder="Digite seu email"
                data-testid="input-gravatar-email"
              />
              <input
                type="text"
                name="name"
                onChange={ this.handleChange }
                value={ name }
                placeholder="Digite seu nome"
                data-testid="input-player-name"
              />

              <button
                type="button"
                data-testid="btn-play"
                onClick={ this.handleClick }
                disabled={ buttonIsDisable }
              >
                Play

              </button>
              <button
                type="button"
                data-testid="btn-settings"
                onClick={ () => dispatch(openSettings()) }
              >
                Configurações

              </button>
            </form>
          </>
        )

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.bool.isRequired,
  difficulty: PropTypes.string,
  category: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Login.defaultProps = {
  difficulty: null,
  category: null,
};

const mapStateToProps = (state) => ({
  settings: state.login.settings,
  difficulty: state.login.difficulty,
  category: state.login.category,
});

export default connect(mapStateToProps)(Login);
