import React, { useState } from 'react';
import Hourly from "./Hourly";
import { Hour } from '../../types';
import NormalizeDay from "../Util/NormalizeDay";

interface DaysProps {
    date: string;
    dateEpoch: number;
    icon: string;
    temp: number;
    conditions: string;
    hours: Hour[]
}

const Days: React.FC<DaysProps> = ({ date, dateEpoch, icon, temp, conditions, hours }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4">
            <h3 className="font-extrabold"><NormalizeDay epoch={dateEpoch} /></h3>
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