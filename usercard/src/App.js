import './App.css';
import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userinfo: {},
    }
  };

  componentDidMount(){
    axios.get(`https://api.github.com/users/JonathanMary`)
         .then(res => {
           this.setState({userinfo: res.data});
         })
         .catch(err => console.log(err))
  }


  render(){
    console.log(this.state.userinfo)
    return (
      <div className="App">
        <header className="App-header">
          <h1>{this.state.userinfo.name}</h1>
          <img src={this.state.userinfo.avatar_url} alt="avatar"></img>
        </header>
      </div>
    );
  }
}

export default App;
