import React, { useState} from 'react'
import { myCustomLocale } from '../../pages/Reservation/reservation'
import DataPicker, { utils } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { useTranslation } from "react-i18next";
import style from './datePicker.css'
import { connect } from "react-redux";
import { dateRangeChange } from "../../../redux/stay/stayActions";

const DatePicker = (props) => {

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: props.dateRange.from,
        to: props.dateRange.to
    });



    const { t } = useTranslation()

    const selectedDate = (date) => {
        setSelectedDayRange(date)

        if (date.to || (!date.to && !date.from)) {
            props.handleDateSelect(date)
            props.dateRangeChange(date)
        }
    }

    return (
        <div className={style.datePickerComponent} id="datePickerComponent">
            <DataPicker
                value={selectedDayRange}
                onChange={selectedDate}
                shouldHighlightWeekends
                minimumDate={utils().getToday()}
                locale={myCustomLocale}
                inputPlaceholder={t('CLICK_HERE')}
                colorPrimary="#278abb"
                colorPrimaryLight="rgb(23 151 211 / 42%)"
                calendarPopperPosition="bottom"
                renderFooter={() => (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button
                            type="button"
                            onClick={() => {
                                selectedDate({
                                    from: null,
                                    to: null
                                })
                            }}
                            style={{
                                padding: '10px 28px',
                            }}
                        >
                            {t('RESET_VALUE')}
                        </button>
                    </div>
                )}
            />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    dateRangeChange: (dateRange) => dispatch(dateRangeChange(dateRange)),
})

const mapStateToProps = state => ({
    dateRange: state.stay.dateRange
})

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)

export const dateFormatterToIso = (date) => {
    const fixDate = (date) => {
        if (date < 10) {
            return "0" + date
        }
        else return date
    }
    if (date)
        return `${date.year}-${fixDate(date.month)}-${fixDate(date.day)}`
    else
        return ""
}