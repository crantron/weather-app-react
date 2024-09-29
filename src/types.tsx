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

export interface BeachData {
    results: FSPlace[];
    context: FSContext;
}

export interface TrailData {
    results: FSPlace[];
    context: FSContext;
}

export interface FSPlace {
    fsq_id: string;
    categories: FSCategory[];
    chains: any[];
    closed_bucket: string;
    distance: number;
    geocodes: FSGeocodes;
    link: string;
    location: FSLocation;
    name: string;
    related_places: FSRelatedPlaces;
    timezone: string;
}

export interface FSCategory {
    id: number;
    name: string;
    short_name: string;
    plural_name: string;
    icon: FSIcon;
}

export interface FSIcon {
    prefix: string;
    suffix: string;
}

export interface FSGeocodes {
    main: FSCoordinates;
    roof: FSCoordinates;
}

export interface FSCoordinates {
    latitude: number;
    longitude: number;
}

export interface FSLocation {
    address?: string;
    census_block?: string;
    country: string;
    cross_street?: string;
    dma: string;
    formatted_address: string;
    locality: string;
    postcode: string;
    region: string;
}

export interface FSRelatedPlaces {
    parent?: FSParentPlace;
    children?: FSChildPlace[];
}

export interface FSParentPlace {
    fsq_id: string;
    categories: FSCategory[];
    name: string;
}

export interface FSChildPlace {
    fsq_id: string;
    categories: FSCategory[];
    name: string;
}

export interface FSContext {
    geo_bounds: FSGeoBounds;
}

export interface FSGeoBounds {
    circle: FSCircle;
}

export interface FSCircle {
    center: FSCoordinates;
    radius: number;
}

