import React, { useState } from 'react';
import NormalizeTime from "../Util/NormalizeTime";
import {BeachData, WeatherData} from "../../types";

interface ConditionsProps {
    data: WeatherData | null;
}

const Beaches: React.FC<ConditionsProps> = ({ data }) => {
    return (
        <div>
            <h3 className="text-l font-bold mb-4">{data?.currentConditions.conditions} - {data?.description}</h3>
            <h5>Current Conditions:</h5>
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
        </div>
    );
};

export default Beaches;