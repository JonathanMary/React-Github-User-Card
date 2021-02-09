import './App.css';
import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      userinfo: {},
      userfollowers: [],
      username: "JonathanMary",
    }
  };

  componentDidMount(){
    axios.get(`https://api.github.com/users/${this.state.username}`)
         .then(res => {
           this.setState({
             userinfo: res.data,
            });
         })
         .catch(err => console.log(err))
    axios.get(`https://api.github.com/users/${this.state.username}/followers`)
         .then(res => {
          console.log("FOLLOWERS: ", res.data)
          this.setState({
            userfollowers:res.data,
          })
         })
         .catch(err => console.log(err))
  }


  render(){
    console.log(this.state.userfollowers)
    return (
      <div className="App">
        <header className="App-header">
          <div className="user-profile" >
            <img style={{borderRadius:'50%', width:'150px'}} src={this.state.userinfo.avatar_url} alt="avatar"></img>
            <div className="user-info">
              <h1>{this.state.userinfo.name}</h1>
              <div className="country-info">{this.state.userinfo.location}</div>
            </div>
          </div>
          <div>
          <h2>Followers:</h2>
          {this.state.userfollowers.map(follower => (
            <div>{follower.login}</div>
          ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
