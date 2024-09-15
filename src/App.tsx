import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import Days from './components/Cards/Days';
import LoadingSpinner from "./components/Util/LoadingSpinner";
import ErrorMessage from "./components/Util/ErrorMessage";

interface CurrentConditions {
    icon: string;
    conditions: string;
    feelslike: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    temp: number;
}

interface Day {
    date: string;
    icon: string;
    temp: number;
    conditions: string;
}

interface WeatherData {
    timezone: string;
    description: string;
    currentConditions: CurrentConditions;
    days: Day[];
}

function App() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://arguably-open-pheasant.edgecompute.app/v2/timeline/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData: WeatherData = await response.json();
        setData(jsonData);
      } catch (error) {
          const errorMessage = (error as Error).message;
          setError(errorMessage);
      } finally {
          setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
      <div>
          <Header />
          <div className="container mx-auto p-4">

            <h1 className="text-2xl font-bold mb-4">{data?.timezone}</h1>
            <h3 className="text-l font-bold mb-4">{data?.description}</h3>
            <img
                src={`https://crantron-goweather.s3.us-east-2.amazonaws.com/${data?.currentConditions.icon}.png`}
                alt=""
                className="w-full h-l rounded"
            />
            <h5>Current Conditions:</h5>
            <p>Conditions: {data?.currentConditions.conditions}</p>
            <p>Feels like: {data?.currentConditions.feelslike}</p>
            <p>Sunrise: {data?.currentConditions.sunrise}</p>
            <p>Sunset: {data?.currentConditions.sunset}</p>
            <p>Humidity: {data?.currentConditions.humidity}</p>
            <p>Temp: {data?.currentConditions.temp}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data?.days.map((day, index) => (
                  <Days
                    key={index}
                    date={day.date}
                    icon={day.icon}
                    temp={day.temp}
                    conditions={day.conditions}
                  />
              ))}
            </div>
          </div>
      </div>
  );
}

export default App;
