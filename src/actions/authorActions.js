import AuthorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
    return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function updateAuthorSuccess(author) {
    return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function createAuthorSuccess(author) {
    return { type: types.CREATE_AUTHOR_SUCCESS, author };
}

export function deleteAuthorSuccess(author) {
    return { type: types.DELETE_AUTHOR_SUCCESS, author };
}

export function authorChanged() {
    return { type: types.AUTHOR_CHANGED }
}

export function loadAuthors() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return AuthorApi.getAllAuthors().then(authors => {
            dispatch(loadAuthorsSuccess(authors));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveAuthor(author) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return AuthorApi.saveAuthor(author).then(savedAuthor => {
            author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
                dispatch(createAuthorSuccess(savedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteAuthor(author) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return AuthorApi.deleteAuthor(author).then(deletedAuthor => {
            dispatch(deleteAuthorSuccess(deletedAuthor));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}