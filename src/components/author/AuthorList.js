import React, {PropTypes} from 'react';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors}) => {
    if (authors.length == 0) {
        return (<div />);
    }

    return (
        <table className="table">
            <thead>
            <tr>
                <th>&nbsp;</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
                {authors.map(author =>
                    <AuthorListRow key={author.id} author={author} />
                )}
            </tbody>
        </table>
    );
};

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired
};

export default AuthorList;