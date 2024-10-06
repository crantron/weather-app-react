import React from 'react';
import {WeatherData} from "../../types";

interface HeaderProps {
    data: WeatherData | null;
}


const Header: React.FC<HeaderProps> = ({data}) => {
    return (
            <header className="p-4 text-white flex justify-center items-center relative">
                <img
                    src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${data?.currentConditions.icon}.svg`}
                    alt=""
                    className="absolute mt-100 -ml-96 z-[-10] opacity-40 -top-10"
                />
                <h1 className="text-2xl">Localsonly.today</h1>

            </header>
    );
};

export default Header;