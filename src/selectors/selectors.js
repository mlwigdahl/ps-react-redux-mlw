export function authorsFormattedForDropdown(authors) {
    return authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName
        };
    });
}

// kind of unsure if this is the right place, but seems appropriate...

export function authorIdFromData({firstName, lastName}) {
    return firstName.toLowerCase() + '-' + lastName.toLowerCase();
}