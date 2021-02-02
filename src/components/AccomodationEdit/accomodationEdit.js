import React, { Component } from 'react'
import AccommodationForm from '../AccommodationForm/accommodationForm'
import { GetAccommodationsByStayIdRepository, AddAccommodationRepository, EditAccommodationRepository, DeleteAccommodationRepository } from '../../repository/stay'
import { withTranslation } from "react-i18next";
import style from './accomodationEdit.css'
import { Link } from 'react-router-dom';

class AccommodationEdit extends Component {
    state = {
        accommodations: null
    }


    getAccomodations = () => {
        this.setState({ accommodations: null })
        GetAccommodationsByStayIdRepository(this.props.match.params.id)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    this.props.history.push("/my-account")
                }
            })
            .then(data => {
                if (data.length === 0) {
                    data = [{}]
                }
                if (data[0])
                    this.setState({ accommodations: data })
            })
            .catch(err => console.log(err));
    }

    componentDidMount() {
        this.getAccomodations()
    }

    handleSubmit = async (accommodation) => {
        if (accommodation.id) {
            await EditAccommodationRepository(accommodation)
                .then(() => this.getAccomodations())
                .catch(err => console.log(err))
        }
        else {
            await AddAccommodationRepository(accommodation)
                .then(() => this.getAccomodations())
                .catch(err => console.log(err))
        }
        this.getAccomodations()
    }

    handleDelete = async (accommodationId) => {
        await DeleteAccommodationRepository(accommodationId)
            .then(() => {
                this.getAccomodations()
            })
            .catch(err => console.log(err))
    }

    addForm = () => {
        const newAccommodations = this.state.accommodations;

        newAccommodations.push({})

        this.setState({
            accommodations: newAccommodations,
        });
    }

    render() {
        const { t } = this.props;
        return (
            <div className={style.accommodationEditComponent} id={"accommodationEdit"}>
                <h3>{t('MANAGE_ACCOMMODATIONS')}</h3>
                <p>{t('SAVE_ACCOMMODATIONS_REMAINDER')}</p>
                <div className={style.accommodationsForms}>
                    {Array.isArray(this.state.accommodations) && this.state.accommodations.map((item, i) => (
                        <AccommodationForm accommodation={item} key={i} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} stayId={this.props.match.params.id} />
                    ))}
                    <button onClick={this.addForm} className={style.addAccommodationButton}>{t('ADD_ACCOMMODATION')}</button>
                </div>

                
                <Link to={`/stays/${this.props.match.params.id}`} className={style.goToStayButton}><button >{t('GO_TO_STAY')}</button></Link>
            </div>
        )
    }
}
export default withTranslation()(AccommodationEdit)