import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';

export class AuthorsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    }

    redirectToAddAuthorPage() {
        browserHistory.push('/author');
    }

    render() {
        const {authors} = this.props;

        const numEntries = (authors.length == 0) ? "" : (" (" + authors.length + (authors.length > 1 ? " Entries)" : " Entry)"));

        return (
            <div>
                <h1>Authors{numEntries}</h1>
                <input type="submit"
                    value="Add Author"
                    className="btn btn-primary"
                    onClick={this.redirectToAddAuthorPage}/>
                <AuthorList authors={authors}/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const mapped = {
        authors: [...state.authors].sort( (a, b) => {
            return a.id.localeCompare(b.id);
        })
    };
    
    return mapped;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(authorActions, dispatch)
    };
}

AuthorsPage.propTypes = {
    actions: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);