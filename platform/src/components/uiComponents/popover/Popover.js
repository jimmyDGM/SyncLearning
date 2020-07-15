import React from 'react';
import styled from 'styled-components';

export default class Popover extends React.Component {
 

    // componentDidUpdate(prevProps) {
    // 	if (this.props.open !== prevProps.open) {


    // 	}
    //   }

    clear(e) {
        e.preventDefault()

        for (var key in this.childrenClearFunctions) {
            this.childrenClearFunctions[key].call()
        }
    }

    render() {
        // const registerClear = (inputId, clearFunc) => {

        //     this.childrenClearFunctions[inputId] = clearFunc
        // }


        // const unSubscribeClear = (inputId) => {
        //     delete this.childrenClearFunctions[inputId]
        // }

        const children = React.Children.map(this.props.children, child => {
            if (child !== null) {
                return React.cloneElement(child, {
                   // setParentState: this.setParentState,
                    // registerClear: registerClear,
                    // unSubscribeClear: unSubscribeClear
                });
            }

        });

        const { close } = this.props
        if (this.props.open !== null) {
            return (
                <div style={styles.container} >

                    <Info>
                    <CrossContainer>
							<img src='/assets/close.png' style={{margin: '3%', width: '100%'}} onClick={close} alt=''/>
						</CrossContainer>
                        <div style={{margin:'30px'}} >

        
                        {children}
                        </div>


                    </Info>
                </div>
            );

        } else {
            return (
                <div></div>
            )
        }

    }
}



const Info = styled.div`
background-color : White;
width: 80%;
padding: 1%;
margin: 8%;
text-align: left;
overflow: scroll;
border-radius : 20px;
color: #999999;
button {
    border: 2px solid #b1f0ae;
    padding : 5px 8px 5px 8px;
    border-radius : 10px;
    margin: 5px;
    color:#999999;

}

`

const CrossContainer = styled.div`
		position: absolute;
		display: flex;
		justify-content: flex-end;
`


const styles = {
    container: {
        backgroundColor: '#00000099',
        zIndex: 30,
        top: 0,
        left: 0,
        height: '100%',
        position: 'absolute',
        width: window.innerWidth,
        display: 'flex',

    },

}



Popover.defaultProps = {
    source: '/imageCha/artCha1.jpg',
    sourceCross: '/cross.png',
    artiste: 'picasso',
    title: 'guernica',
    annee: 'annee',
    hash: '0x6d6zg664e661fa2d2e3f56a67e6b6d',
    descritption: 'tyui',
}
