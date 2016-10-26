import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
    return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
    return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseSuccess(course) {
    return { type: types.DELETE_COURSE_SUCCESS, course };
}

export function courseChanged() {
    return { type: types.COURSE_CHANGED };
}

export function loadCourses() {
    return (dispatch) => {
        dispatch(beginAjaxCall());
        return CourseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function saveCourse(course) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return CourseApi.saveCourse(course).then(savedCourse => {
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
                dispatch(createCourseSuccess(savedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function deleteCourse(course) {
    return (dispatch, getState) => {
        dispatch(beginAjaxCall());
        return CourseApi.deleteCourse(course).then(deletedCourse => {
            dispatch(deleteCourseSuccess(deletedCourse));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}