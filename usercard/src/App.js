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
      //typedtext: "",
    }
  };

  //Put API call into a function to keep code DRY
  apiCall = (name) => {
    axios.get(`https://api.github.com/users/${name}`)
    .then(res => {
      this.setState({
        userinfo: res.data,
       });
    })
    .catch(err => console.log(err))
axios.get(`https://api.github.com/users/${name}/followers`)
    .then(res => {
     //console.log("FOLLOWERS: ", res.data)
     this.setState({
       userfollowers:res.data,
     })
    })
    .catch(err => console.log(err))
  }


  componentDidMount(){
    this.apiCall(this.state.username);
    this.setState({
      username: '',
    })
  }

  text = evt => {
    this.setState({
      username: evt.target.value,
    })
  }
  submit = evt => {
    evt.preventDefault();
    this.apiCall(this.state.username);
    this.setState({
      username: '',
    })
  }

  render(){
    //console.log(this.state.userfollowers)
    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.submit} className="search-bar">
              <input type="text" onChange={this.text} value={this.state.username} placeholder="Search new user..."></input>
          </form>
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
