import React, {useState} from 'react';
import {WeatherData} from "../../types";
import Activity from "./Activity";

interface CurrentProps {
    setLocationName: React.Dispatch<React.SetStateAction<string | null>>;
    data: WeatherData | null;
    setLocation: (location: { lat: number; lon: number }) => void;
}

const Current: React.FC<CurrentProps> = ({data, setLocation, setLocationName}) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { type: 'beaches', label: 'Beaches' },
        { type: 'trails', label: 'Trails' },
        { type: 'breweries', label: 'Breweries' },
        { type: 'restaurants', label: 'Restaurants' },
        { type: 'galleries', label: 'Galleries' },
    ];

    return (
        <div className="bg-blue-300 shadow-lg rounded-lg p-4">
            <div className="flex border-b border-gray-200">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-4 py-2 font-semibold ${
                            activeTab === index ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div>
                {tabs.map((tab, index) =>
                    activeTab === index ? (
                        <Activity
                            key={index}
                            type={tab.type}
                            data={data}
                            setLocation={setLocation}
                            setLocationName={setLocationName}
                        />
                    ) : null
                )}
            </div>
        </div>
    );
};

export default Current;