import React, { useState } from 'react';
import {BeachData, FSPlace} from "../../types";


interface BeachProps {
    beachData: BeachData | null;
}

const Beaches: React.FC<BeachProps> = ({ beachData }) => {
    return (
        <h5>
            {beachData?.results.map((beach: FSPlace, index: number) => (
                <div className="beach-card">
                    <h2 className="text-xl font-semibold">{beach.name}</h2>
                    <p>{beach?.location?.formatted_address}</p>
                    <p>{beach?.geocodes.main.latitude}</p>
                    <p>{beach?.geocodes.main.longitude}</p>
                </div>
            ))}
        </h5>
    );
};

export default Beaches;