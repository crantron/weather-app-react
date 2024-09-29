import React, { useState, useEffect } from 'react';
import {FSPlace, WeatherData, TrailData} from "../../types";

interface TrailProps {
    trailData: TrailData | null;
    setLocation: (location: { lat: number; lon: number }) => void;
}

interface TrailWeatherMap {
    [key: string]: WeatherData;
}

const Trails: React.FC<TrailProps> = ({ trailData, setLocation }) => {
    const [trailLoc, setTrailLoc] = useState<TrailWeatherMap>({});

    const fetchTrailWeather = async (lat: number, lon: number, beachId: string) => {
        try {
            const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/timeline/?lat=${lat}&lon=${lon}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const trailWeather: WeatherData = await response.json();
            setTrailLoc((prevLoc) => ({
                ...prevLoc,
                [beachId]: trailWeather,
            }));
        } catch (error) {
            console.error(`Error fetching weather for beach ${beachId}:`, error)
        }
    }

    useEffect(() => {
        if (trailData) {
            trailData.results.forEach((trail) => {
                const lat = trail.geocodes.main.latitude;
                const lon = trail.geocodes.main.longitude;
                fetchTrailWeather(lat, lon, trail.fsq_id);
            });
        }
    }, [trailData]);

    const refreshTimeline = (lat: number, lon: number) => {
        setLocation({ lat, lon });
    };

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
            {trailData?.results.map((trail: FSPlace, index: number) => (
                <div id={trail.fsq_id} className="bg-white shadow-lg rounded-lg p-4 mt-2 mb-2" onClick={() => refreshTimeline(trail.geocodes.main.latitude, trail.geocodes.main.longitude)}>
                    <h3 className="text-l font-semibold">{trail.name}</h3>
                    {trailLoc[trail.fsq_id] ? (
                        <div className="mt-4">
                            <img
                                src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${trailLoc[trail.fsq_id].currentConditions?.icon}.svg`}
                                alt=""
                                className="w-full h-l rounded"
                            />
                            <p><b>Temperature:</b> {trailLoc[trail.fsq_id].currentConditions.temp}°F</p>
                            <p><b>Conditions:</b> {trailLoc[trail.fsq_id].currentConditions.conditions}</p>
                            <p><b>UV Index:</b> {trailLoc[trail.fsq_id].currentConditions.uvindex}</p>
                        </div>
                    ) : (
                        <p>Loading weather...</p>
                    )}
                    <p>{trail?.location?.formatted_address}</p>
                </div>
            ))}
        </section>
    );
};

export default Trails;