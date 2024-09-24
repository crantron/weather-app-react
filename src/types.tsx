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
    uvindex: string;
    windspeed: number
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
export interface RevGeoComponents {
    ISO_3166_1_alpha_2: string;
    ISO_3166_1_alpha_3: string;
    ISO_3166_2: string[];
    _category: string;
    _normalized_city: string;
    _type: string;
    continent: string;
    country: string;
    country_code: string;
    county: string;
    house_number: string;
    postcode: string;
    road: string;
    state: string;
    state_code: string;
    town: string;
}

export interface RevGeoResult {
    components: RevGeoComponents;
}

export interface RevGeoData {
    results: RevGeoResult[]
}

