export interface GeocodeResult {
    latitude: number,
    longitude: number,
    solvedAddress: string,
    solvedCity: string,
}

export interface IGeocodeService {

    checkAddress( address : string ) : Promise<GeocodeResult | null>;

}