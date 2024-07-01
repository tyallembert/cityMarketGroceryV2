import React from 'react';
import "./Header.scss";
import { useDate } from '../context/DateContext';

const Header = () => {
    const {time, date} = useDate();
    return (
        <header className='headerContainer'>
            <div className='timeContainer'>
                <h2 className='time'>{time}</h2>
                <h3 className='date'>{date}</h3>
            </div>
            <h1 className='title'>Dry Goods Live</h1>
        </header>
    )
}

export default Header