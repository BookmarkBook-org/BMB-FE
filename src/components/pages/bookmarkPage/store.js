import { createStore, combineReducers } from 'redux';
import { dataReducer } from './reducers';

const rootReducer = combineReducers({
  data: dataReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools 확장 프로그램 활성화
);

export default store;
