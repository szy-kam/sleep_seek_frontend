import React, { useEffect, useState } from 'react'
import style from './reservation.css'
import { withTranslation } from "react-i18next";
import { STAY } from '../../../config'
import { GetStayByIdRepository, GetAccommodationByIdRepository, MakeReservationRepository } from '../../../repository/stay'
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
import Properties from '../../Properties/properties';

const Reservation = (props) => {

    const accommodationInit = {
        id: null,
        stayId: null,
        sleepersCapacity: null,
        quantity: null,
        price: null
    }

    const inputsInit = {
        fullName: "",
        phoneNumber: "",
    }

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });
    const [stay, setStay] = useState(STAY);
    const [accommodation, setAccommodation] = useState(accommodationInit);
    const [inputs, setInputs] = useState(inputsInit);
    const [message, setMessage] = useState("");


    useEffect(() => {
        GetStayByIdRepository(props.match.params.stayId)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            setStay(data)
                        })
                }
                else {
                    console.log(response);
                    props.history.push("/404");
                }
            });

        GetAccommodationByIdRepository(props.match.params.accommodationId)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then(data => {
                            setAccommodation(data)
                        })
                }
                else {
                    console.log(response);
                    props.history.push("/404");
                }
            })

    }, [props.history, props.match.params.accommodationId, props.match.params.stayId]);

    const renderStay = () => {
        return (
            <div className={style.stay}>
                <div className={style.numberInCircleContainer}>
                    <div className={style.numberInCircle}>
                        1
                    </div>
                </div>
                <h3>{t('CHECK_RESERVATION_DATA')}</h3>
                <div className={style.name}>{stay.name}</div>
                <div className={style.photo}><img src={stay.mainPhoto} alt={stay.name} /></div>
                <div className={style.address}><b>{t('ADDRESS')}</b>: {stay.address.street}, {stay.address.city}</div>
                <div className={style.phone}><b>{t('PHONE_NUMBER')}</b>: {stay.phoneNumber}</div>
                <div className={style.email}><b>{t('EMAIL')}</b>: {stay.email}</div>
                <div className={style.capacity}><b>{t('SLEEPERS_CAPACITY')}</b>: {accommodation.sleepersCapacity}</div>
                <div className={style.price}><b>{t('PRICE')}</b>: {accommodation.price} {t('CURRENCY_SYMBOL')}</div>
                <div className={style.properties}><b>{t('PROPERTIES')}</b>:
                    <Properties properties={stay.properties} />
                    <Properties properties={accommodation.properties} />
                </div>
            </div>
        )
    }

    const renderDatePick = () => {
        return (
            <div className={style.dateInputs}>
                <div className={style.numberInCircleContainer}>
                    <div className={style.numberInCircle}>
                        2
                    </div>
                </div>
                <h3>{t('CHOOSE_DATE')}</h3>
                <Calendar
                    value={selectedDayRange}
                    onChange={setSelectedDayRange}
                    shouldHighlightWeekends
                    minimumDate={utils().getToday()}
                    locale={myCustomLocale}
                    colorPrimary="#278abb"
                    colorPrimaryLight="rgb(23 151 211 / 42%)"
                />
                <div className={style.dataInfo}>
                    {selectedDayRange.from ? <div>{t('FROM')} <b>{selectedDayRange.from.day}.{selectedDayRange.from.month}.{selectedDayRange.from.year}</b></div> : null}
                    {selectedDayRange.to ? <div>{t('TO')}<b> {selectedDayRange.to.day}.{selectedDayRange.to.month}.{selectedDayRange.to.year}</b></div> : null}
                    {selectedDayRange.from && selectedDayRange.to ? <div>{t('DAY_AMOUNT')}: <b>{calculateDateDifference()}</b></div> : null}
                    {selectedDayRange.from && selectedDayRange.to ? <div>{t('WHOLE_PRICE')}: <b>{calculatePrice()} {t('CURRENCY_SYMBOL')}</b></div> : null}
                </div>
            </div>
        )
    }

    const handleInput = (event, field) => {
        const newInputs = {
            ...inputs,
        };
        newInputs[field] = event.target.value;

        setInputs(newInputs);
    };

    const getUserInfo = () => {
        return (
            <div className={style.userInfo}>
                <div className={style.numberInCircleContainer}>
                    <div className={style.numberInCircle}>
                        3
                    </div>
                </div>

                <h3>{t('FILL_RESERVATION_FORM')}</h3>
                <form className={style.userForm}>
                    <input
                        type="text"
                        placeholder={t("FULL_NAME")}
                        value={inputs.firstName}
                        onChange={(event) => handleInput(event, "fullName")}
                        required
                    />
                    <input
                        type="text"
                        placeholder={t("PHONE_NUMBER")}
                        value={inputs.phoneNumber}
                        onChange={(event) => handleInput(event, "phoneNumber")}
                        required
                    />
                </form>
                <button className={style.makeReservation} onClick={submitHandler}>{t('MAKE_RESERVATION')}</button>
                <div className={style.message}>{t(message)}</div>
            </div>
        )
    }

    const calculateDateDifference = () => {
        if (selectedDayRange.from && selectedDayRange.to) {
            const from = myCustomLocale.toNativeDate(selectedDayRange.from)
            const to = myCustomLocale.toNativeDate(selectedDayRange.to)
            const diffInMs = to - from
            return diffInMs / (86400000);
        }
    }

    const calculatePrice = () => {
        if (selectedDayRange.from && selectedDayRange.to) {
            const dateDiff = calculateDateDifference()
            return dateDiff * accommodation.price
        }
    }

    const submitHandler = () => {

        const dateFormatter = (date) => {

            const fixDate = (date) => {
                if (date < 10) {
                    return "0" + date
                }
                else return date
            }

            return `${date.year}-${fixDate(date.month)}-${fixDate(date.day)}`
        }

        let reservation = {}

        if (!inputs.fullName || !inputs.phoneNumber || !selectedDayRange.from || !selectedDayRange.to) {
            setMessage("FILL_ALL_FIELDS")
        }
        else {
            setMessage("")
            reservation.accommodationId = props.match.params.accommodationId
            reservation.customer = { fullName: inputs.fullName, phoneNumber: inputs.phoneNumber }
            reservation.dateFrom = dateFormatter(selectedDayRange.from)
            reservation.dateTo = dateFormatter(selectedDayRange.to)
            console.log(reservation);
            MakeReservationRepository(reservation)
                .then(response => {
                    if (response.ok) {
                        redirectUser();
                    }
                    else {
                        console.log(response)
                        setMessage("ERROR_RESERVATION")
                    }
                })
                .catch(err => {
                    setMessage("ERROR_RESERVATION");
                    console.log(err);
                })
        }
    }

    const redirectUser = () => {
        setTimeout(() => {
            props.history.push("/my-account");
        }, 1000);
    };

    const { t } = props;
    return (
        <div className={style.reservationComponent}>
            <div className={style.reservationContent}>
                {renderStay()}
                {renderDatePick()}
                {getUserInfo()}
            </div>
        </div>
    )
}
export default withTranslation()(Reservation)

export const myCustomLocale = {
    // months list by order
    months: [
        'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ],

    // week days by order
    weekDays: [
        {
            short: 'P',
        },
        {
            short: 'W',
        },
        {
            short: 'Ś',
        },
        {
            short: 'C',
        },
        {
            short: 'P',
        },
        {
            short: 'S',
            isWeekend: true,
        },
        {
            short: 'S',
            isWeekend: true,
        }
    ],

    // just play around with this number between 0 and 6
    weekStartingIndex: 1,

    from: 'od',
    to: 'do',
    // return a { year: number, month: number, day: number } object
    getToday(gregorainTodayObject) {
        return gregorainTodayObject;
    },

    // return a native JavaScript date here
    toNativeDate(date) {
        return new Date(date.year, date.month - 1, date.day);
    },

    // return a number for date's month length
    getMonthLength(date) {
        return new Date(date.year, date.month, 0).getDate();
    },

    // return a transformed digit to your locale
    transformDigit(digit) {
        return digit;
    },

    digitSeparator: ',',
}