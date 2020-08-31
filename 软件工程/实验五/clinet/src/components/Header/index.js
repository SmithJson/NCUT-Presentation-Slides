/*
 * @Author: zhangl
 * @Date: 2020-04-26 23:42:19
 * @LastEditors: zhangl
 * @LastEditTime: 2020-05-27 10:42:32
 * @GitHub: https://github.com/SmithJson
 * @FilePath: /clinet/src/components/Header/index.js
 * @Description: Header
 */
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getWeather } from '../../api';
import { formatTime, getItem, removeItem } from '../../tools';
import Breadcrumb from '../Breadcrumb';
import './index.less';

@withRouter
export default class Header extends Component {
    state = {
        weather: {},
        time: '',
    }

    componentDidMount() {
        this.getTime();
        const res = [
            {
                currentCity: '北京',
                weather_data: [
                    {
                        date: '周日 05月03日 (实时：23℃)',
                        dayPictureUrl: 'http://api.map.baidu.com/images/weather/day/yin.png',
                        nightPictureUrl: 'http://api.map.baidu.com/images/weather/night/leizhenyu.png',
                        weather: '阴转雷阵雨',
                        wind: '东风3-4级',
                        temperature: '25 ~ 14',
                    },
                ],
            },
        ];
        setTimeout(() => {
            const [weatherObj] = res;
            const { currentCity, weather_data } = weatherObj;
            const [weatherItem] = weather_data;
            const { dayPictureUrl, weather, temperature } = weatherItem;
            this.setState({
                weather: {
                    city: currentCity,
                    png: dayPictureUrl,
                    nowWeather: weather,
                    temperature,
                },
            });
        }, 1500);
        // this.fetchWeather();
    }

    componentWillUnmount() {
        clearInterval(Header.id);
    }

    getTime = () => {
        Header.id = setInterval(() => {
            const time = Date.now();
            this.setState({
                time: formatTime(time),
            });
        }, 1000);
    }

    fetchWeather = () => {
        getWeather('北京', 'callback').then(res => {
            const [weatherObj] = res;
            const { currentCity, weather_data } = weatherObj;
            const [weatherItem] = weather_data;
            const { dayPictureUrl, weather, temperature } = weatherItem;
            this.setState({
                weather: {
                    city: currentCity,
                    png: dayPictureUrl,
                    nowWeather: weather,
                    temperature,
                },
            });
        });
    }

    handleSignOut = () => {
        removeItem('USER_INFO');
        this.props.history.push('/login');
    }

    render() {
        const { weather, time } = this.state;
        const { avatar, username } = JSON.parse(getItem('USER_INFO') || '{}');
        return (
            <header className="header">
                <div className="header-top-wrapper">
                    <div className="header-top">
                        <Link to="/profile">
                            <div className="user-tip">
                                <img className="avatar" src={avatar} title={username} />
                            </div>
                        </Link>
                        <a className="sign-out-btn" onClick={this.handleSignOut}>退出</a>
                    </div>
                </div>
                <div className="breadcrumb-wrapper">
                    <div className="breadcrumb">
                        <Breadcrumb />
                    </div>
                    <div className="weather-wrapper">
                        <div className="time">{time}</div>
                        <div className="weather">
                            <img className="weather-icon" src={weather.png} alt="" />
                            <div>
                                <span>{weather.nowWeather}</span>
                                <span>{weather.city}</span>
                                <span>{weather.temperature}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
