import styled from 'styled-components'

export const FormCentered = styled.div`
width:40%;
border: 2px solid #ededed;
display: flex;
justify-content: center;
align-items: center;

`
export const Name = styled.label`
margin: 3% 0% 2% 0%;

`


export const MeetingList = styled.div`
width: 40%;
border: 2px solid #ededed;

`
export const CellContainer = styled.div`
display:flex;
input {
	margin-right:10px;
}
`
export const Container = styled.div`
display:flex;
justify-content:center;
`

export const Area = styled.div`
background-color: #eeeeee;
padding: 6px;
margin: 4% 0% 2% 0%;

`
export const DetailContainer = styled.div`
text-align:left;
width:80%;
p{
    margin: 1%;
}

`

export const SendButton = styled.button`
	color: white;
	font-weight: bold;
	font-size: 15px;
	background-color: #e85e61;
	border-radius:10px;
	margin:2%;
`

export const AddButton = styled.button`
color: white;
background-color: #b1f0ad;
width:40%;
padding : 1%;
margin: 3%;
border-radius : 10px;
font-size: 20px;
`

export const Meeting = styled.div`
width:100%;
display: grid;
grid-template-columns: repeat(4, 1fr);


`

export const FormContainer = styled.form`
width:80%;
text-align:left;
display: flex;
flex-direction:column;
color: #999999;

input {
    height:20px;
    margin-bottom:10%;
    font-size: 15px;
	color: #999999;
}

`