# React.PureComponent

React.PureComponent 与 React.Component 很相似。

他们的区别在于，React.PureComponent 基于生命周期钩子函数 shouldComponentUpdate 进行了优化，它在 shouldComponentUpdate 中对 props 和 state 进行了浅比较，如果 props 和 state 没有发生变化，那么 React 组件则不会重新渲染。

接下来通过一个案例来深入认识 React.PureComponent：

```jsx
// TaskItem.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class TaskItem extends Component {
  
  static PropTypes = {
    name: PropTypes.string.isRequired,
    isFinish: PropTypes.boolean.isRequired
  }
  
  render() {
    return (
    	<li className={this.props.isFinish ? 'finish' : ''}>{this.props.name}</li>
    );
  }
}

// style.css
.finish {
  color: 'green';
}
```



```jsx
// TaskList.js
import React, { Component } from 'react';
import TaskItem from './TaskItem.js';
import PropTypes from 'prop-types';

export default class TaskList extends Component {
  
  static PropTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      isFinish: PropTypes.boolean.isRequired
    })).isRequired
  }
  
  render() {
    const ts = this.props.tasks.map((item, index) => (<TaskItem {...item} key={index} />))
    return (
      <ul>
      	{ts}
      </ul>
    )
  }
}
```



```jsx
// TaskContainer.js
import React, { Component } from 'react';
import TaskList from './TaskList.js';

export defalut class TaskContainer extends Component {
  
  state = {
    tasks: []
  }
  
  componentDidMount() {
    let tasks = [];
    for(let i = 0; i < 10; i++) {
      tasks.push({
        name: `任务${i + 1}`,
        isFinish: Math.random() > 0.5
      });
    }
    this.setState({ tasks });
  }
  
  render() {
    console.log('TaskContainer render');
    return (
    	<>
      	<TaskList tasks={this.state.tasks} />
      </>
    );
  }
}
```



