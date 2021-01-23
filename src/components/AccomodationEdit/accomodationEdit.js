import React, { Component } from 'react'
import AccommodationForm from '../widgets/AccommodationForm/accommodationForm'
import { GetAccommodationsByStayIdRepository, AddAccommodationRepository, DeleteAccommodationRepository } from '../../repository/stay'
import { withTranslation } from "react-i18next";

class AccommodationEdit extends Component {
    state = {
        accommodations: []
    }

    componentDidMount() {
        if (this.props.stayId) {
            GetAccommodationsByStayIdRepository(this.props.stayId)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    else return []
                })
                .then(data => {
                    this.setState({ accommodations: data })
                })
                .catch(err => console.log(err))
        }
        else
            this.setState({ accommodations: [{}] })
    }

    handleSubmit = (accommodation) => {
        console.log(accommodation);
        AddAccommodationRepository(accommodation)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch( err => console.log(err))
    }

    handleDelete = (accommodation) => {
        DeleteAccommodationRepository(accommodation)
            .then(response => console.log(response))
    }

    addForm = () => {
        const newAccommodation = this.state.accommodations;

        newAccommodation.push({})

        this.setState({
            accommodation: newAccommodation,
        });
    }

    render() {
        const { t } = this.props;
        console.log(this.state.accommodations);
        return (
            <div>
                {this.state.accommodations !== [] && this.state.accommodations.map((item, i) => (
                    <AccommodationForm accommodation={item} key={i} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} stayId={this.props.stayId} />
                ))}
                <button onClick={this.addForm}>{t('ADD_ACCOMMODATION')}</button>
            </div>
        )
    }
}
export default withTranslation()(AccommodationEdit)