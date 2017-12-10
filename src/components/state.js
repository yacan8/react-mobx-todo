import React from 'react';
import { inject, observer } from 'mobx-react';

const stateMap = {
  'all': '全部',
  'computed': '完成',
  'wait': '待办'
}

@inject('appStore')
@observer
export default class State extends React.Component {
  setState = state => {
    return e => {
      const { appStore } = this.props;
      appStore.setShowState(state);
    }
  }
  render() {
    const { showState } = this.props.appStore;
    return (<div>
      {
        Object.keys(stateMap).map((state, i) => {
          return showState === state ? <span key={i}>{stateMap[state]}</span> : <a key={i} href="javascript:;" onClick={this.setState(state)}>{stateMap[state]}</a>
        })
      }
    </div>);
  }
}
