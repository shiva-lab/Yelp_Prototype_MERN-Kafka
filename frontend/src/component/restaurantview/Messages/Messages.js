import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import Navbar from "../rNavbar";
import {dateTimeToDate} from '../../../helperMethods'
import IndividualMessage from './IndividualMessage'
import { connect } from 'react-redux';
import { setMessages  } from "../../../redux/action/restaurantmessage.js";


class MessagesPage extends Component {
    constructor(props) {
        //Call the constrictor of Super classNameName i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            messages: [],
            selectedMessage: {
              chats:[],
              user1:{
                id:null,
                name:null
              },
              user2:{
                id:null,
                name:null
              }
            },
        }

        this.showMessageDetail = this.showMessageDetail.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    async componentWillMount() {

      console.log(localStorage.getItem('user_id'))

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        await axios.get(`http://localhost:3000/getMessages/${localStorage.getItem('restaurant_id')}`)
            .then(response => {
                console.log(response);
                if(response.data.data.length > 0){
                  this.props.setMessages(response.data.data);
                  this.setState({
                      selectedMessage: response.data.data[0],
                  })
                }
            }
            ).catch(ex => {
                console.log("eroor in message ", ex)
            });
    }

    showMessageDetail = (e) => {
      this.setState({
        selectedMessage: e
      })
    }

    render(){
      let messageList = this.props.messages.map(message => {
        let chattingWith = {};
        if(message.user1.id === localStorage.getItem('restaurant_id')){
          chattingWith = message.user2
        }
        else{
          chattingWith = message.user1
        }
        return (
          //active_chat
          <div className="chat_list "  key={message._id} onClick={()=>this.showMessageDetail(message)}>
                <div className="chat_people">
                  <div className="chat_img"> <img src={  chattingWith.profile_img_url == null ? 'https://ptetutorials.com/images/user-profile.png' : chattingWith.profile_img_url} className="img-circle"/> </div>
                  <div className="chat_ib">
                    <h5>{chattingWith.name} <span className="chat_date">{message.chats.length > 0 ? dateTimeToDate(message.chats[message.chats.length - 1].time) :""}</span></h5>
                    <p>{message.chats.length > 0 ? message.chats[message.chats.length - 1].chat : ""}</p>
                  </div>
                </div>
              </div>
        )
    });

    let messageFrom= null;
    if(this.state.selectedMessage.user1.id===localStorage.getItem('restaurant_id')){
      messageFrom = this.state.selectedMessage.user2.name
    }
    else{
      messageFrom = this.state.selectedMessage.user1.name
    }
        return (
            <div className="body">
            <Navbar/>
                <div className=" col-sm-10 col-sm-offset-1 card-columns margin20">
                    <div className="col-sm-12 card">
                        <div className="message-heading margin20 container-fluid">
                            <div className="row ">
                                <div className="col-sm-4 message-heading-left">
                                    <h4>Messages</h4>
                                </div>
                                <div className="col-sm-8 message-heading-right">

                                <h4>{messageFrom}</h4>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-sm-12 card">
                        <div className="message-box">
                                <div className="col-sm-4 messageListLeft white-back nopadding">
            
                                {messageList}</div>

                                <div className="col-sm-8 white-back">
                                <IndividualMessage individualMessage={this.state.selectedMessage} />
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

        )
    }
}
// Issue with maps to props and line 61

const mapStateToProps = state => {
  return {
      messages: state.restaurantMessage.messages,
      selectedMessage : state.restaurantMessage.selectedMessage
  };
};

function mapDispatchToProps(dispatch) {
  return {
      setMessages : (data) => dispatch(setMessages(data)),
  };
};
const Messages = connect(mapStateToProps, mapDispatchToProps)(MessagesPage);
export default Messages;  