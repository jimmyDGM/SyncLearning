import React from 'react';
import styled from 'styled-components';
import Banner from './Banner';


let BannerItems = 
    {image:`${require("./../../assets/images/golden-gate.jpg")}`, text:"Lorem Ipsum it amet, te vel nobis consul recusabo, qui numquam senserit eu. Nominavi repudiandae ut per. Debet cetero at sed. Mea ei agam feugiat nonumes, vim et tractatos conceptam. Id dicit dolores sea, et sed laudem dolores. Per munere postulant mnesarchum ad, vis admodum molestie antiopam ut.", title:"ejejejeje", button:"Contact us"};

  

export default class ContactScreen extends React.Component {

	render() {
		return (
			<div>
				<Banner item={BannerItems} position={`center`} />
                Contact
            </div>
		)
	}
}
