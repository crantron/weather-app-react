import React from 'react';

interface DaysProps {
    date: string;
    icon: string;
    temp: number;
    conditions: string;
}

const Days: React.FC<DaysProps> = ({ date, icon, temp, conditions }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{date}</h2>
            <img
                src={`https://crantron-goweather.s3.us-east-2.amazonaws.com/${icon}.png`}
                alt={conditions}
                className="w-full h-auto rounded"
            />
            <p>Temperature: {temp} °F</p>
            <p>Conditions: {conditions}</p>
        </div>
    );
};

export default Days;