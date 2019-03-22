import React from 'react';
import { shallow, mount, render } from 'enzyme';
import StringSort from './StringSort'
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore();
let store,wrapper;
describe('StringSort Component', () => {
    beforeEach(() => {
        const initialState = {
            sortedArray: []
        };
        store = mockStore(initialState);
        // Shallow render the container passing in the mock store
        wrapper = shallow(
            <StringSort store={store} />
        );
    });

    it('should render without throwing an error', () => {
   
        expect(wrapper.props().sortedArray.length).toBe(1);
   })
  
   
})