import React, { Component } from 'react'
import client from '../feathers';
import ContactsPane from './ContactsPane';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';

import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Face from '@material-ui/icons/Face';
import Contacts from '@material-ui/icons/Contacts';
import GroupWork from '@material-ui/icons/GroupWork';
import Group from '@material-ui/icons/Group';
import { AppBar } from '@material-ui/core';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: '16',
    }
  }

  handleRoomSelecetion = (x) => {
    console.log(x)
  };

  render() {
    const { classes } = this.props;
    
    return (

      <React.Fragment>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={4}>
          <Paper>
            <ContactsPane user={this.props.user} handleRoomSelecetion={ this.handleRoomSelecetion } />
          </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper>
              Chat room goes there
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  user: PropTypes.object.isRequired
}

export default withStyles(styles)(Chat)