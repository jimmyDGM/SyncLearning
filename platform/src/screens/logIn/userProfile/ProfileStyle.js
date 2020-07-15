import styled from 'styled-components'

export const ProfileInputs = styled.input`
height: 20px;
margin: 2%;
border-radius:10px;
font-size:15px;
`

export const EditButton = styled.button`
position:absolute;
top: 12%;
right:2%;
background-color: #b0d1ff;
`

export const ProfilePicture = styled.div`
border-radius: 60px;
width: 120px;
height: 120px;
align-self:center;
overflow:hidden;
`

export const TextContainer = styled.div`
padding: 4%;
border-radius: 18px;
width: 80%;
text-align:left;
align-self:center;
border: 2px solid #b0d1ff;
margin-bottom: 2%;
`

export const TimePoint = styled.div`
display:flex;
align-items:center;

`

export const Endorsment = styled.div`
border-radius: 50px;
width: 80%;
height: 200px;
align-self:center;

`

export const DateBubble = styled.div`
font-size: 15px;
margin:3%;
border: 2px solid black;
border-radius: 100px;
width: 6%;
height: 50px;
text-align:center;
`

export const Container = styled.div`
display: flex;
flex-direction:column;
justify-content:center;
margin:2%;
text-align:center;
color:#cccccc;

`
export const BadgeCell = styled.div`
    padding:2%;
    border:2px solid #b0d1ff;
    max-width: 74px;
    margin:2%;
    text-align:center;
    border-radius: 10px;
`

export const SquareCard = styled.div`
    padding:2%;
    margin:2%;
    text-align:center;
    border-radius: 10px;
    background-color:  #b0d1ff;
`

export const GridContainer = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr 1fr;
    grid-gap: 30px 30px;
`

export const SwitchContainer = styled.div`
    button{
        margin: 10px;
        font-size: 15px;
        color:  ${props => (props.section === props.current) ? '#b0d1ff': '#cccccc'};
        background-color: white;
        border-top-color: white;
        border-left-color: white;
        border-right-color:white;
        border-bottom-color:${props => (props.section === props.current) ? '#b0d1ff': '#cccccc'};

    }
`