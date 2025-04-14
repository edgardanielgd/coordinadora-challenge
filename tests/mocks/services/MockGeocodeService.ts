import { GeocodeResult, IGeocodeService } from "../../../src/application/services/IGeocodeService";

export class MockGeocodeService implements IGeocodeService {
  private mockResults: Record<string, GeocodeResult | null> = {};

  constructor(predefinedResults?: Record<string, GeocodeResult | null>) {
    if (predefinedResults) {
      this.mockResults = predefinedResults;
    }
  }

  public async checkAddress(address: string): Promise<GeocodeResult | null> {
    // If a predefined result exists, return it. Otherwise, return a default mock result.
    if (address in this.mockResults) {
      return this.mockResults[address];
    }

    return {
      latitude: 40.7128,
      longitude: -74.0060,
      solvedAddress: "Mocked Address 123, Mock City",
      solvedCity: "Mock City"
    };
  }

  public setMockResult(address: string, result: GeocodeResult | null) {
    this.mockResults[address] = result;
  }

  public clearMockResults() {
    this.mockResults = {};
  }
}