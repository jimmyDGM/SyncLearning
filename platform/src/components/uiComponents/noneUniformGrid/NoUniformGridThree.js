import React from 'react';
import styled from 'styled-components'

export default class NoUniformGridThree extends React.Component {

	render() {
		return (
            <Board>

            </Board>
		);
	}
}

const Board = styled.div`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);

.one {
  grid-column: 1 / 3;
  grid-row: 1;
}
.two { 
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.three {
  grid-column: 1;
  grid-row: 2 / 5;
}
.four {
  grid-column: 3;
  grid-row: 3;
}

`