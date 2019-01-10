import React, { Component } from 'react'
import client from '../feathers';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';


const test = {
  width: '400px',
  margin: '10px auto'
};  

export class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  updateField(name, ev) {
    this.setState({ [name]: ev.target.value });
  }

  login() {
    const { email, password } = this.state;

    return client.authenticate({
      strategy: 'local',
      email, password
    }).catch(error => {
      this.setState({ error });
      
    });
  }

  render() {
    return (
      <main style={ test }>
        <form>
            <div>
              <p>{this.state.error && this.state.error.message}</p>
            </div>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={ e => this.updateField('email', e) } />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={ e => this.updateField('password', e) } />
            </FormControl>
            <Button variant="contained" color="primary" onClick={() => this.login()}>
              Log in
            </Button>
        </form>
      </main>
    );
  }
}

export default Login
