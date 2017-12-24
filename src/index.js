import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'mobx-react';
import AppStore from './stores/appStore';
import configureStore from './configureStore';
import App from './app';
import './styles/index.less';
const __DEV__ = process.env.NODE_ENV !== 'production';

const REACT_RENDER_NODE = (stores) => {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

let render = (stores) => {
  const MOUNT_NODE = document.getElementById('app');
  const ReactDOM = require('react-dom');
  ReactDOM.render(
    REACT_RENDER_NODE(stores),
    MOUNT_NODE
  );
};

if (window) {
  try {
    const stores = configureStore();
    render(stores);
  } catch (e) {
    console.error(e);
  }
}

if (__DEV__) {
  if (module.hot) {
    module.hot.accept(['./app'], () => {
      setTimeout(() => {
        const ReactDOM = require('react-dom');
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
}
global.ssr_render = (showState) => {
  const appStore = new AppStore();
  return new global.Promise((resolve, reject) => {
    appStore.getTodolist().then(res => {
      resolve(renderToStaticMarkup(REACT_RENDER_NODE({appStore})))
    }).catch(e => {
      reject(e);
    })
  }).catch(e => {
    return e.message;
  })
};
