import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import _ from 'lodash';



const MessageContainer = styled.div`

`
const MessageCard = styled.div`
border: 2px solid;

`

const MessageMail = styled.div`
margin-top: 15px;
margin-bottom: 15px;
padding: 15px;
`

const MessageText = styled.p`
padding: 15px;

`

  

class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Message: [],
            open: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState({
          open: !this.state.open
        });
      }
    


    
componentDidMount() {
    axios.get('/api/Form')
    .then((response) => {
        const Message = response.data;
        this.setState({Message:Message})
    })
    .catch(function (error) {
        console.log(error);
    })
    
};


renderMessages(Message, index) {

    

    let messageList = _.partition(Message, index)
    let result = messageList[0].map(Message => {
        return(
            <MessageCard >
                <h3>from</h3>
                <MessageMail>{Message.email}</MessageMail>
                <h3 onClick={(e)=>this.handleClick(e)}>Message</h3>
        {this.state.open ? (<MessageText>{Message.text}</MessageText>) : null }
            </MessageCard>
        )
    })
    return(result)
}

  

    render(){
        return(
           <MessageContainer>
               {this.renderMessages(this.state.Message)}
           </MessageContainer>
        )
    }

}

export default Messages;