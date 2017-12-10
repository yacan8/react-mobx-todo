import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('appStore')
@observer
export default class List extends React.Component {

  toggleState = i => {
    return e => {
      const { appStore } = this.props;
      const todoList = appStore.todoList.toJS();
      todoList[i].state = todoList[i].state == 'wait' ? 'computed' : 'wait';
      appStore.setTodoList(todoList);
    }
  }

  render() {
    const todoList = this.props.appStore.filterList;
    return (<div>
      <ul>
        {
          todoList.map((todo, i) => {
            return <li key={i} onClick={this.toggleState(i)} className={todo.state}>{todo.name}</li>
          })
        }
      </ul>
    </div>);
  }
}
