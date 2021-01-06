import React, { useState, useEffect } from 'react';
import { useChecklist } from 'react-checklist';
import { GetStayPropertiesById, GetAccomodationPropertiesById, GetAllAccomodationProperties, GetAllStayProperties } from '../../repository/stay'

export default function ProperticeForm(props) {

    const [propertice, setPropertice] = useState([])
    const [allPropertice, setAllPropertice] = useState([])

    const { handleCheck, checkedItems } = useChecklist(allPropertice, {
        key: 'name',
        keyType: 'string',
    });

    useEffect(() => {
        if (props.stayId && propertice !== []) {
            GetStayPropertiesById(props.stayId).then((response) => {
                setPropertice(response);
                for(let item of response){
                    checkedItems.add(item.id.toString())
                }
            })
        }
        if (props.accomodationId &&  propertice !== []) {
            GetAccomodationPropertiesById(props.accomodationId).then((response) => {
                setPropertice( response )
                for(let item of response){
                    checkedItems.add(item.id.toString())
                }
            })
        }
        if (props.stay && allPropertice !== []) {
            GetAllStayProperties().then((response) => {
                setAllPropertice(response)
            })
        }
        if (props.accomodation && allPropertice !== []) {
            GetAllAccomodationProperties().then((response) => {
                setAllPropertice( response )
            })
        }
    }, [])

    const onChange = (e) =>{
        props.handleInput([...checkedItems]);
        handleCheck(e)
    }

    return (
        <ul>
            {allPropertice.map((v, i) => (
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
    );
};