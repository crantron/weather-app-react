import React, {useEffect, useState} from 'react';
import Header from './components/Header/Header';
import LoadingSpinner from "./components/Util/LoadingSpinner";
import ErrorMessage from "./components/Util/ErrorMessage";
import Timeline from "./components/Page/Timeline";
import { WeatherData } from './types';

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
          <Timeline data={data} />
      </div>
  );
}

export default App;
