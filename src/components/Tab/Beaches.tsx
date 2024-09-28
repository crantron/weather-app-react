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
                </div>
            ))}
        </h5>

    )
        ;
};

export default Beaches;