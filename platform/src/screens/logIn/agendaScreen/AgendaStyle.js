import styled from 'styled-components'

export const AgendaSwitch = styled.div`
    text-align: center;
    min-height:100%;
    background-color:  #b0d1ff;
    position:absolute;

`
export const P = styled.p`
margin:4px;

`

export const Header = styled.div`
    display:flex;
    justify-content:center;
    p {
        margin: 2%;
    }

`

export const SwitchContainer = styled.div`
    button{
        margin: 10px;
        font-size: 15px;
        color:  ${props => (props.section === props.current) ? '#b0d1ff': '#cccccc'};;
        background-color: white;
        border-top-color: white;
        border-left-color: white;
        border-right-color:white;
        border-bottom-color:${props => (props.section === props.current) ? '#b0d1ff': '#cccccc'};;;

    }
`

export const CalendarBox = styled.div`
border: 2px solid #b0d1ff;
display: flex;
flex-direction:column;
border-radius: 10px 0px 0px 10px;
color: ${props => props.theme.main ? '#666666' : 'white' };

background-color: ${props => props.theme.main};

`
export const MeetingsBox = styled.div`
border: 2px solid #b0d1ff;
display: flex;
flex-direction:column;
color: ${props => props.theme.main ? '#666666' : 'white' };


background-color: ${props => props.theme.main};

border-radius: 0px 10px 10px 0px;

`