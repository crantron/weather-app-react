import {FSPlace, WeatherData} from "../../types";
import React from "react";
import {useFetchActivities} from "../../services/Activites";
import LoadingSpinner from "../Util/LoadingSpinner";
import ErrorMessage from "../Util/ErrorMessage";

interface ActivityProps {
    type: string;
    data: WeatherData | null;
    setLocation: (location: { lat: number; lon: number }) => void;
    setLocationName: React.Dispatch<React.SetStateAction<string | null>>;
}

const Activity: React.FC<ActivityProps> = ({ type, data, setLocation, setLocationName }) => {
    let lat = data?.latitude;
    let lon = data?.longitude;
    const refreshTimeline = (lat: number, lon: number, name: string) => {
        setLocation({ lat, lon });
        setLocationName(name);
    };
    const {activityData, error, loading} = useFetchActivities({ lat: lat, lon: lon }, type);

    if (loading) {
        return <LoadingSpinner location={null} revGeoData={null} isMain={false}/>;
    }

    if (error) {
        return <ErrorMessage message={error} />
    }

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" >
            {activityData?.results.map((activity: FSPlace, index: number) => (
                <div key={activity.fsq_id} className="bg-white shadow-lg rounded-lg p-4 mt-2 mb-2" onClick={() => refreshTimeline(activity.geocodes.main.latitude, activity.geocodes.main.longitude, activity.name)}>
                    <h3 className="text-l font-semibold">{activity.name}</h3>
                    <p>{activity?.location?.formatted_address}</p>
                </div>
            ))}
        </section>
    );
};

export default Activity;