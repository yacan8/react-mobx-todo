import AppStore from './stores/appStore';

export default function configureStore(initState) {
  const appStore = new AppStore(initState);
  return {
    appStore
  };
}
