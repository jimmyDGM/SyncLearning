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
`

const MessageText = styled.div`

`


class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Message: []
        }
    }

componentDidMount() {
    axios.get('/api/Form')
    .then((response) => {
        const Message = response.data;
        this.setState({Message:Message})
        console.log(response)
    })
    .catch(function (error) {
        console.log(error);
    })
};

renderMessages(Message, index) {

    let messageList = _.partition(Message, index)
    let result = messageList[0].map(message => {
        return(
            <MessageCard >
                <label>from</label>
                <MessageMail />
                Message
                <MessageText />
                <h3>hey</h3>
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