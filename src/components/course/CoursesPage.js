import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import {browserHistory} from 'react-router';

export class CoursesPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    }

    redirectToAddCoursePage() {
        browserHistory.push('/course');
    }

    render() {
        const {courses} = this.props;

        const numEntries = (courses.length == 0) ? "" : (" (" + courses.length + (courses.length > 1 ? " Entries)" : " Entry)"));

        return (
            <div>
                <h1>Courses{numEntries}</h1>
                <input type="submit"
                    value="Add Course"
                    className="btn btn-primary"
                    onClick={this.redirectToAddCoursePage}/>
                <CourseList courses={courses}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const mapped = {
        courses: [...state.courses].sort( (a, b) => {
            return a.title.localeCompare(b.title);
        })
    };
    
    return mapped;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

CoursesPage.propTypes = {
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);