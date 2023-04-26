import { CLEAR_PLAYER,
  CLOSE_SETTINGS,
  OPEN_SETTINGS,
  SAVE_USER,
  SAVE_SETTINGS,
  SAVE_CATEGORYS,
} from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
  category: null,
  difficulty: null,
  settings: false,
  imgGravatar: '',
  scoreBoard: 0,
  categorys: [],
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case OPEN_SETTINGS:
    return ({
      ...state,
      settings: true,
    });

  case CLOSE_SETTINGS:
    return ({
      ...state,
      settings: false,
    });

  case SAVE_USER:
    return ({
      ...state,
      email: action.user.email,
      name: action.user.name,
      imgGravatar: action.img,
    });
  case CLEAR_PLAYER:
    return ({
      ...state,
      email: '',
      name: '',
      category: '',
      difficulty: '',
      settings: false,
      imgGravatar: '',
      scoreBoard: 0,
    });

  case SAVE_SETTINGS:
    return ({
      ...state,
      difficulty: action.difficulty,
      category: action.category,
    });

  case SAVE_CATEGORYS:
    return ({
      ...state,
      categorys: action.payload,
    });

  default:
    return state;
  }
};

export default login;
