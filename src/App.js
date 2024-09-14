import React, {useEffect, useState} from 'react';


function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://arguably-open-pheasant.edgecompute.app/v2/timeline/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Timeline Data</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.days.map((day, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold">{day.date}</h2>
                <img
                    src={`https://crantron-goweather.s3.us-east-2.amazonaws.com/${day.icon}.png`}
                    alt=""
                    className="w-full h-auto rounded" // Optional styling for the image
                />
                <p>Temperature: {day.temperature} °F</p>
                <p>Conditions: {day.conditions}</p>
                {/* Add any other details you want to display */}
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
