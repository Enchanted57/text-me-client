import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Face from '@material-ui/icons/Face';
import Contacts from '@material-ui/icons/Contacts';
import GroupWork from '@material-ui/icons/GroupWork';
import Group from '@material-ui/icons/Group';


const styles = theme => ({
  rootList: {
    maxHeight: 800,
    overflow: 'auto'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

export class ContactsPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openContacts: true,
      openGroups: true
    }
  }

  handleContactsClick = () => {
    this.setState(state => ({ openContacts: !this.state.openContacts }));
  };

  handleGroupsClick = () => {
    this.setState(state => ({ openGroups: !this.state.openGroups }));
  };

  render() {
    const { classes } = this.props;
    const { user: {contacts, groups} } = this.props;

    const contactList = contacts.map(x => 
      
      <ListItem button className={classes.nested} onClick={() => this.props.handleRoomSelecetion(x)} >
        <ListItemIcon>
          <Face />
        </ListItemIcon>
        <ListItemText primary={x.name} />
      </ListItem>
    );

    const groupList = groups.map(x => 
      <ListItem button className={classes.nested} onClick={ () => this.props.handleRoomSelecetion(x) } >
        <ListItemIcon>
          <GroupWork />
        </ListItemIcon>
        <ListItemText primary={x.name} />
      </ListItem>
    );

    return (
      <List component="ul" className={classes.rootList} >
        <ListItem button onClick={this.handleContactsClick}>
          <ListItemIcon>
            <Contacts />
          </ListItemIcon>
          <ListItemText inset primary="Contacts" />
            {this.state.openContacts ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openContacts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { contactList }
            </List>
        </Collapse>
        <ListItem button onClick={this.handleGroupsClick}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText inset primary="Groups" />
            {this.state.openGroups ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.openGroups} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              { groupList }
            </List>
        </Collapse>
      </List>
    );
  }
}

ContactsPane.propTypes = {
  user: PropTypes.object.isRequired,
  handleRoomSelecetion: PropTypes.func.isRequired
}

export default withStyles(styles)(ContactsPane)
