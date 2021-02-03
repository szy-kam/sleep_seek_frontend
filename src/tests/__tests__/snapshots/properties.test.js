import React from 'react'
import Properties from '../../../components/Properties/properties'
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';

const properties1 = ["ala", "ma", "kota"]

it('Snapshot test', () => {
    const component = render(<Properties properties={properties1} />);
    expect(component).toMatchSnapshot();
});

it('Snapshot test', () => {
    const component = shallow(<Properties  />);
    expect(component.length).toEqual(1)
});



