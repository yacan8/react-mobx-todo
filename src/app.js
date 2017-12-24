import React from 'react';
import { inject, observer } from 'mobx-react';
import Input from './components/input';
import List from './components/list';
import State from './components/state';

@inject('appStore')
@observer
export default class App extends React.Component {
  componentDidMount() {
    if (process.env.ssr) {
      this.props.appStore.getTodolist();
    }
  }
  render() {
    return (<div>
      <h2>react-mobx-todolist</h2>
      <Input />
      <List />
      <State />
    </div>);
  }
}
