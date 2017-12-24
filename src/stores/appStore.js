import { observable, action, computed } from 'mobx';

class AppStore {
  @observable loading = false;
  @observable todoList = [];
  @observable showState = 'all';

  constructor(initState) {
    if (initState) {
      this.todoList = initState.todoList || [];
      this.showState = initState.showState || 'all';
    }
  }

  @action getTodolist() {
    this.setLoading(true);
    return fetch(`http://${window.host || '127.0.0.1'}:${window.port || '8080'}/getTodolist`).then(res => res.json()).then(res => {
      this.setLoading(false);
      if (res.success) {
        this.setTodoList(res.data);
      }
      return res.data.todoList;
    }).catch(e => {
      this.setLoading(false);
      console.error(e);
    })
  }

  @action setLoading(v) {
    this.loading = v;
  }

  @action setTodoList(v) {
    this.todoList = v;
  }

  @action setShowState(v) {
    this.showState = v;
  }

  @computed get filterList() {
    const { showState, todoList } = this;
    return showState === 'all' ? todoList.toJS() : todoList.toJS().filter(v => v.state === showState);
  }
}
export default AppStore;
