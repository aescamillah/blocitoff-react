import React, { Component } from 'react';

class Todo extends Component {

  constructor(){
    super();
    this.state = { task: ''}
  }

  render() {
    return (
      <tr>
        <td>{this.state.task}</td>
      </tr>
    );
  }
}

export default Todo;
