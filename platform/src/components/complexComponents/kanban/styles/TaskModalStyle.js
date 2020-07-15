import styled from 'styled-components';

export const OffDescription = styled.div`
padding:1%;
border-radius : 15px;
border: 2px solid #b0d1ff;
min-height: 60%;

`

export const WidgetWrapper = styled.div`
    min-width: 60%;
    min-height: 60%;
`


export const TodoContainer = styled.div`
min-width: 400px;

`

export const AddButton = styled.div`
color: white;
background-color: #b0d1ff;
padding : 5px;
margin: 2% 5% 2% 6%;
border-radius : 10px;

p {
    margin:0px;
}
`

export const TextArea = styled.textarea`
height: 50px;
width: 80%;
border: none;
background-color: #f0f0f0;
padding:1%;
border-radius : 15px;

`
export const Widgets = styled.div`
display:flex;
min-height: 380px;

`

export const Header = styled.div`
display:flex;
justify-content: space-between;
border-bottom: 1px solid #cccccc;

`
export const Cell = styled.div`
border: 2px solid #cccccc;
padding: 10px;
border-radius : 10px;

`

export const CommentInput = styled.div`
margin:1%;
color: #999999;
input {
    width:50%;
    height:20px;
    border-radius : 8px;
    border: 1px solid #cccccc;

}
`


export const Footer = styled.div`
    border-top: 1px solid #cccccc;

`

export const Switcher = styled.div`
    width: 200px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`


export const ContentCell = styled.div`
    margin: 5px;
    border: 2px solid #b0d1ff;
    border-radius : 10px;
    padding:1%;

`

export const Comment = styled.div`
    margin: 5px;
    border: 2px solid #b0d1ff;
    border-radius : 10px;
    padding:1%;

    p {
        font-size: 10px;
    }

`

export const Info = styled.div`
    background-color : White;
    width: 80%;
    padding: 1%;
    margin: 8%;
    text-align: left;
    overflow: scroll;
    border-radius : 20px;
    color: #999999;
    button {
        border: 2px solid #b1f0ae;
        padding : 5px 8px 5px 8px;
        border-radius : 10px;
        margin: 5px;
        color:#999999;

    }

`
