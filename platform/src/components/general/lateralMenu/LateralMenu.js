import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Todo from '../../complexComponents/todo/Todo'
const axios = require('axios')

export default class LateralMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: []
		}
	}
	componentDidMount() {
		this.fetchTodos()

	}

	logout() {
		//document.cookie = "cookiename= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
		//TODO send request to delete current token before forgetting it
		axios.defaults.headers.common['token'] = '';
		document.cookie = '';
		console.log(document.cookie)
		this.props.openLateral()


	}

	fetchTodos() {
		axios.get(this.props.baseApi + 'api/user/todo')
			.then((response) => {
				this.setState({ items: response.data[0].checklist })

			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div style={styles.menuList}>
				<CloseButton onClick={e => this.props.openLateral()} >
					<img src='/assets/right.png' alt='close button' />
				</CloseButton>

				{this.state.todos
					? <div>
						<Cell ><button onClick={e => this.setState({ todos: false })} >menu</button></Cell>
						<Todo items={this.state.items} uuid={1} ></Todo>
					</div>
					:
					<div>

						<ProfileWrapper onClick={e => this.props.openLateral()} ><Link className="pages" to="/UserProfile"> <p style={styles.text} >Profile</p> </Link></ProfileWrapper>

						<List>

							<div onClick={e => this.setState({ todos: true })} >
								<img src='/assets/checkListIcon.svg' width='50%' />
								<p>Check list</p>

							</div>
							<Link className="pages" to="/agenda">

							<div onClick={e => this.props.openLateral()}>
									<img src='/assets/calendarIcon.svg' width='50%' />
									<p style={styles.text}>Agenda</p>
							</div>
							</Link>
							<Link className="pages" to="/kanban">
							<div onClick={e => this.props.openLateral()}>
								
									<img src='/assets/kanbanIcon.svg' width='50%' />
									<p style={styles.text}>Kanban</p>
								</div>
								</Link>
							{/* <div onClick={e => this.props.openLateral()}><Link className="pages" to="/Chat"> <p style={styles.text}>Chat</p> </Link></div>
							<div onClick={e => this.props.openLateral()}><Link className="pages" to="/TeamScreen"> <p style={styles.text}>Team</p> </Link></div>
							<div onClick={e => this.logout()}> <p style={styles.text}>logout</p></div>
							<div onClick={e => this.props.openLateral()}><Link className="pages" to="/shop"> <p style={styles.text}>Shop</p> </Link></div>
							<div onClick={e => this.props.openLateral()}><Link className="pages" to="/project"> <p style={styles.text}>Project</p> </Link></div> */}
						</List>
					</div>
				}




			</div>

		);
	}
}

const CloseButton = styled.div`
	margin:15px;
 	border:2px solid white; 
	width:35px;
	display:flex;
	justify-content:center;

`
const List = styled.div`
	text-align:center;
	font-size:20;
	font-weight: 600;
	a{
		text-decoration: none;
	}
	display: grid;
    grid-template-columns:1fr 1fr 1fr;
    
    grid-gap: 6px 6px;
    justify-items: center;
    align-items: center;

`


const ProfileWrapper = styled.div`
	border: 2px solid white;
	border-radius: 50px;
	width: 80px;
	height: 80px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 20px;

`

const Cell = styled.div`
	text-align:right;

`

const styles = {

	menuList: {
		width: '25%',
		color: '#ffffff',
		position: 'fixed',
		top: 0,
		right: 0,
		backgroundColor: '#b0d1ff',
		height: '100%',
		textAlign: 'center',

	},
	text: {
		color: '#ffffff'
	}

}