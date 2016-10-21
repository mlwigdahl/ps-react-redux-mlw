import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ManageCoursePage} from './ManageCoursePage';

describe('Manage Course Page', () => {
    it('sets error message when trying to save empty title', () => {
        const props = {
            authors: [],
            actions: {saveCourse: () => { return Promise.resolve(); }},
            course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
        };

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const saveButton = wrapper.find('[type="submit"]').first();
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });

    it('sets error message when trying to delete empty id', () => {
        const props = {
            authors: [],
            actions: {deleteCourse: () => { return Promise.resolve(); }},
            course: {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
        };

        const wrapper = mount(<ManageCoursePage {...props}/>);
        const deleteButton = wrapper.find('[type="submit"]').last();
        deleteButton.simulate('click');
        expect(wrapper.state().errors.title).toBe("Can't delete an empty course.");
    });
});