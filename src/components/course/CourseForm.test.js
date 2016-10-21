import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from './CourseForm';

function setup(saving, deleting) {
    let props = {
        course: {}, 
        saving: saving, 
        deleting: deleting,
        errors: {}, 
        onSave: () => {},
        onDelete: () => {},
        onChange: () => {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('CourseForm via React Test Utils', () => {
    it('renders form and h1', ()=> {
        const { output } = setup();
        expect(output.type).toBe('form');
        let [ h1 ] = output.props.children;
        expect(h1.type).toBe('h1');
    });

    it('save button is labeled "Save" when not saving', () => {
        const {output} = setup(false, false);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Save');
    });

    it('save button is labeled "Saving..." when saving', () => {
        const {output} = setup(true, false);
        const submitButton = output.props.children[5];
        expect(submitButton.props.value).toBe('Saving...');
    });    

    it('delete button is labeled "Delete" when not deleting', () => {
        const {output} = setup(false, false);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe('Delete');
    });

    it('delete button is labeled "Delete..." when deleting', () => {
        const {output} = setup(false, true);
        const submitButton = output.props.children[6];
        expect(submitButton.props.value).toBe('Deleting...');
    });    
});