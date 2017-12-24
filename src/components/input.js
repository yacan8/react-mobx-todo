import React from 'react';
import { findDOMNode } from 'react-dom';
import { inject, observer } from 'mobx-react';

@inject('appStore')
@observer
export default class Input extends React.Component {
  addTodo = e => {
    const inputDom = findDOMNode(this.refs.input);
    const value = inputDom.value;
    if (value) {
      const { appStore } = this.props;
      const todoList = appStore.todoList.toJS();
      todoList.push({
        name: value,
        state: 'wait'
      })
      appStore.setTodoList(todoList);
      inputDom.value = '';
    }
  }

  render() {
    return (<div>
      <input ref="input"/>
      <button onClick={this.addTodo}>add</button>
    </div>);
  }
}
