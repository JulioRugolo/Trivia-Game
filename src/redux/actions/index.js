export const OPEN_SETTINGS = 'OPEN_SETTINGS';
export const CLOSE_SETTINGS = 'CLOSE_SETTINGS';
export const SAVE_USER = 'SAVE_USER';
export const SAVE_IMG = 'SAVE_IMG';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const SAVE_POINTS = 'SAVE_POINTS';
export const SAVE_RANK = 'SAVE_RANK';
export const UPDATE_RANK = 'UPDATE_RANK';
export const CLEAR_PLAYER = 'CLEAR_PLAYER';
export const SAVE_ZERO_POINTS = 'SAVE_ZERO_POINTS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const SAVE_CATEGORYS = 'SAVE_CATEGORYS';
const RESPONSE_CODE = 3;

export const openSettings = () => ({
  type: OPEN_SETTINGS,
});

export const closeSettings = () => ({
  type: CLOSE_SETTINGS,
});

export const fetchGravatar = (email) => ({
  type: SAVE_IMG,
  payload: `https://www.gravatar.com/avatar/${email}`,
});

export const saveQuestions = (data) => ({
  type: SAVE_QUESTIONS,
  payload: data,
});

export function fetchQuestions(history, difficulty, category, token) {
  let url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  if (category === null && difficulty !== null) {
    url = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&token=${token}`;
  } else if (difficulty === null && category !== null) {
    url = `https://opentdb.com/api.php?amount=5&category=${category}&token=${token}`;
  } else if (category !== null && difficulty !== null) {
    url = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&token=${token}`;
  }
  return (dispatch) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === RESPONSE_CODE) {
          history.push('/');
        } else {
          dispatch(saveQuestions(data.results));
          history.push('/game');
        }
      });
  };
}

export const saveUser = (stateComponent, img) => ({
  type: SAVE_USER,
  user: stateComponent,
  img: `https://www.gravatar.com/avatar/${img}`,
});

// eslint-disable-next-line max-params
export const savePoints = (points, assertions, props) => (
  { type: SAVE_POINTS,
    payload: points,
    assertions,
    name: props.name,
    gravatar: props.gravatar,
    email: props.email }
);

export const saveZeroPoints = (points, props) => (
  { type: SAVE_ZERO_POINTS,
    payload: points,
    assertions: 0,
    name: props.name,
    gravatar: props.gravatar,
    email: props.email }
);

export const saveUserRank = (playerRank) => ({
  type: SAVE_RANK,
  payload: playerRank,
});

export const updateRank = (playerRank) => ({
  type: UPDATE_RANK,
  payload: playerRank,
});

export const clearPlayerState = () => ({ type: CLEAR_PLAYER });

export const saveSettings = (difficulty, category) => ({
  type: SAVE_SETTINGS,
  difficulty,
  category,
});

export const saveCategorys = (categorys) => ({
  type: SAVE_CATEGORYS,
  payload: categorys,
});
