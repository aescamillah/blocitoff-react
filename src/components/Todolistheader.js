import React, { Component } from 'react';
class Todolistheader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>Task</th>
          <th>Status</th>
          <th>Created at</th>
        </tr>
      </thead>
    );
  }
}

export default Todolistheader;
