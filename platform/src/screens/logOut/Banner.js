import React from 'react';
import styled from 'styled-components';


const BannerWrapper = styled.div`
width: 100%;
object-fit: cover;
`

const Banner = (props) => {
    return(
        <BannerWrapper>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
            <img src="${require(./../../assets/images/imgdummy.png)}" />
        </BannerWrapper>
           
        

    )
}

export default Banner;
