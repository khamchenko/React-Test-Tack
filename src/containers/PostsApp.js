import React, { Component } from 'react';
import { orderBy, forIn, filter } from 'lodash';

import './PostsApp.scss';

import Header from '../components/Header';
import PostList from '../components/PostsList';
import Loader from '../components/Loader';
import Notice from '../components/Notice';

const API_STACKOVERFLOW = 'https://api.stackexchange.com/2.2/';
const DEFAULT_QUERY =  {
    intitle: 'react',
    site: 'stackoverflow',
    pagesize: '100',
    sort: 'activity',
    order: 'desc'
}

class PostsApp extends Component {
    constructor() {
        super()
        this.state = {
            filterDate: 'new',
            posts: [],
            isLoading: false,
            query: DEFAULT_QUERY,
            error: null,
        }
        this.handlerFilterDate = this.handlerFilterDate.bind(this);
    }

    componentDidMount() {
        this.fetchPosts();

    }

    fetchPosts() {
        let search = [];

        this.setState({ isLoading: true });

        forIn(this.state.query, (value, key) => {
            search.push([`${key}=${value}`]);
        });

        search = search.join('&');

        fetch(`${API_STACKOVERFLOW}search?${search}`)
            .then( response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Something went wrong ...');
                }
            })
            .then( data => this.handlerPosts(data.items))
            .catch( error => this.handlerError(error));
    }

    handlerPosts(data) {
        let posts = filter(data, (item) => {
            return item.is_answered && item.owner.reputation >= 50
        });

        posts = orderBy(posts, ['creation_date'], ['desc']);

        if (posts.length) {
            this.setState({ posts: posts, isLoading: false })
        } else {
            let error = new Error('Result null');
            this.handlerError(error);
        };
    }

    handlerError(error) {
        this.setState({ error, isLoading: false });
    }

    handlerFilterDate() {
        let sort = this.state.filterDate == 'old' ? 'desc' : 'asc';
        let filterDate = sort == 'desc' ? 'new' : 'old';
        let posts = orderBy(this.state.posts, ['creation_date'], [sort]);
        this.setState({ filterDate: filterDate, posts: posts });
    }

    render() {
        const { posts, isLoading, error } = this.state;

        return (
            <div className="app">
                <Header />
                {
                    isLoading
                        ? <Loader />
                        : error
                            ? <Notice error={error}/>
                            : <PostList posts={posts} onFilterDate={this.handlerFilterDate}/>
                }
            </div>
        );
    }
};

export default PostsApp;
