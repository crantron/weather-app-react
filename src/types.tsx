export interface CurrentConditions {
    icon: string;
    conditions: string;
    feelslike: number;
    sunrise: string;
    sunset: string;
    humidity: number;
    temp: number;
    cloudcover: string;
    precip: string;
    snow: string;

}

export interface Hour {
    datetime: string;
    icon: string;
    temp: number;
    conditions: string;
}

export interface Day {
    datetime: string;
    datetimeEpoch: number;
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