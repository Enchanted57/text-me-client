import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import client from '../feathers';
import { List, ListItemText, ListItem, Paper, TextField, Fab } from '@material-ui/core';
import Send from '@material-ui/icons/SendOutlined';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

const maxHeight = 638;

const styles = theme => ({
  rootList: {
    height:maxHeight,
    maxHeight:maxHeight,
    overflow: 'auto',
  },
  listItemRight: {
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
  },
  listItemLeft: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  messagePaper: {
    width: 'auto',
    maxWidth: '200',
  },
  textField: {
    width: '90%',
    margin: theme.spacing.unit,
  },
  margin: {},
  listItemFix: {
    paddingLeft: 0,
  },
});

const noMessagesText = "No messages yet";

export class ChatRoomPane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: 0,
      message: '',
    };

    this.messagesEnd = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.roomId !== prevState.roomId) {
      return {
        roomId: nextProps.roomId,
        chatRoomOrError: null
      }
    }

    return null;
  }

  scrollToBottom = () => {
     if (this.messagesEnd.current)
       this.messagesEnd.current.scrollIntoView();
  }

  componentDidMount() {
    this.fetchChatRoom(this.state.roomId);
    client.service('messages').on('created', message => {

      if (this.state.chatRoomOrError && message.chatRoomId === this.state.chatRoomOrError.id) { 
        const user = this.state.chatRoomOrError.participants.find(x => x.id === message.userId);
        const messageObject = {
          user,
          createdAt: message.createdAt,
          text: message.text,
          id: message.id,
        };

        let chatRoomCopy = { ...this.state.chatRoomOrError };
        chatRoomCopy.messages.push(messageObject);
        this.setState({
          chatRoomOrError: chatRoomCopy
        });
        this.scrollToBottom();
      }

    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.chatRoomOrError === null) {
      this.fetchChatRoom(this.state.roomId);
    }
  }

  fetchChatRoom = (roomId) => {
    if (roomId !== 0) {
      client.service('chat-rooms').get(roomId)
        .then(res => {
          this.setState( { chatRoomOrError: res } );
        })
        .catch(err => (
          this.setState({ chatRoomOrError: err})
        ));
    }
  };

  send = () => {

    if (this.state.chatRoomOrError) {
      client.service('messages')
        .create({ text: this.state.message, chatRoomId: this.state.chatRoomOrError.id })
        .then(() => console.log('created'))
        .catch(err => console.log(err));

        this.setState({
          message: '',
        });
    }
  };

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  render() {

    if (this.state.chatRoomOrError === null) {
      return (
        <p>Loading...</p>
      )
    } else {
      const { classes } = this.props;
      let messagesList;

      if (this.state.chatRoomOrError) {
        const meText = "me";
        messagesList = this.state.chatRoomOrError.messages.map(message => 
            <ListItem key={message.createdAt} className={verifyIdEquality(this.props.user.id, message.user.id) ? classes.listItemLeft : classes.listItemRight}>
              <Paper>
                <ListItemText>{dayjs(message.createdAt).format('DD.MM.YY HH:mm')}</ListItemText>
                <ListItemText className={classes.listItemFix}>{verifyIdEquality(this.props.user.id, message.user.id) ? meText : message.user.name}: {message.text}</ListItemText>
              </Paper>
            </ListItem>
        );

        return (
          <main>
            <Fragment>
              <List  dense={true} className={classes.rootList} >
                { messagesList }
                <div ref={this.messagesEnd} style={ {float:'left', clear: 'both'} } />
              </List>
              
            </Fragment>
            <Fragment>
              <TextField
                value={this.state.message}
                className={classes.textField}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                label="Your message."
                variant="outlined"
                id="custom-css-outlined-input"
                onChange={e => this.handleChange(e)}
              />
              <Fab 
                color="primary" 
                aria-label="Edit" 
                className={classes.fab}
                onClick={() => this.send()}
              >
                <Send />
              </Fab>
            </Fragment>
          </main>
        )
      } else {

        return <Fragment>Nothing selected</Fragment>
      }
    }
    
  }
}

function verifyIdEquality(id1, id2) {
  return id1 === id2;
}

ChatRoomPane.propTypes = {
  roomId: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(ChatRoomPane)
