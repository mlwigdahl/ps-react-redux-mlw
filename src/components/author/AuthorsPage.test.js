import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import {AuthorsPage} from './AuthorsPage';
import {Provider} from 'react-redux';

function setup(numAuthors, prefix) {
    let props = {authors: []};

    while(numAuthors > 0) {
        props.authors.push({
            id: 'matt-wigdahl' + numAuthors,
            firstName: 'Matt',
            lastName: (prefix == true ? String.fromCharCode(97+numAuthors) + ' ' : '') + 'Wigdahl' + numAuthors
        });

        numAuthors--;
    }

    return mount(<AuthorsPage {...props} />);
}

it('renders with no item count when there are no items', () => {
    const wrapper = setup(0, false);
    expect(wrapper.find('h1').text()).toEqual('Authors');
});

it ('renders with a singular item count when there is an item', () => {
    const wrapper = setup(1, false);
    expect(wrapper.find('h1').text()).toEqual('Authors (1 Entry)');
});

it ('renders with a plural item count when there is more than one an item', () => {
    const wrapper = setup(2, false);
    expect(wrapper.find('h1').text()).toEqual('Authors (2 Entries)');
});

it ('should sort alphabetically by id', () => {
    const wrapper = setup(4, true);
    expect(wrapper.props().authors == wrapper.props().authors.sort((a, b) => {
        return a.id.localeCompare(b.id);
    }));
});