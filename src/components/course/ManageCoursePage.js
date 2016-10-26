import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm'; 
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';
import NotFoundPage from '../common/NotFoundPage';
import {withRouter} from 'react-router';

export class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: {...props.course},
            errors: {},
            saving: false,
            deleting: false,
            dirty: false
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

/// improve appearance on this (and the author analogue)
    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty == true)
                return 'You have not saved your changes.  Are you sure you want to leave this page?';
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.course == null || nextProps.course == null || 
            (this.props.course.id != nextProps.course.id)) {
            this.setState({course: {...nextProps.course}});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course, dirty: true});
    }

    lengthIsValid(length) {
        if (/^[0-9]?[0-9]:[0-5]?[0-9]$/.test(length)) {
            return true;
        }
        return false;
    }

    courseFormIsValid(mode) {
        let formIsValid = true;
        let errors = {};

        if (mode == "save") {
            if (this.state.course.title.length < 5) {
                errors.title = 'Title must be at least 5 characters.';
                formIsValid = false;
            } else if (this.state.course.category.length < 5) {
                errors.category = 'Category must be at least 5 characters.';
                formIsValid = false;
            } else if (!this.lengthIsValid(this.state.course.length)) {
                errors.length = 'Length must be in the form hh:mm.';
                formIsValid = false;
            }
        } else if (mode == "delete") {
            if (this.state.course.id == null || this.state.course.id == '') {
                errors.title = "Can't delete an empty course.";
                formIsValid = false;
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid("save")) {
            return;
        } 

        this.setState({saving: true});

        this.props.actions.saveCourse(this.state.course)
            .then(() => this.redirect("save"))
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteCourse(event) {
        event.preventDefault();

        if (!this.courseFormIsValid("delete")) {
            return;
        }

        this.setState({deleting: true});

        this.props.actions.deleteCourse(this.state.course)
            .then(() => this.redirect("delete"))
            .catch(error => {
                toastr.error(error);
                this.setState({deleting: false});
            });
    }

    redirect(mode) {
        let toast = "<<uninitialized>>";

        if (mode == "save") {
            this.setState({saving: false, dirty: false});
            toast = "Course saved";
        } else if (mode == "delete") {
            this.setState({deleting: false, dirty: false});
            toast = "Course deleted";
        }
        
        toastr.success(toast);
        this.context.router.push('/courses');
    }

    render() {
        if ((this.props.params.id != "" && this.props.params.id !== undefined) &&
            !this.props.courses.find(crs => crs.id == this.props.params.id)) {
            return (<NotFoundPage />);
        }
        else {
            return (
                <CourseForm 
                    allAuthors={this.props.authors}
                    onChange={this.updateCourseState}
                    onSave={this.saveCourse}
                    onDelete={this.deleteCourse}
                    course={this.state.course}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    deleting={this.state.deleting}
                />
            );
        }
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    courses: PropTypes.array.isRequired,
    params: PropTypes.object,
    route: PropTypes.object,
    router: PropTypes.object
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object
};

function getCourseById(courses, id) {
    const course = courses.filter(course => course.id == id);

    if (course.length) return course[0]; // filter returns an array -- grab the first one
    return null;
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id; // from the path '/course/:id'

    let course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId && state.courses.length > 0) {
        course = getCourseById(state.courses, courseId);
    }

    return {
        course: course,
        authors: authorsFormattedForDropdown(state.authors),
        courses: [...state.courses]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage));