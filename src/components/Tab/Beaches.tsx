import React, { useState } from 'react';


interface BeachProps {
    name: string;
    address: string;
    distance: number;
    icon: string;
}

const Beaches: React.FC<BeachProps> = ({ name, address, distance, icon }) => {
    return (
        <div className="beach-cardß">
            <img src={`${icon}`} alt={name} className="w-16 h-16 mb-4" />
            <h2 className="text-xl font-semibold">{name}</h2>
            <p>Address: {address}</p>
            <p>Distance: {distance} meters away</p>
        </div>
    );
};

export default Beaches;