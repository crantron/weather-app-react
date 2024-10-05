import {useEffect, useState} from 'react';
import {ActivityData} from '../types'; // Adjust the path as needed

export const useFetchActivities = (location: {lat: number | undefined; lon: number | undefined}, type: string | null) => {
    const [activityData, setActivityData] = useState<ActivityData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActivityData = async () => {
            if (location.lat === undefined || location.lon === undefined || !type) {
                return;
            }
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://arguably-open-pheasant.edgecompute.app/v2/nearby/?lat=${location!.lat}&lon=${location!.lon}&type=${type}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData: ActivityData = await response.json();
                setActivityData(jsonData);
            } catch (error) {
                const errorMessage = (error as Error).message;
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchActivityData();

    }, [type]);

    return {activityData, error, loading};
};