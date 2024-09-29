import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import LoadingSpinner from "./components/Util/LoadingSpinner";
import ErrorMessage from "./components/Util/ErrorMessage";
import Timeline from "./components/Page/Timeline";
import { WeatherData, RevGeoData, BeachData } from './types';
import { useFetchWeatherData } from './services/VisualCrossing';

function App() {
    const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
    const [revGeoData, setRevGeoData] = useState<RevGeoData | null>(null);
    const [beachData, setBeachData] = useState<BeachData | null>(null);
    const [geoError, setGeoError] = useState<string | null>(null); // Renamed error to geoError
    const [geoLoading, setGeoLoading] = useState<boolean>(true); // Renamed loading to geoLoading

    useEffect(() => {
        if ("geolocation" in navigator) {
            const options = {
                enableHighAccuracy: true,
                timeout: 20000,
            };

            const onSuccess = (position: GeolocationPosition) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lon: longitude });
                setGeoError(null);
            };

            const onError = (error: GeolocationPositionError) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setGeoError('Permission denied. Please allow location access.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setGeoError('Position unavailable. Ensure your GPS is working.');
                        break;
                    case error.TIMEOUT:
                        setGeoError('Position unavailable. Ensure your GPS is working.');
                        break;
                    default:
                        setGeoError('An unknown error occurred.');
                }
            };

            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        } else {
            setGeoError("Geolocation not supported by this browser");
        }
    }, []);

    const { data, error: weatherError, loading: weatherLoading } = useFetchWeatherData(location);

    useEffect(() => {
        if (location && data) {
            const fetchRevGeoData = async () => {
                try {
                    const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/location-name-resolver/?lat=${location!.lat}&lon=${location!.lon}`);

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData: RevGeoData = await response.json();
                    setRevGeoData(jsonData);
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    setGeoError(errorMessage);
                } finally {
                    setGeoLoading(false);
                }
            };
            fetchRevGeoData();
        }
    }, [location, data]);

    useEffect(() => {
        if (location && data && revGeoData) {
            const fetchBeachData = async () => {
                try {
                    const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/beaches-nearby/?lat=${location!.lat}&lon=${location!.lon}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const jsonData: BeachData = await response.json();
                    setBeachData(jsonData);
                } catch (error) {
                    const errorMessage = (error as Error).message;
                    setGeoError(errorMessage);
                } finally {
                    setGeoLoading(false);
                }
            };
            fetchBeachData();
        }
    }, [location, data, revGeoData]);


    if (geoLoading || weatherLoading) {
        return <LoadingSpinner/>;
    }

    if (geoError || weatherError) {
        const errorMessage = geoError || weatherError || 'Unknown error';
        return <ErrorMessage message={errorMessage} />;
    }

    return (
        <div>
            <Header/>
            <Timeline data={data} revGeoData={revGeoData} beachData={beachData} setLocation={setLocation} />
        </div>
    );
}

export default App;