import styled from 'styled-components';

export const Container = styled.div`
display:flex;
width: 100%;
max-height:650px;
text-align: center ;

input{
    height: 20px;

}
`

export const Header = styled.div`
display:flex;
margin-left: 2%;
margin-right: 2%;

button{
   border: 2px solid #b0d1ff;
   margin-left: 2%;
   margin-right: 2%;

}
`

export const AddButton = styled.div`
color: white;
background-color: #b0d1ff;
padding : 10px 15px 10px 15px;
border-radius : 10px;
margin: 4%;
text-align: center;
max-height: 30px;
`
export const PlusButton = styled.div`
color: white;
background-color: #b0d1ff;
padding : 10px;
border-radius : 30px;
margin: 4%;
text-align: center;
max-height: 30px;
`


export const ButtonContainer = styled.div`
display:flex;
justify-content:center;
padding: 20px;


`

export const AddContainer = styled.div`

padding: 20px;
border: 2px solid #cccccc;
border-radius : 10px;


`