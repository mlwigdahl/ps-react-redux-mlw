import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm'; 
import toastr from 'toastr';
import {authorIdFromData} from '../../selectors/selectors.js';
import NotFoundPage from '../common/NotFoundPage';
import {withRouter} from 'react-router';

export class ManageAuthorPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            author: {...props.author},
            errors: {},
            saving: false,
            deleting: false,
            dirty: false
        };

        this.updateAuthorState = this.updateAuthorState.bind(this);
        this.saveAuthor = this.saveAuthor.bind(this);
        this.deleteAuthor = this.deleteAuthor.bind(this);
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(this.props.route, () => {
            if (this.state.dirty == true)
                return 'You have not saved your changes.  Are you sure you want to leave this page?';
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.author == null || nextProps.author == null || 
            (this.props.author.id != nextProps.author.id)) {
            this.setState({author: {...nextProps.author}});
        }
    }

    updateAuthorState(event) {
        const field = event.target.name;
        let author = this.state.author;
        author[field] = event.target.value;
        return this.setState({author: author, dirty: true});
    }

    authorFormIsValid(mode) {
        let formIsValid = true;
        let errors = {};

        if (mode == "save") {
            if (this.state.author.firstName === undefined || this.state.author.firstName.length < 1) {
                errors.firstName = 'First name must be at least 1 character.';
                formIsValid = false;
            } else if (this.state.author.lastName === undefined || this.state.author.length < 1) {
                errors.lastName = 'Last name must be at least 1 character.';
                formIsValid = false;
            } else if ((this.state.author.id === undefined ||
                this.state.author.id == "") && this.props.authors.find( auth => {
                return (auth.id == 
                    authorIdFromData({firstName: this.state.author.firstName, lastName: this.state.author.lastName}));
                })) {
                errors.firstName = "Can't insert a duplicate author.";
                formIsValid = false;
            }
        } else if (mode == "delete") {
            if (this.state.author.id === undefined || this.state.author.id == null || this.state.author.id == '') {
                errors.firstName = "Can't delete an unsaved author.";
                formIsValid = false;
            } else if (this.props.courses.find( crs => (crs.authorId == this.state.author.id))) { 
                errors.firstName = "Can't delete an author that's referenced by a course.";
                formIsValid = false;
            }
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    saveAuthor(event) {
        event.preventDefault();

        if (!this.authorFormIsValid("save")) {
            return;
        } 

        this.setState({saving: true});

        this.props.actions.saveAuthor(this.state.author)
            .then(() => this.redirect("save"))
            .catch(error => {
                toastr.error(error);
                this.setState({saving: false});
            });
    }

    deleteAuthor(event) {
        event.preventDefault();

        if (!this.authorFormIsValid("delete")) {
            return;
        }

        this.setState({deleting: true});

        this.props.actions.deleteAuthor(this.state.author)
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
            toast = "Author saved";
        } else if (mode == "delete") {
            this.setState({deleting: false, dirty: false});
            toast = "Author deleted";
        }
        
        toastr.success(toast);
        this.context.router.push('/authors');
    }

/// more here
    render() {
        if ((this.props.params.id != "" && this.props.params.id !== undefined) &&
            !this.props.authors.find(auth => auth.id == this.props.params.id)) {
            return (<NotFoundPage />);
        }
        return (
            <AuthorForm 
                    allAuthors={this.props.authors}
                    onChange={this.updateAuthorState}
                    onSave={this.saveAuthor}
                    onDelete={this.deleteAuthor}
                    author={this.state.author}
                    errors={this.state.errors}
                    saving={this.state.saving}
                    deleting={this.state.deleting}
            />
        );
    }
}

ManageAuthorPage.propTypes = {
    author: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    route: PropTypes.object,
    router: PropTypes.object
};

ManageAuthorPage.contextTypes = {
    router: PropTypes.object
};

function getAuthorById(authors, id) {
    const author = authors.filter(author => author.id == id);

    if (author.length) return author[0]; // filter returns an array -- grab the first one
    return null;
}

function mapStateToProps(state, ownProps) {
    const authorId = ownProps.params.id; // from the path '/course/:id'

    let author = {id: '', watchHref: '', firstName: '', lastName: ''};

    if (authorId && state.authors.length > 0) {
        author = getAuthorById(state.authors, authorId);
    }

    return {
        author: author,
        authors: [...state.authors],
        courses: [...state.courses]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage));