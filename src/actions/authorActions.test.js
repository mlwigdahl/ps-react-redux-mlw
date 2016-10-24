import expect from 'expect';
import * as authorActions from './authorActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('Author Actions', () => {
    describe('createAuthorSuccess', () => {
        it('should create a CREATE_AUTHOR_SUCCESS action', () => {
            //arrange
            const author = {id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'};
            const expectedAction = {
                type: types.CREATE_AUTHOR_SUCCESS,
                author: author
            };

            const action = authorActions.createAuthorSuccess(author);

            expect(action).toEqual(expectedAction);
        });
    });

    describe('deleteAuthorSuccess', () => {
        it('should create DELETE_AUTHOR_SUCCESS action', () => {
            //arrange
            const author = {id: 'cory-house', firstName: 'Cory', lastName: 'House'};
            const expectedAction = {
                type: types.DELETE_AUTHOR_SUCCESS,
                author: author
            };

            const action = authorActions.deleteAuthorSuccess(author);

            expect(action).toEqual(expectedAction);
        });
    });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create BEGIN_AJAX_CALL and LOAD_AUTHORS_SUCCESS when loading authors', (done) => {
        // Here's an example call to nock.
        // nock('http://example.com/')
        //   .get('/courses')
        //   .reply(200, {body: {course [{id: 1, firstName: 'Cory', lastName: 'House'}] }});

        const expectedActions = [
            {type: types.BEGIN_AJAX_CALL},
            {type: types.LOAD_AUTHORS_SUCCESS, body: {authors: [{id: 'matt-wigdahl', firstName: 'Matt', lastName: 'Wigdahl'}]}}
        ];

        const store = mockStore({courses: []}, expectedActions);
        store.dispatch(authorActions.loadAuthors()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_AUTHORS_SUCCESS);
            done();
        });
    });
});