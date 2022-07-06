import React, {Component} from 'react';
import ChatRoom from './ChatRoom';
import AddChannelForm from './AddChannelForm';
import ChannelList from './ChannelList';
import {addChannels, getChannelsForUser} from '../api/channels';
import {updateUserChannel} from '../api/users';
import ChatKit from '@pusher/chatkit-client';


export default class ChatDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      user: this.props.user,
      chatKitUser: {},
      chatKitRooms: [],
      messages: [],
      channelSelected: '',
      isLoadingChannels: true,
      usersTyping: []
    };

    this.selectChannel = this.selectChannel.bind(this);
    this.addChannel = this.addChannel.bind(this);
    this.deleteChannel = this.deleteChannel.bind(this);
    this.sendInvite = this.sendInvite.bind(this);
  }

  componentDidMount() {
    const chatManager = new ChatKit.ChatManager({
      instanceLocator: process.env.REACT_APP_INSTANCELOCATOR,
      userId: this.props.user.username,
      tokenProvider: new ChatKit.TokenProvider({
        url: process.env.REACT_APP_TOKEN_URL,
      })
    });

    chatManager
      .connect({
        onAddedToRoom: room => {
          this.setState({
            chatKitRooms: this.state.chatKitUser.rooms
          });

          //avoid alerting the user who created the channel
          if (room.createdByUserId !== this.state.chatKitUser.id) {
            alert(`You have been added to room ${room.name}`)
          }
        },
        onUserJoined: user => {
          this.forceUpdate()
        },
        onPresenceChanged: member => {
          this.forceUpdate()
        }
      })
      .then(currentUser => {
        this.setState({
          isLoadingChannels: false,
          chatKitUser: currentUser,
          chatKitRooms: currentUser.rooms
        })
      })
      .catch(err => console.log(err));

    // fetch all the channels then set state
    this.loadChannels();
  }

  /*componentWillUnmount() {
    this.state.chatKitUser.disconnect();
  }*/

  async loadChannels() {
    let loadedChannels = Array.from(await getChannelsForUser(this.state.user['channelIDs']));
    this.setState({
      channels: loadedChannels
    });
  }

  async selectChannel(channel) {
    if (channel.id === this.state.channelSelected.id) {
      return;
    }

    this.setState({
      messages: []
    })
    const selectChannel = await this.state.chatKitUser.subscribeToRoomMultipart({
      roomId: channel.id,
      hooks: {
        onMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        },
        onUserStartedTyping: user => {
          this.setState({
            usersTyping: [...this.state.usersTyping, user.name]
          });
        },
        onUserStoppedTyping: user => {
          this.setState({
            usersTyping: this.state.usersTyping.filter(userName => userName !== user.name)
          })
        }
      }
    })
    this.setState({
      channelSelected: selectChannel
    });
  }

  async addChannel(e, name) {
    e.preventDefault();
    if (!name) return;

    // post to db with new channel name and set state with the new channelId
    try {
      const channel = await addChannels(name, this.props.user.id);
      await this.state.chatKitUser.createRoom({
        id: channel._id,
        name: channel.name
      }).then(room => {
        this.state.chatKitUser.subscribeToRoom({
          roomId: room.id,
        })
      }).catch(err => {
        console.log(err);
      });
      const newUser = {...this.state.user};
      newUser.channelIDs.push(channel.id);
      this.setState(prevState => ({
        channels: [...prevState.channels, channel],
        user: newUser
      }));
    } catch (error) {
      console.log(error); // handle this better in future issue
    }
  }

  deleteChannel(e) {
    e.preventDefault();
    const newChannels = this.state.channels.filter(channel => {
      return channel.id !== this.state.channelSelected;
    });
    const channelSelected = newChannels[0];
    this.setState({
      channels: newChannels,
      channelSelected: channelSelected.id
    });
  }

  async sendInvite(userName, channelId) {
    try {
      const response = await updateUserChannel(userName, channelId);
      if (response.status === 200) {
        await this.state.chatKitUser.addUserToRoom({
          userId: response.data.user.username,
          roomId: channelId
        });
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-3 leftCol">
            <div className="row">
              <div className="col-sm-12 chanelListTitle" align="center">
                <h4>Channels</h4>
              </div>
            </div>
            <ChannelList
              channels={this.state.chatKitRooms || []}
              selectChannel={this.selectChannel}
              isLoadingChannels={this.state.isLoadingChannels}
            />
            <div className="row">
              <div className="col-sm-12 channelForm">
                <AddChannelForm
                  deleteChannel={this.deleteChannel}
                  addChannel={this.addChannel}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-9 rightCol">
            {!this.state.channelSelected ? (
              <div align="center">Please select a channel</div>
            ) : (
                <ChatRoom
                  channel={this.state.channelSelected}
                  user={this.state.chatKitUser}
                  messages={this.state.messages}
                  users={this.state.channelSelected.users}
                  sendInvite={this.sendInvite}
                  usersTyping={this.state.usersTyping}
                />
              )}
          </div>
        </div>
      </div>
    );
  }
}
