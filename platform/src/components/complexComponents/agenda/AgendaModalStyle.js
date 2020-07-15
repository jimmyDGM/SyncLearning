import styled from 'styled-components'

export const Name = styled.label`
margin: 3% 0% 2% 0%;

`

export const SendButton = styled.button`
	color: white;
	font-weight: bold;
	font-size: 15px;
	background-color: #e85e61;
	border-radius:10px;
	margin:2%;
`

export const FormContainer = styled.form`
width:80%;
margin-left:auto;
margin-right:auto;
text-align:left;
display: flex;
flex-direction:column;
color: #999999;

input {
    height:20px;
    margin-bottom:10%;
    font-size: 15px;
}

`
export const Container = styled.div`
display:flex;
justify-content:center;

`
export const Countainer = styled.div`
    background-color: #00000099;
    top:0;
      height:100%;
    position: fixed;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    color: #999999;

`

export const AddButton = styled.button`
color: white;
background-color: #b1f0ad;
width:40%;
padding : 1%;
margin: 2% 2% 2% 0%;
border-radius : 10px;
font-size: 20px;
`

export const Info = styled.div`
    position: relative;
    background-color : White;
    width: 40%;
    height: 70%;
    padding-top: 8%;
    margin: 4%;
`
export const Meetings = styled.div`
display:flex;
border: 2px solid #ededed;
justify-content:space-around;
`

export const DayMeetingList = styled.div`
    position: relative;
    background-color : White;
    width: 40%;
    height: 70%;
    padding-top: 8%;
    margin: 4%;
`

export const CrossContainer = styled.div`
    position: absolute;
    top:0;
    right: 4;
    display: flex;
    justify-content: flex-end;
`