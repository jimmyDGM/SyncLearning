import React from 'react';
import styled from 'styled-components';


const BannerWrapper = styled.div`
width: 100%;
height: 450px;
object-fit: contain;
border: 2px solid;
align-items: center;
background-image: url(${props => props.image});
background-repeat: no-repeat;
background-size: cover;
display: flex;
justify-content: ${props => props.position};
`



const BannerCard = styled.div`
height: 250px;
width: 20%;
display: grid;  
text-align: ${props => props.position};
justify-content: left;
`

const BannerTitle = styled.h2`
padding: 0.5em;
`

const BannerText = styled.p`
font-size: 1em;
padding: 0.5em;
`

const BannerButton = styled.button`
border: rounded 1px solid;
width: 30%;
margin: auto;
`


const Banner = (props) => {
   
    return(
        <BannerWrapper image={props.item.image} position={props.position}>
            <BannerCard position={props.position}>
                <BannerTitle>{props.item.title}</BannerTitle>
                <BannerText>{props.item.text}</BannerText>
                <BannerButton>{props.item.button}</BannerButton>
            </BannerCard>
        </BannerWrapper>
           
        

    )
}

export default Banner;
