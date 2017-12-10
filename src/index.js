import React from 'react';
import ReactDOM from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Provider } from 'mobx-react';
import AppStore from './stores/appStore';
import configureStore from './configureStore';
import App from './app';
import './styles/index.less';
const MOUNT_NODE = document.getElementById('app');
const __DEV__ = process.env.NODE_ENV !== 'production';

const REACT_RENDER_NODE = (stores) => {
  return (
    <Provider {...stores}>
      <App />
    </Provider>
  )
}

let render = (stores) => {
  ReactDOM.render(
    REACT_RENDER_NODE(stores),
    MOUNT_NODE
  );
};



if (__DEV__) {
  try {
    const stores = configureStore();
    render(stores);
  } catch(e) {
    console.error(e);
  }

  if (module.hot) {
    module.hot.accept(['./app'], ()  => {
      setTimeout(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE);
        render();
      });
    });
  }
} else if (global) {  // java 服务端渲染
  global.render = (showState) => {
    const appStore = new AppStore();
    return new Promise((resolve, reject) => {
      appStore.getTodolist().then(res => {
        return renderToString(REACT_RENDER_NODE({appStore}))
      })
    })
  };
}
