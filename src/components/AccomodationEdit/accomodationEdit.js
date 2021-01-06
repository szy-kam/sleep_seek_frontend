import React, { Component } from 'react'
import AccomodationForm from '../widgets/AccomodationForm/accomodationForm'
import { GetAccomodationByStayId } from '../../repository/stay'
import { withTranslation } from "react-i18next";

class AccomodationEdit extends Component {
    state = {
        accomodations: []
    }

    componentDidMount() {
        if (this.props.stayId) {
            GetAccomodationByStayId(this.props.stayId).then((response) => {
                this.setState({ accomodations: response })
            })
        }
        else
            this.setState({ accomodations: [{}] })
    }

    addForm = () => {
        const newAccomodation = this.state.accomodations;

        newAccomodation.push({})

        this.setState({
            accomodation: newAccomodation,
        });
    }
    
    render() {
        const { t } = this.props;
        return (
            <div>
                {this.state.accomodations.map((item, i) => (
                    <AccomodationForm accomodation={item} key={i} />
                ))}
                <button onClick={this.addForm}>{t('ADD_ACCOMODATION')}</button>
            </div>
        )
    }
}
export default withTranslation()(AccomodationEdit)