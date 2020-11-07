
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LeftColumn from '../Stays/staysLayout'
import {StaysCardRepository} from '../../repository/stay'
import style from './stay.css'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';


class Stay extends Component{

    state = {
        stay : {
            id: 2,
            name: "Super Hote",
            address: {
                city: "Katowice",
                address: "Śledziowa 8",
                zipCode: "42-222"
            },
            mainPhoto: "https://picsum.photos/300/300",
            price: "4000",
            contactInfo: "690 000 000"
        },
        images : ["https://picsum.photos/300/300", "https://picsum.photos/301/300", "https://picsum.photos/302/300", "https://picsum.photos/303/300"],
        photoIndex: 0,
        isOpen: false,
    }

    componentDidMount() {
        StaysCardRepository().then(response => this.setState({ stay: response}))    
    }
    
    imageGrid() {
        return this.state.images.map((item,i) => (
                <img src={item} key={i} alt={item} onClick={() => this.setState({ isOpen: true, photoIndex: i })}></img>
        ))
    }

    lightbox(){
        const { photoIndex, isOpen, images } = this.state;
        return(
        isOpen && (
            <Lightbox
              mainSrc={images[photoIndex]}
              nextSrc={images[(photoIndex + 1) % images.length]}
              prevSrc={images[(photoIndex + images.length - 1) % images.length]}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length,
                })
              }
            />
          ))
    }
  

    render(){
        return (
            <div className={style.stayComponent}>
                    <LeftColumn />
                <div className={style.stayContent}>
                    <div className={style.name}>{this.state.stay.name} | <Link to={"/stays/edit/id"}>Edytuj</Link> </div>
                    <div className={style.image} style={{backgroundImage: `url(${this.state.stay.mainPhoto})`} }></div>
                    <div className={style.imageGrid}>
                        {this.imageGrid()}
                    </div>
                    <div className={style.address}>Address: {this.state.stay.address.city}, {this.state.stay.address.street}</div>
                    <div className={style.price}>{this.state.stay.price} zł</div>
                    <div className={style.description}>{this.state.stay.description}</div>
                </div>
                {this.lightbox()}
            </div>
        )
    }
}

export default Stay;
// kiedyś obczaić https://reactjsexample.com/a-simple-but-functional-light-box-for-react/