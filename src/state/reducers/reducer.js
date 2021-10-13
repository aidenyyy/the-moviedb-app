const initialUser = JSON.parse(localStorage.getItem('user')) || {};

const initialState = {
  movies: [],
  liked: [],
  rated: [],
  sortMethod: 'now_playing',
  page: 1,
  pageTotal: 1,
  userData: initialUser,
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MOVIES': {
      return {
        ...state,
        movies: action.payload,
      };
    }

    case 'SET_FAVORITE_MOVIES': {
      return {
        ...state,
        liked: action.payload,
      };
    }

    case 'SET_RATED_MOVIES': {
      return {
        ...state,
        rated: action.payload,
      };
    }

    case 'CHANGE_PAGE': {
      return {
        ...state,
        page: action.payload,
        //  state.page < 500 && state.page > 1 ? action.payload + 1 : state.page,
      };
    }

    case 'SET_PAGE_TOTAL': {
      return {
        ...state,
        pageTotal: action.payload,
      };
    }

    case 'SET_SORT_METHOD': {
      return {
        ...state,
        sortMethod: action.payload,
      };
    }

    case 'SET_USER': {
      return {
        ...state,
        userData: action.payload,
      };
    }

    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default reducer;
