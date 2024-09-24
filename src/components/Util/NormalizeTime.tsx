import React from 'react';

interface TimeDisplayProps {
    time: string | null;
}

// Component to display time
const TimeDisplay: React.FC<TimeDisplayProps> = ({ time }) => {
    if (!time) {
        return <p>No time available</p>
    }

    const formattedTime = convertTo12Hour(time);

    return (
            <span>{formattedTime}</span>
    );
}

function convertTo12Hour(time: string): string {
    let [hours, minutes] = time.split(':');
    let hoursNumber = parseInt(hours);
    const ampm = hoursNumber >= 12 ? 'PM' : 'AM';
    hoursNumber = hoursNumber % 12 || 12;
    return `${hoursNumber}:${minutes} ${ampm}`;
}

export default TimeDisplay;