import React from 'react';
import './ContactUs.css';

export const ContactUs = () => {
    return (
        <div className="contact-container">
            <h1>Контакты</h1>
            <p>Мы магазин мёда <strong>Since 2012</strong> год продаем качественный и натуральный мёд</p>
            <p>Наши контакты:</p>
            <ul>
                <li>Instagram: <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">@yourusername</a></li>
                <li>Телефон: <a href="tel:+77768456702">+7 776 845 6702</a></li>
            </ul>
        </div>
    );
};

