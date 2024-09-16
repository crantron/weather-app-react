import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import LoadingSpinner from "./components/Util/LoadingSpinner";
import ErrorMessage from "./components/Util/ErrorMessage";
import Timeline from "./components/Page/Timeline";
import { WeatherData } from './types';

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if ("geolocation" in navigator) {
            const options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lon: longitude });
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


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
      <div>
          <Header />
          <Timeline data={data} />
      </div>
  );
}

export default App;
