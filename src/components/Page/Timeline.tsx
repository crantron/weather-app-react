import React from 'react';
import Days from "../Cards/Days";
import { WeatherData, RevGeoData, BeachData, FSPlace } from '../../types';
import NormalizeTime from "../Util/NormalizeTime";
import Beaches from "../Tab/Beaches";

interface TimelineProps {
        data: WeatherData | null;
        revGeoData: RevGeoData | null;
        beachData: BeachData | null;
}

const Timeline: React.FC<TimelineProps> = ({data, revGeoData, beachData}) => {
        return (
                <div className="container mx-auto p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
                                <div>
                                        <div className="bg-blue-300 p-4 rounded-lg  mb-4 ">
                                            <h1 className="text-center text-2xl font-bold">
                                                {revGeoData?.results[0].components.town}, {revGeoData?.results[0].components.county}, {revGeoData?.results[0].components.state_code}
                                            </h1>
                                            <div className="text-center">{revGeoData?.results[0].components.road}, {revGeoData?.results[0].components.postcode}</div>
                                        </div>
                                        <img
                                            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${data?.currentConditions.icon}.svg`}
                                            alt=""
                                            className="w-full h-l rounded"
                                        />
                                </div>
                                <div className="bg-blue-300 shadow-lg rounded-lg p-4">
                                    <h3 className="text-l font-bold mb-4">{data?.currentConditions.conditions} - {data?.description}</h3>
                                    <h5>Current Conditions:</h5>
                                    <p>Temp: {data?.currentConditions.temp}</p>
                                    <p>UV Index: {data?.currentConditions.uvindex}</p>
                                    <p>Wind Speed: {data?.currentConditions.windspeed}</p>
                                    <p>Feels like: {data?.currentConditions.feelslike}</p>
                                    <p>Sunrise: <NormalizeTime time={data?.currentConditions.sunrise ?? null} /></p>
                                    <p>Sunset: <NormalizeTime time={data?.currentConditions.sunset ?? null} /></p>
                                    <p>Humidity: {data?.currentConditions.humidity}</p>
                                    <p>Cloud Cover: {data?.currentConditions.cloudcover}</p>
                                    <p>Precipitation: {data?.currentConditions.precip}</p>
                                    <p>Snow: {data?.currentConditions.snow}</p>
                                    <h5>
                                        {beachData?.results.map((beach: FSPlace, index: number) => (
                                            <Beaches
                                                key={index}
                                                name={beach.name}
                                                address='N/A'
                                                distance={beach.distance}
                                                icon={`${beach.categories[0].icon.prefix}88${beach.categories[0].icon.suffix}`}
                                            />
                                        ))}

                                        <p>{beachData?.results[0].name}</p>
                                    </h5>
                                </div>
                            <div>
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