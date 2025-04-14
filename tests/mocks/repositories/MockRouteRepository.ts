import { IRouteRepository } from "../../../src/application/repositories/IRouteRepository";
import { Route } from "../../../src/domain/entities/Route";
import { City } from "../../../src/domain/entities/City";

export class MockRouteRepository implements IRouteRepository {
  private routes: Route[] = [];
  private routeCities: Map<number, City[]> = new Map();

  constructor() {
    // Optional seed data
    this.routes.push(new Route(1, "Route A"));
    this.routes.push(new Route(2, "Route B"));

    this.routeCities.set(1, [
      new City(1, "Bogotá"),
      new City(2, "Medellín")
    ]);
    this.routeCities.set(2, [
      new City(3, "Cali")
    ]);
  }

  async findById(id: number): Promise<Route | null> {
    return this.routes.find(route => route.getId() === id) || null;
  }

  async getRouteCities(id: number): Promise<City[] | null> {
    return this.routeCities.get(id) || [];
  }

  // Optional helpers for test setup
  addRoute(id: number, name: string): void {
    this.routes.push(new Route(id, name));
  }

  setRouteCities(routeId: number, cities: City[]): void {
    this.routeCities.set(routeId, cities);
  }

  reset(): void {
    this.routes = [];
    this.routeCities.clear();
  }
}
