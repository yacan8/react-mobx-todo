import React from 'react';
import Input from './components/input';
import List from './components/list';
import State from './components/state';

export default class App extends React.Component {
  render() {
    return (<div>
      <h2>react-mobx-todolist</h2>
      <Input />
      <List />
      <State />
    </div>);
  }
}
