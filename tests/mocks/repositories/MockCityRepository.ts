import { ICityRepository } from "../../../src/application/repositories/ICityRepository";
import { City } from "../../../src/domain/entities/City";

export class MockCityRepository implements ICityRepository {
  private cities: City[] = [];

  constructor() {
    // Optional: add default mock cities
    this.cities.push(new City(1, "Zipaquira"));
    this.cities.push(new City(2, "Bogotá"));
  }

  async findById(id: number): Promise<City | null> {
    return this.cities.find(city => city.getId() === id) || null;
  }

  // Optional helper method for adding test data
  addCity(id: number, name: string): void {
    this.cities.push(new City(id, name));
  }

  // Optional: reset method for test cleanup
  reset(): void {
    this.cities = [];
  }
}
