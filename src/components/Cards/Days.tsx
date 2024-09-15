import React, { useState } from 'react';
import Hourly from "./Hourly";

interface DaysProps {
    date: string;
    icon: string;
    temp: number;
    conditions: string;
    hours: Hour[]
}

interface Hour {
    time: string;
    icon: string;
    temp: number;
    conditions: string;
}


const Days: React.FC<DaysProps> = ({ date, icon, temp, conditions, hours }) => {

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{date}</h2>
            <img
                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${icon}.svg`}
                alt={conditions}
                className="h-32 w-full object-contain"
            />
            <p>Temperature: {temp} °F</p>
            <p>Conditions: {conditions}</p>

            <Hourly hours={hours} />
        </div>
    );
};

export default Days;