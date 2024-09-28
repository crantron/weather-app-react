import React from 'react';
import Days from "../Cards/Days";
import Current from "../Tab/Current"
import { WeatherData, RevGeoData, BeachData, FSPlace } from '../../types';
import beaches from "../Tab/Beaches";

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
                                <Current  data={data} beachData={beachData}/>
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