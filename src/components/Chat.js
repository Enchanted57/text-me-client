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
import PersonAdd from '@material-ui/icons/PersonAdd';
import GroupAdd from '@material-ui/icons/GroupAdd';
import client from '../feathers';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';


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
      roomId: 0,
      friendDialogOpen: false,
    };
  }

  handleRoomSelecetion = (x) => {
    if (x.isGroup) {
      this.setState( { roomId: x.id } );
    } else {
      this.setState({ roomId: x.room.id });
    }
  };

  handleClickFriendOpen = () => {
    this.setState({
      friendDialogOpen: true,
    });
  }

  handleClose = () => {
    this.setState({ friendDialogOpen: false });
  }

  render() {
    const { classes } = this.props;
    return (
      
      <Fragment>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton onClick={ this.handleClickFriendOpen } className={classes.menuButton} color="inherit" aria-label="Menu">
                <PersonAdd />
              </IconButton>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <GroupAdd />
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
        
        <Dialog
          fullWidth
          open={this.state.friendDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select your new contact.
            </DialogContentText>

            { /* finding contact */ }

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

      </Fragment>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat)