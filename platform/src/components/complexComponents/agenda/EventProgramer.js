import React from 'react';
import moment from 'moment'
import {Container} from './AgendaStyle'
const days= ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']

export default class EventProgramer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		}
	}



	render() {
		return (
			<Container>
                <div style={{marginLeft: '100px'}} >  
                <p>program recurrent meetings to be placed in your agenda and invite member of your team</p>
                <p>weekly</p>
                <p>mothly</p>
                <p>dayly</p>
                <p>annualy</p>
            </div>

			</Container>
		);
	}
}

