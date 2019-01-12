import React, { Component } from 'react';
import './App.css';
import client from './feathers';
import jwt_decode from 'jwt-decode';

import Login from './components/Login';
import Chat from './components/Chat';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const userDetails = client.service('user-details');
    client.authenticate().catch(() => this.setState({ login: null }));

    client.on('authenticated', login => {
      const { userId } = jwt_decode(login.accessToken);
      
      userDetails.get(userId)
        .then(res => {
          this.setState( {
            user: res,
            login 
          });
        })
        .catch(err => console.log(err));
    });


  }

  render() {
    if (this.state.login === undefined) {
      return <main>
        <p>Loading...</p>
      </main>
    } else if (this.state.login) {
      return <Chat user={this.state.user} />;
    }

    return <Login />;
  }
}

export default App;
