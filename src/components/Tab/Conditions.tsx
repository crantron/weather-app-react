import React, { useState } from 'react';
import NormalizeTime from "../Util/NormalizeTime";
import {Hour, WeatherData} from "../../types";
import NormalizeDay from "../Util/NormalizeDay";
import Days from "../Cards/Days";

interface ConditionsProps {
    data: WeatherData | null;
}

interface CurrentTabs {
    dateEpoch: number;
    date: string;
    temp: number;
    icon: string;
    conditions: string;
    hour: Hour[]
}

const Conditions: React.FC<ConditionsProps> = ({ data }) => {
    const [dayTab, setDayTab] = React.useState<number>(0);
    const tabs: Array<CurrentTabs> = [];

    data?.days.forEach((day) => {
        tabs.push({
            dateEpoch: day.datetimeEpoch,
            date: day.datetime,
            icon: day.icon,
            temp: day.temp,
            conditions: day.conditions,
            hour: day.hours
        });
    });

    const prevTab = () => {
        setDayTab((prevTab) => (prevTab === 0 ? tabs.length - 1 : prevTab - 1));
    };

    const nextTab = () => {
        setDayTab((nextTab) => (nextTab === tabs.length - 1 ? 0 : nextTab + 1));
    }

    return (
        <div>
            <h3 className="text-l font-bold mb-4">{data?.currentConditions.conditions} - {data?.description}</h3>
            <h5>Current Conditions!:</h5>
            <p>Temp: {data?.currentConditions.temp}</p>
            <p>UV Index: {data?.currentConditions.uvindex}</p>
            <p>Wind Speed: {data?.currentConditions.windspeed}</p>
            <p>Feels like: {data?.currentConditions.feelslike}</p>
            <p>Sunrise: <NormalizeTime time={data?.currentConditions.sunrise ?? null}/></p>
            <p>Sunset: <NormalizeTime time={data?.currentConditions.sunset ?? null}/></p>
            <p>Humidity: {data?.currentConditions.humidity}</p>
            <p>Cloud Cover: {data?.currentConditions.cloudcover}</p>
            <p>Precipitation: {data?.currentConditions.precip}</p>
            <p>Snow: {data?.currentConditions.snow}</p>

            <div className="bg-blue-300 p-4">
                <div className="flex justify-between items-center mb-4">
                    <button
                        className="px-4 py-2 bg-blue-400 text-white rounded"
                        onClick={prevTab}
                    >
                        <NormalizeDay epoch={(dayTab === 0) ? tabs[tabs.length-1]?.dateEpoch : tabs[dayTab-1]?.dateEpoch}/>
                    </button>

                    <div className="px-4 py-2 font-semibold border-b-2 border-blue-500 text-blue-500">
                        <NormalizeDay epoch={tabs[dayTab]?.dateEpoch}/>
                    </div>
                    <button
                        className="px-4 py-2 bg-blue-400 text-white rounded"
                        onClick={nextTab}
                    >
                        <NormalizeDay epoch={tabs[(dayTab + 1) % tabs.length]?.dateEpoch}/>
                    </button>
                </div>
                <div>
                    {tabs[dayTab] && (
                        <Days
                            key={dayTab}
                            date={tabs[dayTab].date}
                            dateEpoch={tabs[dayTab].dateEpoch}
                            icon={tabs[dayTab].icon}
                            temp={tabs[dayTab].temp}
                            conditions={tabs[dayTab].conditions}
                            hours={tabs[dayTab].hour}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Conditions;