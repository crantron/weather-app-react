import React, {useState} from 'react';
import Current from "../Tab/Current"
import {WeatherData, RevGeoData} from '../../types';
import Conditions from "../Tab/Conditions";

interface TimelineProps {
        data: WeatherData | null;
        revGeoData: RevGeoData | null;
        setLocation: (location: { lat: number; lon: number }) => void;
}

const Timeline: React.FC<TimelineProps> = ({data, revGeoData, setLocation}) => {
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
                        <div className="bg-blue-300 p-4  mb-4 ">
                            <div className="gap-4 mb-4">
                               <Conditions data={data} />
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
            </div>
        );
};

export default Timeline;