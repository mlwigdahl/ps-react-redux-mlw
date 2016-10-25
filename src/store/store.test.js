import expect from 'expect';
import {createStore} from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';
import * as authorActions from '../actions/authorActions';

describe('Store', function() {
    it('Should handle creating courses', function() {
        const store = createStore(rootReducer, initialState);
        
        const course = {
            title: "Clean Code"
        };

        const action = courseActions.createCourseSuccess(course);
        store.dispatch(action);

        const actual = store.getState().courses[0];
        const expected = {
            title: "Clean Code"
        };

        expect(actual).toEqual(expected);
    });

    it ('Should handle creating authors', function() {
        const store = createStore(rootReducer, initialState);

        const author = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        const action = authorActions.createAuthorSuccess(author);
        store.dispatch(action);

        const actual = store.getState().authors[0];
        const expected = {
            id: 'matt-wigdahl',
            firstName: 'Matt',
            lastName: 'Wigdahl'
        };

        expect(actual).toEqual(expected);
    });
});