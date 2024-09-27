import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import LoadingSpinner from "./components/Util/LoadingSpinner";
import ErrorMessage from "./components/Util/ErrorMessage";
import Timeline from "./components/Page/Timeline";
import {WeatherData, RevGeoData, BeachData} from './types';
import {data} from "autoprefixer";

function App() {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [data, setData] = useState<WeatherData | null>(null);
    const [revGeoData, setRevGeoData] = useState<RevGeoData | null>(null);
    const [beachData, setBeachData] = useState<BeachData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const options = {
                enableHighAccuracy: false,
                timeout: 1,
                maximumAge: 1000
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setLocation({lat: latitude, lon: longitude});
                },
                (error) => {
                    setError("Unable to retrieve location");
                },
                options
            );
        } else {
            setError("Geolocation not supported by this browser");
        }
    }, [])

    useEffect(() => {
        if (location) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/timeline/?lat=${location!.lat}&lon=${location!.lon}`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData: WeatherData = await response.json();
                    setData(jsonData);
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    setError(errorMessage);
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        }
    }, [location]);

    useEffect(() => {
        if (location && data) {
            const fetchRevGeoData = async () => {
                try {
                    const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/location-name-resolver/?lat=${location!.lat}&lon=${location!.lon}`)

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData: RevGeoData = await response.json();
                    setRevGeoData(jsonData);
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    setError(errorMessage);
                } finally {
                    setLoading(false);
                }
            }
            fetchRevGeoData();
        }
    }, [location, data]);

    useEffect(() => {
       if (location && data && revGeoData) {
           const fetchBeachData = async () => {
               try {
                   const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/beaches-nearby/?lat=${location!.lat}&lon=${location!.lon}`)
                        if (!response.ok) {
                            throw new Error('Failed to fetch data');
                        }
                        const jsonData: BeachData = await response.json();
                        setBeachData(jsonData);
                   } catch (error) {
                        const errorMessage = (error as Error).message;
                        setError(errorMessage);
                   } finally {
                        setLoading(false);
                   }
               }
               fetchBeachData();
           }
    }, [location, data, revGeoData]);


    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorMessage message={error}/>;
    }

    return (
        <div>
            <Header/>
            <Timeline data={data} revGeoData={revGeoData} beachData={beachData} />
        </div>
    );
}

export default App;
