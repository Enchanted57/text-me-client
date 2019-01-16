import React, { Component } from 'react'
import client from '../feathers';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  rootList: {
    height: 300,
    maxHeight: 300,
    width: '100%',
    overflow: 'auto'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

export class ListOfUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: this.props.contacts,
    }
  }

  _handleDelete = (userId) => {
    this.setState({
      contacts: this.state.contacts.filter(x => x.id !== userId)
    });
    console.log(this.state);
  }

  addContact = (friendId) => {
    client.service('contacts').create({
      friendId: friendId,
      userId: this.props.user.id,
    })
    .then((res) => {
      console.log(res);
      this._handleDelete(res.friendId);
    })
    .catch(err => console.log(err, err.message));
  }


  render() {
    const { classes } = this.props;
    const contacts = this.state.contacts.map(x => 
      <ListItem key={x.id}>
        <ListItemText primary={`${x.name} : ${x.email}`} />
        <Button variant="outlined" size="small" color="primary" className={classes.margin} onClick={() => this.addContact(x.id)} >
          Add to contact list
        </Button>

      </ListItem>
 );
    return (
      <List component="ul" className={ classes.rootList }>
        { contacts }
      </List>
    );
  }
}

export default withStyles(styles)(ListOfUsers)
