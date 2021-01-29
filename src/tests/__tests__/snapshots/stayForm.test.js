import React from 'react'
import StayForm from '../../../components/StayForm/stayForm'
import { render } from 'enzyme';
import { stayMock1 } from '../../mocks'
import { BrowserRouter as Router } from 'react-router-dom';

it("Snapshot test. With stay", () => {
    const component = render(<Router><StayForm stay={stayMock1} /></Router>)
    expect(component).toMatchSnapshot()
})

