import React, { Component } from 'react'
import AccommodationForm from '../AccommodationForm/accommodationForm'
import { GetAccommodationsByStayIdRepository, AddAccommodationRepository, EditAccomodationRepository, DeleteAccommodationRepository } from '../../repository/stay'
import { withTranslation } from "react-i18next";
import style from './accomodationEdit.css'
class AccommodationEdit extends Component {
    state = {
        accommodations: [{}]
    }

    componentDidMount() {
        if (this.props.stayId) {
            GetAccommodationsByStayIdRepository(this.props.stayId)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else return [{}]
                })
                .then(data => {
                    if (data.length === 0) {
                        data = [{}]
                    }
                    this.setState({ accommodations: data })
                })
                .catch(err => console.log(err));
        }
        else
            this.setState({ accommodations: [{}] })
    }

    handleSubmit = (accommodation) => {
        if (accommodation.id) {
            EditAccomodationRepository(accommodation)
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
        }
        else {
            AddAccommodationRepository(accommodation)
        }

    }

    handleDelete = (accommodationId) => {
        DeleteAccommodationRepository(accommodationId)
            .then(response => console.log(response))
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
                <div>{t('MANAGE_ACCOMMODATIONS')}</div>
                <div className={style.accommodationsForms}>{Array.isArray(this.state.accommodations) && this.state.accommodations.map((item, i) => (
                    <AccommodationForm accommodation={item} key={i} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} stayId={this.props.stayId} />
                ))} </div>

                <button onClick={this.addForm}>{t('ADD_ACCOMMODATION')}</button>
            </div>
        )
    }
}
export default withTranslation()(AccommodationEdit)