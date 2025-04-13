import { urlencoded } from "express";
import { GeocodeResult, IGeocodeService } from "../../application/services/IGeocodeService";

interface GeoapifyResultRank {
    popularity? : number,
    confidence? : number,
    confidence_street_level? : number,
}

interface GeoapifyResult {
    country_code : string,
    country : string,
    city : string,
    lon : number,
    lat : number,
    formatted : string,
    rank? : GeoapifyResultRank,
}

interface GeoapifyResponse {
    results?: GeoapifyResult[];
}

export interface GeoapifyGeocodeConfig {
    apiUrl : string;
    apiKey : string;
    minConfidenceLevel : number;
}

export class GeocodeService implements IGeocodeService {

    config : GeoapifyGeocodeConfig;

    constructor(
        config : GeoapifyGeocodeConfig
    ) {
        this.config = config;
    }

    public async checkAddress( address : string ) : Promise<GeocodeResult | null> {

        const params = new URLSearchParams({
            text : address, apiKey : this.config.apiKey
        }).toString();

        const response = await fetch( `${this.config.apiUrl}?${params}` );

        if ( !response ) return null;

        const responseAsJSON = <GeoapifyResponse>(await response.json());
        const results = responseAsJSON.results?.filter(
            (result) => result.rank?.popularity && result.rank?.popularity >= this.config.minConfidenceLevel
        ).sort(
            (ranking_1, ranking_2) => (
                ranking_1.rank?.popularity && ranking_2.rank?.popularity &&
                ranking_1.rank?.popularity >= ranking_2.rank?.popularity
            ) ? 1 : -1
        ) || [];

        if ( results.length == 0 ) return null;

        const bestResult = results[0];

        return <GeocodeResult>{
            latitude : bestResult.lat,
            longitude : bestResult.lon,
            solvedAddress : bestResult.formatted,
            solvedCity : bestResult.city,
        }

    }

}