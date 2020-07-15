import React from 'react';
import Styled from 'styled-components';
import styled from 'styled-components';

const Button = styled.button`
  
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;
const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid;
`;

const StyledContainer = styled.div`
  max-width: 300px;
  width: 100%;
  text-align: center; 
  border: 1px solid;
  justify-content: space-between;
`;



const Card = (props) => (
<div>
	<StyledImg src="logo192.png" alt="image"></StyledImg>
	<Button> project name</Button>	
</div>
)


export default class HomeScreen extends React.Component {

	render() {
		return (
		<div>

home
<h1>Done</h1>
				<StyledContainer>
<Card></Card>
</StyledContainer>
<h1>In progress</h1>
<StyledContainer>
<Card></Card>
</StyledContainer>
<StyledContainer>
<Card></Card>
</StyledContainer>
		</div>
		
			
		)
	}
}

