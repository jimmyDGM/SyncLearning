import styled from 'styled-components'

export const Container = styled.div`
	h3{
		margin:0%;
	}
`


export const CalendarBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap:0px;
	margin: 0% 4% 0% 10%; 

	div:first-child {
		grid-column: ${props => props.firstDay};
	}

`
export const WeekBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap:0px;
	margin: 0% 4% 0% 10%; 
	height: 500px;
	overflow-x: scroll;
	div:first-child {
		grid-column: ${props => props.firstDay};
	}

`

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap:0px;
  margin: 0% 4% 2% 10%; 

	text-align:center;

`
export const ArrowButton = styled.div`
	background-color: white;
	margin:1%;

`

export const Meeting = styled.div`
	border-radius:6px;
	background-color:  #b1f0ad;
	max-width: 50%;
	padding:2px;
	margin: 4px;
	font-size: 10px;

`

export const Card = styled.div`
	border: 2px solid  #eeeeee;
	min-height: 150px;

`

export const ColorCard = styled.div`
	border: 4px solid  #b1f0ad;
	min-height: 150px;


`