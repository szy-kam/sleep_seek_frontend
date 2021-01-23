import React, { useState, useEffect } from 'react';
import { useChecklist } from 'react-checklist';
import { GetStayPropertiesById, GetAccommodationPropertiesById, GetAllAccommodationProperties, GetAllStayProperties } from '../../repository/stay'
import style from './propertiesForm.css'

export default function PropertiesForm(props) {

    const [properties, setProperties] = useState([])
    const [allProperties, setAllProperties] = useState([])

    const { handleCheck, checkedItems } = useChecklist(allProperties, {
        key: 'name',
        keyType: 'string',
    });

    useEffect(() => {
        const getProperties = () => {
            if (props.stayId && properties !== []) {
                GetStayPropertiesById(props.stayId).then((response) => {
                    setProperties(response);
                    for (let item of response) {
                        checkedItems.add(item.id.toString())
                    }
                })
            }
            if (props.accomodationId && properties !== []) {
                GetAccommodationPropertiesById(props.accomodationId).then((response) => {
                    setProperties(response)
                    for (let item of response) {
                        checkedItems.add(item.id.toString())
                    }
                })
            }
            if (props.stay && allProperties !== []) {
                GetAllStayProperties().then((response) => {
                    setAllProperties(response)
                })
            }
            if (props.accomodation && allProperties !== []) {
                GetAllAccommodationProperties().then((response) => {
                    setAllProperties(response)
                })
            }
        }
        getProperties()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onChange = (e) => {
        handleCheck(e)
        props.handleInput([...checkedItems]);
    }

    return (
        <div className={style.propertiesFormComponent}>
            <ul>
                {allProperties.map((v, i) => (
                    <li key={i}>
                        <input
                            type="checkbox"
                            data-key={v.id}
                            onChange={onChange}
                            checked={checkedItems.has(v.id)}
                        />
                        <label>{v.name}</label>
                    </li>
                ))}
            </ul>
        </div>

    );
};