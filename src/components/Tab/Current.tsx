import React, { useState } from 'react';
import {BeachData, FSPlace, WeatherData} from "../../types";
import Beaches from "../Tab/Beaches";
import Conditions from "../Tab/Conditions";


interface CurrentProps {
    beachData: BeachData | null;
    data: WeatherData | null;

}

const Current: React.FC<CurrentProps> = ({data, beachData}) => {
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
            </div>
            {activeTab === 0 && (
                <Conditions data={data}/>
            )}
            {activeTab === 1 && (
                <Beaches beachData={beachData}/>
            )}
        </div>
    );
};

export default Current;