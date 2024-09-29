import React, { useState } from 'react';
import {BeachData, FSPlace, WeatherData, TrailData} from "../../types";
import Beaches from "../Tab/Beaches";
import Trails from "../Tab/Trails";
import Conditions from "../Tab/Conditions";


interface CurrentProps {
    beachData: BeachData | null;
    trailData: TrailData | null;
    data: WeatherData | null;
    setLocation: (location: { lat: number; lon: number }) => void;

}

const Current: React.FC<CurrentProps> = ({data, beachData, trailData, setLocation}) => {
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div className="bg-blue-300 shadow-lg rounded-lg p-4">
            <div className="flex border-b border-gray-200">
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 0 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(0)}
                >
                    Conditions
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 1 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(1)}
                >
                    Beaches
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTab === 2 ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                    }`}
                    onClick={() => setActiveTab(2)}
                >
                    Trails
                </button>
            </div>
            {activeTab === 0 && (
                <Conditions data={data}/>
            )}
            {activeTab === 1 && (
                <Beaches beachData={beachData} setLocation={setLocation}/>
            )}
            {activeTab === 2 && (
                <Trails trailData={trailData} setLocation={setLocation}/>
            )}
        </div>
    );
};

export default Current;