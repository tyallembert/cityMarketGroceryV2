import React, { useEffect, useState } from 'react';
import "./Header.scss";
import { useDate } from '../context/DateContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const {time, date} = useDate();
    const [title, setTitle] = useState(null);
    const location = useLocation();
    const extractTitle = () => {
        switch(location.pathname) {
            case '/':
                setTitle("Dry Goods Live");
                break;
            case '/perishables/live':
                setTitle("Perishables Live");
                break;
            default:
                setTitle("Error");
                break;
        }
    }
    useEffect(()=> {
        extractTitle();
    });
    return (
        <header className='headerContainer'>
            <div className='timeContainer'>
                <h2 className='time'>{time}</h2>
                <h3 className='date'>{date}</h3>
            </div>
            <h1 className='title'>{title}</h1>
        </header>
    )
}

export default Header