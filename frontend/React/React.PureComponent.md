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
  
  static propTypes = {
    name: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired
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
  
  static propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      isFinish: PropTypes.bool.isRequired
    })).isRequired
  }
  
  render() {
    const ts = this.props.tasks.map((item, index) => (<TaskItem {...item} key={index} />));
    return (
      <ul>
      	{ts}
      </ul>
    )
  }
}
```



```jsx
// AddTask.js
import React, { Component } from "react";
import PropTypes from 'prop-types';

export default class AddTask extends Component {
  state = {
    value: "",
  }

  static propTypes = {
    addTask: PropTypes.func.isRequired
  }

  handleChangeValue = e => {
    this.setState({
        value: e.target.value
    });
  }

  handleAddTask = () => {
    this.props.addTask &&
      this.props.addTask({
        name: this.state.value,
        isFinish: false,
      });
    this.setState({
      value: "",
    });
  }

  render() {
    console.log('AddTask render');
    return (
      <div>
        <input value={this.state.value} onChange={this.handleChangeValue} />
        <button onClick={this.handleAddTask}>添加 Task</button>
      </div>
    );
  }
}
```



```jsx
// TaskContainer.js
import React, { Component } from 'react';
import TaskList from './TaskList.js';

export default class TaskContainer extends Component {
  
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

控制台输出如下：

![image-20221019094035065](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202210190940116.png)

这里输出其实就能看出问题， TaskContainer 组件在第二次渲染时，并没有渲染 AddTask 组件的必要，因为它并没有发生改变。

我们添加一个新任务之后，再看一下控制台输出：

![image-20221019095400190](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202210190954280.png)

AddTask 组件重新渲染，这是因为我们将 AddTask 组件里的状态 value 置空导致的。

真正的问题发生在我们只添加了一个新任务，前面旧的10个 TaskItem 组件也跟着一起重新渲染了，虽然他们并没有发生变化。

这个问题，可以通过 shouldComponentUpdate 来优化，当组件的 props 和 state 没有变化时，则不需要重新渲染。

- 新增一个工具方法，用于判断两个对象是否相等（浅比较）

```js
// utils.js
export function ObjectEqual(obj1, obj2) {
  for(let prop in obj1) {
		if(!Object.is(obj1[prop], obj2[prop])) {
			return false
		}
	}
	return true;
}
```

- 修改 TaskItem 组件

```jsx
// TaskItem.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css";
import { ObjectEqual } from "../utils";

export default class TaskItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    var isPropsSame = ObjectEqual(this.props, nextProps);
    var isStateSame = ObjectEqual(this.state, nextState);
    if (isPropsSame && isStateSame) {
      return false;
    }
    return true;
  }

  render() {
    console.log("TaskItem render");
    return (
      <li className={this.props.isFinish ? "finish" : ""}>{this.props.name}</li>
    );
  }
}
```

重新添加一次新任务，看一下控制台输出：

![image-20221019100620804](https://penguinbucket.obs.cn-southwest-2.myhuaweicloud.com//img/202210191006854.png)

可以看到，添加一次新任务后，TaskItem 组件只渲染了一次。

而我们通过 shouldComponentUpdate 做的优化，也可以使用 React.PureComponent 来代替，效果是一样的。

```jsx
// TaskItem.js
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./TaskItem.css";
// import { ObjectEqual } from "../utils";

export default class TaskItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isFinish: PropTypes.bool.isRequired,
  };

//   shouldComponentUpdate(nextProps, nextState) {
//     var isPropsSame = ObjectEqual(this.props, nextProps);
//     var isStateSame = ObjectEqual(this.state, nextState);
//     if (isPropsSame && isStateSame) {
//       return false;
//     }
//     return true;
//   }

  render() {
    console.log("TaskItem render");
    return (
      <li className={this.props.isFinish ? "finish" : ""}>{this.props.name}</li>
    );
  }
}

```

AddTask 组件在 TaskContainer 组件第二次渲染时，也跟着重新渲染的问题，同样可以通过 React.PureComponent 来优化。

因此，在平时的开发中，我们可以尽量使用 React.PureComponent 来提高效率，并且需要注意，在修改状态时，永远是创建新状态去覆盖旧的状态。

