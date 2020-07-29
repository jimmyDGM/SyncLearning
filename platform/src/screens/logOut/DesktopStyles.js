import styled from 'styled-components'


export const Row = styled.div`
display: flex;
`;

export const Col = styled.div`
text-align: center;
`;

export const DesktopImg = styled.img`
  width: 50%;
  height: 50%;
  object-fit: cover;
  border: 1px solid;
`;

export const Wrapper = styled.div`
justify-content: space-evenly;
text-align: center;
`

export const Number = styled.h3`

`

export const Text = styled.p`

`

export const RoundWrapper = styled.div`
width: 100%;
text-align: center; 
padding-left: 20px;
padding-right: 20px;
`

export const RoundImg = styled.img`
border-radius: 50%;
`

export const SideContainer = styled.div`
display: flex;
margin: auto;
width: 50%;
padding: 1em;
`

export const SideImg = styled.img`
margin-left: 2em;
margin-right: 2em;
`
export const TextWrapper = styled.div`
`
export const SideTitle = styled.h3`
`

export const SideCol = styled.div`
justify-content: space-between;
display: flex;
flex-direction: ${props => props.position};
`

export const SideText = styled.p`
`