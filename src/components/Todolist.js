import React, { Component } from 'react';
import Todolistheader from './Todolistheader';
import moment from 'moment';

const uuid = require('uuid')

const todos = [
  {
    id: uuid(),
    task: 'first',
    time:  new Date().getTime(),
    isCompleted: false,
    isExpired: false
  }
];

class Todolist extends Component {

  constructor(){
    super();
    this.state = {
      txt: '',
      todos: todos

    }
    this.update = this.update.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.toggleTodo = this.toggleTodo.bind(this)
    this.refresh = this.refresh.bind(this)

    this.interval = setInterval(this.refresh,1000);

  }

  update(e){
    this.setState({txt: e.target.value})
  }

  refresh(){
    let todosarray = this.state.todos.slice()
    for (var i=0; i < todosarray.length; i++) {
      if (todosarray[i].isCompleted === false && Date.now() - todosarray[i].time > 10000) {
        todosarray[i].isExpired = true
      }
    }
    this.setState({todos: todosarray})
  }

  addTodo(e){
    let todosarray = this.state.todos.slice()
    todosarray.push(
      {
        id: uuid(),
        task: this.state.txt,
        time: Date.now(),
        isCompleted: false,
        isExpired: false
      }
    )
    this.setState({todos: todosarray})
  }

  toggleTodo(todo){
    let array = this.state.todos.slice()
    let item = array.find(a => a === todo )
    item.isCompleted = !item.isCompleted
    this.setState({todos: this.state.todos})
  }

  isCompleted(item){
    return item.isCompleted;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillMount() {
    console.log('mounting');
  }

  render() {

    const todolist = this.state.todos.map((todo) =>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>
          <button onClick={()=>this.toggleTodo(todo.id)}>Completed</button>
        </td>
        <td>{todo.time}</td>
      </tr>
    )

    const activetodolist = this.state.todos.filter((todo) => todo.isCompleted === false).filter((todo) => todo.isExpired === false).map((todo) =>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>
          <button onClick={()=>this.toggleTodo(todo)}>Mark Completed</button>
        </td>
        <td>{moment(todo.time).format("DD-MMM-YYYY HH:mm:ss")}</td>
      </tr>
    )

    const completedtodolist = this.state.todos.filter((todo) => todo.isCompleted === true).map((todo) =>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>
          <button onClick={()=>this.toggleTodo(todo)}>Undo</button>
        </td>
        <td>{moment(todo.time).format("DD-MMM-YYYY HH:mm:ss")}</td>
      </tr>
    )

    const expiredtodolist = this.state.todos.filter((todo) => todo.isExpired === true).map((todo) =>
      <tr key={todo.id}>
        <td>{todo.task}</td>
        <td>Expired</td>
        <td>{moment(todo.time).format("DD-MMM-YYYY HH:mm:ss")}</td>
      </tr>
    )


    if (this.props.view === 'Active'){
      return (
        <div>
          <input type="text" onChange={this.update} />
          <button onClick={this.addTodo}>Add Todo</button>
          <h1>Pending Tasks</h1>
          <table>
            <Todolistheader />
            <tbody>
                {activetodolist}
            </tbody>
          </table>
        </div>
      );
    } else if (this.props.view === 'Completed') {
      return (
        <div>
          <input type="text" onChange={this.update} />
          <button onClick={this.addTodo}>Add Todo</button>
          <h1>Completed Tasks</h1>
          <table>
            <Todolistheader />
            <tbody>
                {completedtodolist}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <input type="text" onChange={this.update} />
          <button onClick={this.addTodo}>Add Todo</button>
          <h1>Expired Tasks</h1>
          <table>
            <Todolistheader />
            <tbody>
                {expiredtodolist}
            </tbody>
          </table>
        </div>
      );
    }
  }

}

export default Todolist;
