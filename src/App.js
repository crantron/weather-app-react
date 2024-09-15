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
    return (<div role="status" className="flex items-center">
      <div className="text-center">
      <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
           viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div></div>);
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{data.timezone}</h1>
        <h3 className="text-l font-bold mb-4">{data.description}</h3>
        <img
            src={`https://crantron-goweather.s3.us-east-2.amazonaws.com/${data.currentConditions.icon}.png`}
            alt=""
            className="w-full h-l rounded"
        />
        <h5>Current Conditions:</h5>
        <p>Conditions: {data.currentConditions.conditions}</p>
        <p>Feels like: {data.currentConditions.feelslike}</p>
        <p>Sunrise: {data.currentConditions.sunrise}</p>
        <p>Sunset: {data.currentConditions.sunset}</p>
        <p>Humidity: {data.currentConditions.humidity}</p>
        <p>Temp: {data.currentConditions.temp}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.days.map((day, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold">{day.date}</h2>
                <img
                    src={`https://crantron-goweather.s3.us-east-2.amazonaws.com/${day.icon}.png`}
                    alt=""
                    className="w-full h-l rounded"
                />
                <p>Temperature: {day.temp} °F</p>
                <p>Conditions: {day.conditions}</p>
              </div>
          ))}
        </div>
      </div>
  );
}

export default App;
