export const setMoviesAction = (movies) => {
  return {
    type: 'SET_MOVIES',
    payload: movies,
  };
};

export const setFavoriteMoviesAction = (movies) => {
  return {
    type: 'SET_FAVORITE_MOVIES',
    payload: movies,
  };
};

export const setRatedMoviesAction = (movies) => {
  return {
    type: 'SET_RATED_MOVIES',
    payload: movies,
  };
};

export const changePageAction = (page) => {
  return {
    type: 'CHANGE_PAGE',
    payload: page,
  };
};

export const setPageTotal = (pageTotal) => {
  return {
    type: 'SET_PAGE_TOTAL',
    payload: pageTotal,
  };
};

export const setSortMethodAction = (sortMethod) => {
  return {
    type: 'SET_SORT_METHOD',
    payload: sortMethod,
  };
};

export const setUserAction = (userData) => {
  return {
    type: 'SET_USER',
    payload: userData,
  };
};

export const setLoadingAction = (loading) => {
  return {
    type: 'SET_LOADING',
    payload: loading,
  };
};
