import React, { Component } from 'react'
import client from '../feathers';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Tabs, Tab } from '@material-ui/core';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


export default withStyles(styles)(class Login extends Component {
  constructor(props) {
      super(props);
      this.state = {
        value: 0
      };
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

  register() {
    const { email, password, name } = this.state;

    return client.service('user')
      .create( { email, password, name } )
      .then(() => this.login())
      .catch(err => this.setState({err}));
  }

  handleChange = (e, value) => {
    this.setState({value});
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color='error'>
            { this.state.error && this.state.error.message }
          </Typography>
          
          <Tabs 
            value={value} 
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
      
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" autoFocus onChange={ e => this.updateField('email', e) } />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={ e => this.updateField('password', e) } />
            </FormControl>
            { value === 1 && 
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input name="name" type="text" id="name" onChange={ e => this.updateField('name', e) } />
              </FormControl> 
            }
            { value === 0 && 
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.login()}
              >
                Log in
              </Button>
            }
            {
              value === 1 &&
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => this.register()}
              >
                Register
              </Button>
            }
          </form>
        </Paper>
      </main>)
  }
})

