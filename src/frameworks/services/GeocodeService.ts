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

interface GeoapifyProperties {
    properties : GeoapifyResult;
}

interface GeoapifyResponse {
    features?: GeoapifyProperties[];
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
        const results = responseAsJSON.features?.filter(
            (result) => result.properties?.rank?.confidence && result.properties?.rank?.confidence >= this.config.minConfidenceLevel
        ).sort(
            (ranking_1, ranking_2) => (
                ranking_1.properties?.rank?.confidence && ranking_2.properties?.rank?.confidence &&
                ranking_1.properties?.rank?.confidence >= ranking_2.properties?.rank?.confidence
            ) ? 1 : -1
        ) || [];

        if ( results.length == 0 ) return null;

        const bestResult = results[0];

        return <GeocodeResult>{
            latitude : bestResult.properties?.lat,
            longitude : bestResult.properties?.lon,
            solvedAddress : bestResult.properties?.formatted,
            solvedCity : bestResult.properties?.city,
        }
    }

}