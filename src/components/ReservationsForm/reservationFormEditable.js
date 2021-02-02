import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import style from './reservationsForm.css'

const ReservationFormEditable = (props) => {

    const [reservation, setReservation] = useState(props.reservation)

    const { t } = useTranslation()

    const handleInput = (event, field) => {
        const newInputs = {
            ...reservation
        };

        if (["fullName", "phoneNumber"].indexOf(field) >= 0)
            newInputs.customer[field] = event.target.value;

        else newInputs[field] = event.target.value;

        setReservation(newInputs);
    };

    const statusOptions = () => {
        const options = ["PENDING", "ACCEPTED", "CANCELED"]
        //temporarily
        return options.map((item, i) => {
            return <option key={i} value={item}>{t(item)}</option>;
        });
    }

    const handleSubmit = () => {
        props.handleSubmit(reservation)
    }

    const handleDelete = () => {
        props.handleDelete(reservation)
    }

    return (
        <tr className={style.reservation}>
            <td>{reservation.createdAt}</td>
            <td><Link to={`/stays/${reservation.stayId}`}>{reservation.stayName}</Link></td>
            <td>{reservation.accommodationId}</td>
            <td><input type="date" value={reservation.dateFrom} onChange={(event) => handleInput(event, "dateFrom")} ></input></td>
            <td><input type="date" value={reservation.dateTo} onChange={(event) => handleInput(event, "dateTo")}></input></td>
            <td><input type="text" value={reservation.customer.fullName} onChange={(event) => handleInput(event, "fullName")}></input></td>
            <td><input type="text" value={reservation.customer.phoneNumber} onChange={(event) => handleInput(event, "phoneNumber")}></input></td>
            <td><select onChange={(event) => handleInput(event, "status")} value={reservation.status} > {statusOptions()} </select></td>
            { props.handleSubmit ? <td><button onClick={handleSubmit}>{t('SAVE')}</button></td> : null}
            { props.handleDelete ? <td><button onClick={handleDelete}>{t('DELETE')}</button></td> : null}
        </tr >
    )
}

export default ReservationFormEditable