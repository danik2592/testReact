import Redbox from 'redbox-react';
import React from 'react';
import ReactDOM from 'react-dom';
import PatchedReactDOM from '@hot-loader/react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import App from './containers/App';
import reducer from './reducers';
import saga from './sagas';

// saga
const sagaMiddleware = createSagaMiddleware();
// combine everyhing
const middlewares = composeWithDevTools(applyMiddleware(sagaMiddleware));
const store = createStore(reducer, middlewares);
const rootEl = document.getElementById('react-app');

const render = (Component) => {
  PatchedReactDOM.render(
    <AppContainer errorReporter={Redbox}>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  );
};

// Hot Module Replacement API
if (module.hot) {
  let sagaTask = sagaMiddleware.run(function* () {
    yield saga();
  });
  render(App);
  // update components
  module.hot.accept('./containers/App', () => {
    render(App);
  });
  // update reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
  // update sagas
  module.hot.accept('./sagas', () => {
    const getNewSagas = require('./sagas').default;
    sagaTask.cancel();
    sagaTask.done.then(() => {
      sagaTask = sagaMiddleware.run(function* replacedSaga() {
        yield getNewSagas();
      });
    });
  });
} else {
  sagaMiddleware.run(saga);
  render(App);
}

