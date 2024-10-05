import React, {useRef} from 'react';
import { Hour } from '../../types';
import NormalizeTime from "../Util/NormalizeTime";
import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';

interface HourlyProps {
    hours: Hour[];
}

const Hourly: React.FC<HourlyProps> = ({ hours }) => {
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const timeData = hours.map(hour => hour.datetime);
    const conditionData = hours.map(hour => hour.conditions);
    const temperatureData = hours.map(hour => ({
        y: hour.temp,
        marker: {
            symbol: `url(https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/4th%20Set%20-%20Color/${hour.icon}.svg)`,
            height: 15,
            width: 15
        },
        conditions: hour.conditions // additional data like conditions can be added here
    }));
    const options: Highcharts.Options = {
        title: {
            text: undefined
        },
        xAxis: {
            categories: timeData, // X-axis will show the formatted time
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'Temperature (°F)'
            }
        },
        series: [{
            type: 'line',
            data: temperatureData, // Use temperature data for the series
            name: 'Temperature',
            marker: {
                enabled: true,
                radius: 1,
            }
        }],
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    radius: 10, // Size of the image icon marker
                }
            }
        }
    };

    return (
        <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Hourly Forecast</h4>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </div>
    );
};

export default Hourly;