import { template } from '@babel/core';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import {StaysCardRepository} from '../../../repository/Stays'
import style from './staysCard.css'


class StaysCard extends Component {

    state = {
        stays: []
    }

    componentDidMount() {
        StaysCardRepository().then(response => this.setState({ stays: response}))
    }
    
    renderMoreHandler=() =>{
        StaysCardRepository().then(response => this.setState({ stays: [...this.state.stays,...response]}))
    }
    
    renderMore(){
        return <button className={style.showMoreButton} onClick={this.renderMoreHandler}>Show more</button>
    }


    renderCards(template, stays){
        switch(template){
            case('default'):
            return (
                <div className={style.staysContainerT1}>
                {stays.map((item,i) =>(
                    <div key={i} className={style.staysCardT1}>
                        <div className={style.left}>
                            <div className={style.image}><Link to={`/stays/${item.id}`}><img src={`https://picsum.photos/15${i}.jpg`} alt=""></img></Link></div>
                        </div>
                        <div className={style.right}>
                            <div className={style.name}><Link to={`/stays/${item.id}`}>{item.name}</Link></div>
                            <div className={style.address}>Address: {item.address.city}, {item.address.address}</div>
                            <div className={style.price}>{item.address.zipCode} zł</div>
                            <button className={style.itemButton}><Link to={`/stays/${item.id}`}>View more</Link></button>
                        </div>
                    </div>
                ))}
            </div>)
            break;
            case('mini'):
                return (
                    <div className={style.staysContainerT2}>
                    {stays.map((item,i) =>(
                    <div key={i} className={style.staysCardT2}>
                        <div className={style.image}><Link to={`/stays/${item.id}`}><img src={`https://picsum.photos/15${i}.jpg`} alt=""></img></Link></div>
                        <div className={style.name}><Link to={`/stays/${item.id}`}>{item.name}</Link></div>
                        <div className={style.price}>{item.address.zipCode} zł</div>
                        <button className={style.itemButton}><Link to={`/stays/${item.id}`}>View more</Link></button>
                    </div>
                ))}
                </div>)
            break;
            default:
                return <p>No card template choosen.</p>
        }
       
    }
    

    
    render(){
        return (
        <div >
            {this.renderCards(this.props.template, this.state.stays)}
            {this.renderMore()}
        </div>
        )
    }
    
}

export default StaysCard;