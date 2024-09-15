import React from 'react';

interface Hour {
    time: string;
    icon: string;
    temp: number;
    conditions: string;
}

interface HourlyProps {
    hours: Hour[];
}

const Hourly: React.FC<HourlyProps> = ({ hours }) => {
    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Hourly Forecast</h4>
            <div className="flex space-x-4 overflow-x-auto">
                {hours.map((hour, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 bg-teal-300 dark:bg-teal-500 rounded-lg p-4 flex flex-col items-center min-w-[80px]"
                    >
                        <p className="text-sm">{hour.time}</p>
                        <img
                            src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${hour.icon}.svg`}
                            alt={hour.conditions}
                            className="w-8 h-8 mt-2"
                        />
                        <p className="mt-2 text-sm">{hour.temp}°F</p>
                        <p className="text-xs text-center">{hour.conditions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hourly;