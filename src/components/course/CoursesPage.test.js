import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {CoursesPage} from './CoursesPage';
import {Provider} from 'react-redux';

function setup(numCourses, prefix) {
    let props = {courses: []};

    while(numCourses > 0) {
        props.courses.push({
            id: 'test-course-' + numCourses,
            title: (prefix == true ? String.fromCharCode(97+numCourses) + ' ' : '') + 'How To Test Stuff, Vol ' + numCourses
        });

        numCourses--;
    }

    return mount(<CoursesPage {...props} />);
}

it('renders with no item count when there are no items', () => {
    const wrapper = setup(0, false);
    expect(wrapper.find('h1').text()).toEqual('Courses');
});

it ('renders with a singular item count when there is an item', () => {
    const wrapper = setup(1, false);
    expect(wrapper.find('h1').text()).toEqual('Courses (1 Entry)');
});

it ('renders with a plural item count when there is more than one an item', () => {
    const wrapper = setup(2, false);
    expect(wrapper.find('h1').text()).toEqual('Courses (2 Entries)');
});

it ('should sort alphabetically by title', () => {
    const wrapper = setup(4, true);
    expect(wrapper.props().courses == wrapper.props().courses.sort((a, b) => {
        return a.title.localeCompare(b.title);
    }));
});