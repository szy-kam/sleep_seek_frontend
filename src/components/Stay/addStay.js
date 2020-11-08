
import React, {Component} from 'react';
import { AddStayRepo} from '../../repository/stay';
import style from './stay.css'

class AddStay extends Component{

    state = {
        stay : {
            name: "Hotel",
            address: {
                city: "Katowice",
                street: "Miedziowa",
                zipCode: "24-222"
            },
            mainPhoto: "https://picsum.photos/300",
            description: "Lorem ibsum dom mit samit",
            price: "150",
            contactInfo: "900 909 990"
        },
        images : [],
        message : null,
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

    submitForm = (event) => {
        event.preventDefault();
        AddStayRepo(this.state.stay).then( ()=> this.setState({ message: "Added"}) )
    }

   
    redirectUser = () => {
        setTimeout(()=>{
            this.props.history.push('/')
        }, 2000)
    }

    message = () => {
        if (this.state.message)
            return <div className={style.message}> {this.state.message} {this.redirectUser()} </div>
        else
            return null
    }

    render(){
        return(
            <div className={style.stayEditCompoment}>
                {this.message()}
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
                    <label>Main Photo LINK</label>
                    <input onChange={(event)=>this.handleInput(event,'mainPhoto')} value={this.state.stay.mainPhoto} />
                    <button type="submit">Add stay</button>
                </form>
            </div>
        )
    }

}
export default AddStay;