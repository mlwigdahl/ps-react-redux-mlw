import 'babel-polyfill';
import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import CoursesPage from './components/course/CoursesPage'; //eslint-disable-line import/no-named-as-default
import ManageCoursePage from './components/course/ManageCoursePage'; //eslint-disable-line import/no-named-as-default
import AuthorsPage from './components/author/AuthorsPage'; //eslint-disable-line import/no-named-as-default
import ManageAuthorPage from './components/author/ManageAuthorPage'; //eslint-disable-line import/no-named-as-default
import NotFoundPage from './components/common/NotFoundPage';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course" component={ManageCoursePage}>
            <Route path="/course/:id" component={ManageCoursePage} />
        </Route>
        <Route path="/authors" component={AuthorsPage} />
        <Route path="/author" component={ManageAuthorPage}>
            <Route path="/author/:id" component={ManageAuthorPage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Route>
);