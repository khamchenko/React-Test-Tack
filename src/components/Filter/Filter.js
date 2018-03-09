import React, { Component } from 'react';
import './Filter.scss';
import arrow from '../picture/sort-down.svg';

export default class Filter extends Component {
    constructor() {
        super();
        this.state = {
            activefilter: false
        }
        this.handlerFilterDate = this.handlerFilterDate.bind(this);
    }

    handlerFilterDate() {
        this.props.onFilterDate();
        this.setState({
            activefilter: !this.state.activefilter
        });
    }

    render() {
        const { activefilter } = this.state;
        return (
            <div className="filter">
                <div className="wrapper-filter">
                    <div className="title">Filter</div>
                    <div className="filter-elements">
                        <div className="filter-elem" onClick={this.handlerFilterDate}>
                            Date
                            <img src={arrow} className={activefilter ? "icon" : "icon arrow-up"} alt=''/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
