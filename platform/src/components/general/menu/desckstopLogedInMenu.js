import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default class desckstopLogedInMenu extends React.Component {


	render() {
		return (
			<MenuList>

				<div><Link className="pages" to="/Forum"> <p >Forum</p> </Link></div>
				<div><Link className="pages" to="/Dashboard"><p>Dashboard</p> </Link></div>
				<div><Link className="pages" to="/News"> <p>News</p> </Link></div>
				<div><Link className="pages" to="/project"> <p>Project</p> </Link></div>

			</MenuList>
		);
	}
}

const MenuList = styled.div`
		margin-top:1%;
		display:flex;
		justify-content:space-between;

		a {
			color : white;
			text-decoration: none;
			font-weight: 650;
		}
		p {
			margin:10px;
		}


`