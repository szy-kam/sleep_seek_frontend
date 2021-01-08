import React, { useState, useEffect } from 'react';
import { useChecklist } from 'react-checklist';
import { GetStayPropertiesById, GetAccomodationPropertiesById, GetAllAccomodationProperties, GetAllStayProperties } from '../../repository/stay'
import style from './propertiesForm.css'

export default function PropertiesForm(props) {

    const [properties, setProperties] = useState([])
    const [allProperties, setAllProperties] = useState([])

    const { handleCheck, checkedItems } = useChecklist(allProperties, {
        key: 'name',
        keyType: 'string',
    });

    useEffect(() => {
        if (props.stayId && properties !== []) {
            GetStayPropertiesById(props.stayId).then((response) => {
                setProperties(response);
                for (let item of response) {
                    checkedItems.add(item.id.toString())
                }
            })
        }
        if (props.accomodationId && properties !== []) {
            GetAccomodationPropertiesById(props.accomodationId).then((response) => {
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
            GetAllAccomodationProperties().then((response) => {
                setAllProperties(response)
            })
        }
    }, [])

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