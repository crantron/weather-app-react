import React, { useState, useEffect } from 'react';
import {BeachData, FSPlace, WeatherData} from "../../types";
import Days from "../Cards/Days";

interface BeachProps {
    beachData: BeachData | null;
    setLocation: (location: { lat: number; lon: number }) => void;
}

interface BeachWeatherMap {
    [key: string]: WeatherData;
}

const Beaches: React.FC<BeachProps> = ({ beachData, setLocation }) => {
    const [beachLoc, setBeachLoc] = useState<BeachWeatherMap>({});

    const fetchBeachWeather = async (lat: number, lon: number, beachId: string) => {
        try {
            const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/timeline/?lat=${lat}&lon=${lon}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const beachWeather: WeatherData = await response.json();
            setBeachLoc((prevLoc) => ({
                ...prevLoc,
                [beachId]: beachWeather,
            }));
        } catch (error) {
            console.error(`Error fetching weather for beach ${beachId}:`, error)
        }
    }

    useEffect(() => {
        if (beachData) {
            beachData.results.forEach((beach) => {
                const lat = beach.geocodes.main.latitude;
                const lon = beach.geocodes.main.longitude;
                fetchBeachWeather(lat, lon, beach.fsq_id);
            });
        }
    }, [beachData]);

    const refreshTimeline = (lat: number, lon: number) => {
        setLocation({ lat, lon });
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
            {beachData?.results.map((beach: FSPlace, index: number) => (
                <div id={beach.fsq_id} className="bg-white shadow-lg rounded-lg p-4 mt-2 mb-2" onClick={() => refreshTimeline(beach.geocodes.main.latitude, beach.geocodes.main.longitude)}>
                    <h3 className="text-l font-semibold">{beach.name}</h3>
                    {beachLoc[beach.fsq_id] ? (
                        <div className="mt-4">
                            <img
                                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${beachLoc[beach.fsq_id].currentConditions?.icon}.svg`}
                                alt=""
                                className="w-full h-l rounded"
                            />
                            <p><b>Temperature:</b> {beachLoc[beach.fsq_id].currentConditions.temp}°F</p>
                            <p><b>Conditions:</b> {beachLoc[beach.fsq_id].currentConditions.conditions}</p>
                            <p><b>UV Index:</b> {beachLoc[beach.fsq_id].currentConditions.uvindex}</p>
                        </div>
                    ) : (
                        <p>Loading weather...</p>
                    )}
                    <p>{beach?.location?.formatted_address}</p>
                </div>
            ))}
        </section>
    );
};

export default Beaches;