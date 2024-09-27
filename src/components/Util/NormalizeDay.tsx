import React from 'react';

const NormalizeDay: React.FC<{ epoch: number }> = ({epoch}) => {
    const getDayName = (epoch: number): string => {
        const date = new Date(epoch * 1000);
        return date.toLocaleDateString('en-US', {weekday: 'long'});
    };

    const dayName = getDayName(epoch);

    return (
        <span>{dayName}</span>
    );
};

export default NormalizeDay;