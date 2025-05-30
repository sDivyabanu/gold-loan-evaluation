import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarGfg({sendata}) {
    

    return (
        <div className='relative right-15'>
            
            <Calendar
                onChange={sendata}
                
                
                
            />
        </div>
    );
}
