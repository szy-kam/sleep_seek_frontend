
import React, {Component} from 'react';
import { StayRepository } from '../../repository/stay';
import style from './stay.css'

class EditStay extends Component{

    state = {
        stay : {
            id: this.props.match.params.id,
            name: "",
            address: {
                city: "",
                street: "",
                zipCode: ""
            },
            mainPhoto: "",
            description: "",
            price: "",
            contactInfo: ""
        },
        images : []
    }

    componentDidMount() {
        StayRepository(this.state.stay.id).then(response => this.setState({ stay: response}))    
    }

    submitForm = (e) => {
        e.preventDefault();
    }

    handleInput = (event,name) => {
        const newStay= {
            ...this.state.stay
        }
        newStay[name] = event.target.value

        this.setState({
            stay:newStay
        })
    }

    handleUpload(){
        //TODO
    }

    render(){
        return(
            <div className={style.stayEditCompoment}>
                <form onSubmit={this.submitForm} className={style.editForm}>
                    <label>Name</label>
                    <input onChange={(event)=>this.handleInput(event,'name')} value={this.state.stay.name} />
                    <label>City</label>
                    <input onChange={(event)=>this.handleInput(event,'city')} value={this.state.stay.address.city} />
                    <label>Street</label>
                    <input onChange={(event)=>this.handleInput(event,'street')} value={this.state.stay.address.street} />
                    <label>Zip Code</label>
                    <input onChange={(event)=>this.handleInput(event,'zipCode')} value={this.state.stay.address.zipCode} />
                    <label>Price</label>
                    <input onChange={(event)=>this.handleInput(event,'price')} value={this.state.stay.price} />
                    <label>Contact Info</label>
                    <input onChange={(event)=>this.handleInput(event,'contactInfo')} value={this.state.stay.contactInfo }/>
                    <label>Description</label>
                    <textarea onChange={(event)=>this.handleInput(event,'description')} value={this.state.stay.description} />
                    <input type="file" onChange={this.handleUpload} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}
export default EditStay;