import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Todolist from './Todolist';


class App extends Component {

  constructor(){
    super();
    this.state = {
      view: 'Active'
    }
    this.changeView = this.changeView.bind(this)
  }

  changeView(value){
    this.setState ({view: value})
  }



  render() {
    return (
      <div className="App">
        <button id='Active' onClick={()=>this.changeView('Active')} disabled={this.state.view === 'Active' ? 'true' : ''}>Active</button>
        <button id='Completed' onClick={()=>this.changeView('Completed')} disabled={this.state.view === 'Completed' ? 'true' : ''}>Completed</button>
        <button id='Expired' onClick={()=>this.changeView('Expired')} disabled={this.state.view === 'Expired' ? 'true' : ''}>Expired</button>
        <Todolist view={this.state.view}/>
      </div>
    );
  }
}


export default App;
