import React, {useState} from 'react';
import Days from "../Cards/Days";
import Current from "../Tab/Current"
import {WeatherData, RevGeoData} from '../../types';
import NormalizeTime from "../Util/NormalizeTime";

interface TimelineProps {
        data: WeatherData | null;
        revGeoData: RevGeoData | null;
        setLocation: (location: { lat: number; lon: number }) => void;
}

const Timeline: React.FC<TimelineProps> = ({data, revGeoData, setLocation}) => {
        // @ts-ignore
        var {conditions, datetime, datetimeEpoch, hours, icon, temp} = data?.days[0];
        const [locationName, setLocationName] = useState<string | null>(null);

        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                        <div className="bg-blue-300 p-4 rounded-lg  mb-4 ">
                            <h1 className="text-center text-2xl font-bold">
                                { locationName === null ? (
                                    <p>{revGeoData?.results[0].components.town}, {revGeoData?.results[0].components.county}, {revGeoData?.results[0].components.state_code}</p>
                                ) : (
                                    <p>{locationName}</p>
                                )}

                            </h1>
                            <div
                                className="text-center">{revGeoData?.results[0].components.road}, {revGeoData?.results[0].components.postcode}</div>
                        </div>
                        <img
                            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${data?.currentConditions.icon}.svg`}
                            alt=""
                            className="w-full h-l rounded"
                        />

                        <div className="bg-blue-300 p-4 rounded-lg  mb-4 ">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h3 className="text-l font-bold mb-4">{data?.currentConditions.conditions} - {data?.description}</h3>
                                    <h5>Current Conditions:</h5>
                                    <p>Temp: {data?.currentConditions.temp}</p>
                                    <p>UV Index: {data?.currentConditions.uvindex}</p>
                                    <p>Wind Speed: {data?.currentConditions.windspeed}</p>
                                    <p>Feels like: {data?.currentConditions.feelslike}</p>
                                    <p>Sunrise: <NormalizeTime time={data?.currentConditions.sunrise ?? null}/></p>
                                    <p>Sunset: <NormalizeTime time={data?.currentConditions.sunset ?? null}/></p>
                                    <p>Humidity: {data?.currentConditions.humidity}</p>
                                    <p>Cloud Cover: {data?.currentConditions.cloudcover}</p>
                                    <p>Precipitation: {data?.currentConditions.precip}</p>
                                    <p>Snow: {data?.currentConditions.snow}</p>
                                </div>
                                <div>
                                    <Days
                                        key={0}
                                        date={datetime}
                                        dateEpoch={datetimeEpoch}
                                        icon={icon}
                                        temp={temp}
                                        conditions={conditions}
                                        hours={hours}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                        <Current data={data}
                                 setLocation={setLocation}
                                 setLocationName={setLocationName}
                        />
                    <div>
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4">Extended Forcast</h2>
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