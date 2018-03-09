import React, { Component } from 'react';
import { map } from 'lodash';
import './PostsList.scss';

import Filter from '../Filter';
import Post from '../Post';

const PostsList = (props) => (
    <article className="post-list">
        <Filter onFilterDate={props.onFilterDate}/>
        <div className="wrapper-list">
            {
                map(props.posts, post => {
                    return (
                        <Post key={post.question_id} {...post}/>
                    )
                })
            }
        </div>
    </article>
);

export default PostsList;
