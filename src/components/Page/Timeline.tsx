import React from 'react';
import Days from "../Cards/Days";
import { WeatherData } from '../../types';

interface TimelineProps {
        data: WeatherData | null;
}

const Timeline: React.FC<TimelineProps> = ({data}) => {
    return (
        <div className="container mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">{data?.timezone}</h1>
            <h3 className="text-l font-bold mb-4">{data?.description}</h3>
            <img
                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${data?.currentConditions.icon}.svg`}
                alt=""
                className="w-full h-l rounded"
            />
            <h5>Current Conditions:</h5>
            <p>Conditions: {data?.currentConditions.conditions}</p>
            <p>Feels like: {data?.currentConditions.feelslike}</p>
            <p>Sunrise: {data?.currentConditions.sunrise}</p>
            <p>Sunset: {data?.currentConditions.sunset}</p>
            <p>Humidity: {data?.currentConditions.humidity}</p>
            <p>Temp: {data?.currentConditions.temp}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.days.map((day, index) => (
                    <Days
                        key={index}
                        date={day.date}
                        icon={day.icon}
                        temp={day.temp}
                        conditions={day.conditions}
                        hours={day.hours}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;