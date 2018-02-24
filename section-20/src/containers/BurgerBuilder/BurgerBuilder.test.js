import React from 'react'
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients = { () => {} } price = { 4 } />);
    })

    it('should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({ ingredients: { salad: { amount: 0, price: 0.7 }}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
})