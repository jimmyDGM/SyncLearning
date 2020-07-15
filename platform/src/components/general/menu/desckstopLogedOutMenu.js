import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

export default class desckstopLogedOutMenu extends React.Component {


	render() {
		return (
			<MenuList >

				<div><Link className="pages" to="/"> Home </Link></div>
				<div><Link className="pages" to="/About"> About </Link></div>
				<div><Link className="pages" to="/News"> News </Link></div>
				<div><Link className="pages" to="/Contact"> Contact </Link></div>
				<div><Link className="pages" to="/sign"> sign in/up </Link></div>

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
			margin: 5px;
		}
		p{
			color:#ffffff;
		}

`