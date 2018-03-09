import React, { Component } from 'react';
import './Post.scss';
import user from '../picture/user.svg';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            creation_date: ''
        }
    }
    componentDidMount() {
        let today = new Date(this.props.creation_date * 1000);
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        if(dd < 10) { dd = '0' + dd };
        if(mm < 10) { mm='0' + mm };
        today = mm + '/' + dd + '/' + yyyy;
        this.setState({
            creation_date: today
        })
    }
    render() {
        const {
            title,
            link,
            answer_count,
            view_count,
            owner: {
                profile_image = user,
                reputation,
                display_name
            }
        } = this.props;

        const { creation_date } = this.state;

        return (
            <a href={link} target="_blank" className="post">
                <div className="profile">
                    <img className="image" src={profile_image} alt='' />
                    <div>
                        <div className="name">{display_name}</div>
                        <div className="reputation">reputation: {reputation}</div>
                    </div>
                </div>
                <div className="info">
                    <div className="title">{title}</div>
                    <div className="statistics-wrapper">
                        <div className="statistics">
                            <div className="element">answer {answer_count}</div>
                            <div className="element">view {view_count}</div>
                        </div>
                        <div className="date">
                            creation date { creation_date }
                        </div>
                    </div>
                </div>
            </a>
        );
    }
};

export default Post;
