import React, {useEffect} from 'react';
import {Location, RevGeoData} from "../../types";

interface LoadingProps {
    location: Location | null;
    revGeoData: RevGeoData | null;
    isMain: boolean;
}
const LoadingSpinner: React.FC<LoadingProps> = ({location, revGeoData, isMain}) => {
    const [status, setStatus] = React.useState<number>(0);

    useEffect(() => {
        if (location !== null) {
            setStatus(1);
        } else if (revGeoData !== null) {
            setStatus(2);
        }
    }, [location, revGeoData]);

    const statuses = [
        "Beaming GPS query to Satellite.",
        "Retrieving GPS query.",
        "Aggregating Local Information",
    ];

    return (
        <div role="status" className="flex items-center justify-center">
            <div className="shaka-loading">🤙</div>
            <div>{(isMain) ? statuses[status] : ''} </div>
            <div className="sr-only">Loading...</div>
        </div>
    );
};

export default LoadingSpinner;