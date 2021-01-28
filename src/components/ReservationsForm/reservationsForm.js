import React, { useState } from 'react'
import style from './reservationsForm.css'
import { useTranslation } from "react-i18next";
import ReservationFormEditable from './reservationFormEditable';
import { Link } from 'react-router-dom';

const Reservations = (props) => {

    const { t } = useTranslation()

    // const renderButtons = () => {
    //     if (props.handleSubmit) {
    //         return (
    //             <div className={stay.reservationButtons}>
    //                 <button onClick={props.handleSubmit}>{t('SAVE')}</button>
    //                 <button onClick={props.handleDelete}>{t('DELETE')}</button>
    //             </div>
    //         )
    //     }
    // }

    // const renderReservations = () => {
    //     if (Array.isArray(props.reservations)) {
    //         return props.reservations.map((item, i) => (
    //             <div className={style.reservation} key={i}>
    //                 <form className={style.reservationForm}>
    //                     <label>{t('STAY_ID')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.stayId}></input>
    //                     <label>{t('ACCOMMODATION_ID')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.accommodationId}></input>
    //                     <label>{t('FROM')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.dateFrom}></input>
    //                     <label>{t('TO')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.dateTo}></input>
    //                     <label>{t('FULL_NAME')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.customer.fullName}></input>
    //                     <label>{t('PHONE_NUMBER')}:</label>
    //                     <input type="text" disabled={props.handleSubmit ? true : "disabled"} value={item.customer.phoneNumber}></input>
    //                     {renderButtons()}
    //                 </form>
    //             </div>
    //         ))
    //     }
    // }

    const renderTable = () => {
        if (Array.isArray(props.reservations)) {
            return <table className={style.reservationsTable}>
                <thead>
                    <tr>
                        <td>{t('CREATED')}</td>
                        <td>{t('STAY_ID')}</td>
                        <td>{t('ACCOMMODATION_ID')}</td>
                        <td>{t('FROM')}</td>
                        <td>{t('TO')}</td>
                        <td>{t('FULL_NAME')}</td>
                        <td>{t('PHONE_NUMBER')}</td>
                        <td>{t('CONFIRMED')}</td>
                        <td>{t('COMPLETED')}</td>
                        {props.handleSubmit ? <td>{t('SAVE')}</td> : null}
                        {props.handleDelete ? <td>{t('DELETE')}</td> : null}
                    </tr>
                </thead>
                <tbody>
                    {renderReservations()}
                </tbody>
            </table>
        }
        else return null
    }

    const renderReservations = () => {
        if (props.handleSubmit) {
            return props.reservations.map((item, i) => (
                <ReservationFormEditable reservation={item} key={i} handleSubmit={props.handleSubmit} handleDelete={props.handleDelete} />
            ))
        }
        else {
            return props.reservations.map((item, i) => (
                <tr className={style.reservation} key={i}>
                    <td>{item.createdAt}</td>
                    <td><Link to={`/stays/${item.stayId}`}>{item.stayId}</Link></td>
                    <td>{item.accommodationId}</td>
                    <td>{item.dateFrom}</td>
                    <td>{item.dateTo}</td>
                    <td>{item.customer.fullName}</td>
                    <td>{item.customer.phoneNumber}</td>
                    <td><input type="checkbox" disabled value={item.confirmed}></input></td>
                    <td><input type="checkbox" disabled value={item.completed}></input></td>
                </tr>
            ))
        }
    }

    return (
        <div className={style.reservationsComponent}>
            {renderTable()}
        </div>
    )

}
export default Reservations