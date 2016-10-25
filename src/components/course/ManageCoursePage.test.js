import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

function setupSaveProps(type) {
    if (type == "title") {
        return {
            authors: [],
            courses: [{id: 'abc', watchHref: '', title: 'ABC', authorId: 'cory-house', length: '2:30', category: 'Javascript'}],
            actions: {saveCourse: () => { return Promise.resolve(); }},
            course: {id: 'abc', watchHref: '', title: 'ABC', authorId: 'cory-house', length: '2:30', category: 'Javascript'},
            params: {id: 'abc'}
        };
    } else if (type == "category") {
        return {
            authors: [],
            courses: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'cory-house', length: '2:30', category: 'JS'}],
            actions: {saveCourse: () => { return Promise.resolve(); }},
            course: {id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'cory-house', length: '2:30', category: 'JS'},
            params: {id: 'abcde'}
        };
    } else if (type == "length") {
        return {
            authors: [],
            courses: [{id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'cory-house', length: '2:70', category: 'Javascript'}],
            actions: {saveCourse: () => { return Promise.resolve(); }},
            course: {id: 'abcde', watchHref: '', title: 'ABCDE', authorId: 'cory-house', length: '2:70', category: 'Javascript'},
            params: {id: 'abcde'}
        };
    } else if (type == "empty") {
        return {
            authors: [],
            courses: [],
            actions: {deleteCourse: () => { return Promise.resolve(); }},
            course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''},
            params: {id: ''}
        };
    }
}

describe('Manage Course Page', () => {
    it('sets error message when trying to save empty title', () => {
        const props = setupSaveProps("title");

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });

    it('sets error message when trying to enter a short category', () => {
        const props = setupSaveProps("category");

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe(undefined);
        expect(wrapper.state().errors.category).toBe('Category must be at least 5 characters.');
    });

    it('sets error message when trying to enter a bad length', () => {
        const props = setupSaveProps("length");

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe(undefined);
        expect(wrapper.state().errors.category).toBe(undefined);
        expect(wrapper.state().errors.length).toBe("Length must be in the form hh:mm.");
    });

    it('rubs the lotion on its skin', () => {
        return true;
    });

    it('does this whenever its told', () => {
        return true;
    });

    it('sets error message when trying to delete empty id', () => {
        const props = setupSaveProps("empty");

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.title).toBe("Can't delete an empty course.");
    });
});