import AppStore from './stores/appStore';

export default function configureStore(initState) {
  const appStore = new AppStore(initState);
  if (window) {
    window.appStore = appStore;
  }
  return {
    appStore
  };
}
