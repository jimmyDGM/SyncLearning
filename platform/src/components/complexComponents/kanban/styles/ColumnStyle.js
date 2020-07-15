import styled from 'styled-components';

export const AddButton = styled.div`
	color: white;
	background-color: #b1f0ad;
	width:40%;
	padding : 2%;
	margin: 5% 2% 2% 0%;
	border-radius : 10px;
`

export const ColumnContainer = styled.div`
	max-width : 600px;
	max-height:630px;

	width: 20%;
	padding:1%;
	margin: 1%;
	background-color: #b0d1ff99;
	border-radius:10px;


	p {
		margin:0;
	}

	.block-hide{
    display:none;
}
`

export const ColumnHeader = styled.div`
	color: #999999;
	border-radius: 10ox;
	display:flex;
	justify-content:space-between
`