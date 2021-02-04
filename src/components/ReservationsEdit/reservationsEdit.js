import React, { Component } from 'react'
import ReservationsForm from "../ReservationsForm/reservationsForm"
import { GetReservationsByStayIdRepository, EditReservationRepository, DeleteReservationRepository, GetReservationsByUsernameRepository } from '../../repository/stay'
import { withTranslation } from "react-i18next";
import style from './reservationsEdit.css'
import { Link } from 'react-router-dom';

class ReservationsEdit extends Component {
    state = {
        reservations: []
    }

    getReservationsByStayId = () => {
        GetReservationsByStayIdRepository(this.props.match.params.stayId)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    this.props.redirectUser("/my-account")
                }
            })
            .then(data => {
                this.setState({ reservations: data })
            })
            .catch(err => console.log(err));
    }

    getReservationsByUsername = () => {
        GetReservationsByUsernameRepository(this.props.username)
            .then(response => response.json())
            .then(reservations => {
                this.setState({ reservations: reservations })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        if (this.props.username) {
            this.getReservationsByUsername()
        }
        else {
            this.getReservationsByStayId()
        }
    }

    handleSubmit = async (reservation) => {
        await EditReservationRepository(reservation)
            .then((response) => {
                if (response.ok) {
                    this.getReservationsByStayId()
                }
                else {
                    console.log(response);
                    return response.json()
                }
            })
            .catch(err => console.log(err))
    }

    handleDelete = async (reservation) => {
        await DeleteReservationRepository(reservation)
            .then(response => {
                if (response.ok) {
                    this.getReservationsByStayId()
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => console.log(err))
    }

    renderTable = () => {
        const { t } = this.props;
        if (this.state.reservations.length) {
            return <table className={style.reservationsTable}>
                <thead>
                    <tr>
                        <td>{t('CREATED')}</td>
                        <td>{t('STAY_NAME')}</td>
                        <td>{t('ACCOMMODATION_ID')}</td>
                        <td>{t('FROM')}</td>
                        <td>{t('TO')}</td>
                        <td>{t('STATUS')}</td>
                        <td>{t('FULL_NAME')}</td>
                        <td>{t('PHONE_NUMBER')}</td>
                        <td>{t('SAVE')}</td>
                        {/* <td>{t('DELETE')}</td> */}
                    </tr>
                </thead>
                <tbody>
                    {this.state.reservations.map((item, i) => {
                        return this.renderLine(item, i)
                    })
                    }
                </tbody>
            </table>
        }
        else return t("NO_RESERVATIONS")
    }


    renderLine = (reservation, i) => {
        return <ReservationsForm key={i} reservation={reservation} handleSubmit={this.handleSubmit} handleDelete={this.handleDelete} username={this.props.username} />
    }


    render() {
        const { t } = this.props;
        return (
            <div className={style.reservationsEditComponent}>
                <h3>{t('MANAGE_RESERVATIONS')}</h3>
                <p>{t('SAVE_RESERVATIONS_REMAINDER')}</p>
                <div className={style.reservationsForms}>
                    {this.renderTable()}
                </div>

                {/* <Link to={`/stays/${this.props.match.params.stayId}`} className={style.goToStayButton}><button >{t('GO_TO_STAY')}</button></Link> */}
                {!this.props.username ? <Link to={`/my-account`} className={style.goToStayButton}><button >{t('MY_ACCOUNT')}</button></Link> : null}
            </div>
        )
    }
}
export default withTranslation()(ReservationsEdit)