import React, { Component, Fragment } from 'react'
import ContactsPane from './ContactsPane';
import ChatRoomPane from './ChatRoomPane';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import client from '../feathers';


const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 30
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0
    };
  }

  handleRoomSelecetion = (x) => {
    if (x.isGroup) {
      this.setState( { roomId: x.id } );
    } else {
      this.setState({ roomId: x.room.id });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                { this.props.user.email } - { this.props.user.name }
              </Typography>
                <Button color="inherit" onClick={ () => client.logout() }>Logout</Button>
            </Toolbar>
            </AppBar>
          </div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={3}>
          <Paper>
            <ContactsPane user={this.props.user} handleRoomSelecetion={ this.handleRoomSelecetion } />
          </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper>
              <ChatRoomPane roomId={this.state.roomId} user={this.props.user} />
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat)