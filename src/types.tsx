export interface CurrentConditions {
    icon: string;
    conditions: string;
    feelslike: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    temp: number;
}

export interface Hour {
    time: string;
    icon: string;
    temp: number;
    conditions: string;
}

export interface Day {
    date: string;
    icon: string;
    temp: number;
    conditions: string;
    hours: Hour[];
}

export interface WeatherData {
    timezone: string;
    description: string;
    city: string;
    country: string;
    currentConditions: CurrentConditions;
    days: Day[];
}