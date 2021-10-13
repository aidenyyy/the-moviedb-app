import { createStore } from 'redux';
import reducer from './reducers/reducer';

const rootReducer = reducer;

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
