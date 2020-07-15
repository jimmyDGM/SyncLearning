import React from 'react';
import { connect } from 'react-redux'
import {Cell, Container, Check} from './styles/CheckListStyle'
const axios = require('axios');


class Checklist extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            checklist: props.items,
            uuid:props.uuid
        }
    }

	handleChange(e) {
		this.setState({[e.target.id]: e.target.value})
    }

    checkItem(i) {
        let items = this.state.checklist
        items[i].done = !items[i].done
        this.setState({checklist:items}, e => this.handleSave())
    }

    handleSave() {
        //save in db
		var url = window.location.href;
		var splitedUrl = url.split('/')		
		axios.post(this.props.baseApi+'api/kanban/card/checkList/' + splitedUrl[4], this.state)
		.then((response) => {
            console.log(response.data)
       
		})
		.catch((error) => {
			console.log(error);
		});
	 }

    handleSubmit() {
        let items = this.state.checklist;
        items.push({item:this.state.newCheck, done:false})
        this.setState({checklist: items, newCheck:''}, e => this.handleSave())
    }

    handleDelete(i) {
        let data = this.state.checklist
        data.splice(i, 1)
        this.setState({checklist: data}, e => this.handleSave())
    }

    renderList() {
        let list = this.state.checklist.map((item, i) => {
            return(
                <Cell key={i}>
                    <div style={{width:'100%', display:'flex'}} >
                        <Check onClick= {e => this.checkItem(i)}>
                        {item.done? <img src='/assets/ic_check.png' alt='checked item' width='20' /> : null}

                        </Check>
                        <p>{item.item}</p>
                    </div>

                    <button id={i} onClick={e => this.handleDelete(i)} >X</button>
                </Cell>
            )
        })
        return list

    }

	render() {
		return (
			<Container>
                {this.renderList()}
                <input type='text' id ='newCheck' value={this.state.newCheck} onChange={e => this.handleChange(e)} />
                <button onClick={e => this.handleSubmit()} >Add</button>
			</Container>
		);
	}
}



const mapStateToProps = (state) => {
    return{
		currentProject: state.currentProject,
        level:state.level,
        baseApi : state.baseApi
    }
}

export default connect(mapStateToProps)(Checklist)
