import { useEffect, useState } from 'react';
import { WeatherData } from '../types'; // Adjust the path as needed

export const useFetchWeatherData = (location: { lat: number; lon: number } | null) => {
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (location) {
            const fetchData = async () => {
                try {
                    let url = `https://arguably-open-pheasant.edgecompute.app/v2/timeline/`;

                    if (location.lat !== 0 || location.lon !== 0) {
                        url = `https://arguably-open-pheasant.edgecompute.app/v2/timeline/?lat=${location.lat}&lon=${location.lon}`;
                    }

                    const response = await fetch(url);

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
            };

            fetchData();
        }
    }, [location]);

    return { data, error, loading };
};