import { createStore } from 'redux';
import rootReducer from './reducers';

export default (intialState) => {
  return createStore(rootReducer, intialState);
}