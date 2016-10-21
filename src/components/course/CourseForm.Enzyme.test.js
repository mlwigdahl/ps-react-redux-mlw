import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving, deleting) {
    const props = {
        course: {},
        saving: saving,
        deleting: deleting,
        errors: {},
        onSave: () => {},
        onDelete: () => {},
        onChange: () => {}
    };

    return shallow(<CourseForm {...props} />);
}

it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('ManageCourse');
});

it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('[type="submit"]').first().props().value).toBe('Save');
});

it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true, false);
    expect(wrapper.find('[type="submit"]').first().props().value).toBe('Saving...');
});

it('delete button is labeled "Delete" when not deleting', () => {
    const wrapper = setup(false, false);
    expect(wrapper.find('[type="submit"]').last().props().value).toBe('Delete');
});

it('delete button is labeled "Delete..." when deleting', () => {
    const wrapper = setup(false, true);
    expect(wrapper.find('[type="submit"]').last().props().value).toBe('Deleting...');
});