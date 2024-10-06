import React from 'react';

interface NormalizeDistanceProps {
    distance: number;
}

// Component to display time
const NormalizeDistance: React.FC<NormalizeDistanceProps> = ({distance}) => {
    if (!distance) {
        return <p>No time available</p>
    }

    const miles = distance * 0.621371;

    return (
        <span>{miles} miles away</span>
    );
}

export default NormalizeDistance;