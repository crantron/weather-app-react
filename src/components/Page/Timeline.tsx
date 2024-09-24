import React from 'react';
import Days from "../Cards/Days";
import { WeatherData } from '../../types';
import NormalizeTime from "../Util/NormalizeTime";

interface TimelineProps {
        data: WeatherData | null;
}

const Timeline: React.FC<TimelineProps> = ({data}) => {
    return (
        <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                        <div>
                                <h1 className="text-2xl font-bold mb-4">{data?.city}, {data?.country}</h1>
                                <img
                                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${data?.currentConditions.icon}.svg`}
                                    alt=""
                                    className="w-full h-l rounded"
                                />
                        </div>
                    <div className="bg-blue-300 shadow-lg rounded-lg p-4">
                        <h3 className="text-l font-bold mb-4">{data?.description}</h3>
                        <h5>Current Conditions:</h5>
                        <p>Temp: {data?.currentConditions.temp}</p>
                        <p>Feels like: {data?.currentConditions.feelslike}</p>
                        <p>Conditions: {data?.currentConditions.conditions}</p>
                        <p>Sunrise: <NormalizeTime time={data?.currentConditions.sunrise ?? null} /></p>
                        <p>Sunset: <NormalizeTime time={data?.currentConditions.sunset ?? null} /></p>
                        <p>Humidity: {data?.currentConditions.humidity}</p>
                    </div>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data?.days.map((day, index) => (
                            <Days
                                key={index}
                                date={day.datetime}
                                dateEpoch={day.datetimeEpoch}
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