import React from 'react';
import styled from 'styled-components';

export default class AddButton extends React.Component {

	render() {
		return (	
				<Container >
                    <AddBouton onClick={e => this.props.onClick()} >
                        {this.props.labe}
                    </AddBouton>
				</Container>
		);
	}
}
 
const Container = styled.div`

`

 
const AddBouton = styled.button`
    
    background-color: red;
`