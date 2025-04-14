import { IVehicleRepository } from "../../../src/application/repositories/IVehicleRepository";
import { Vehicle } from "../../../src/domain/entities/Vehicle";

export class MockVehicleRepository implements IVehicleRepository {
  private vehicles: Vehicle[] = [];
  private reservedCapacities: Map<number, number> = new Map();

  constructor() {
    // Optional initial mock data
    this.vehicles.push(new Vehicle(1, "Truck A", 10000));
    this.vehicles.push(new Vehicle(2, "Truck B", 8000));
    this.reservedCapacities.set(1, 2000); // Mock reserved capacity
    this.reservedCapacities.set(2, 0);
  }

  async findById(id: number): Promise<Vehicle | null> {
    return this.vehicles.find(vehicle => vehicle.getId() === id) || null;
  }

  async getVehicleReservedCapacity(id: number): Promise<number | null> {
    if (!this.reservedCapacities.has(id)) return null;
    return this.reservedCapacities.get(id) ?? null;
  }

  // Optional helper methods for testing

  addVehicle(id: number, name: string, capacity: number): void {
    this.vehicles.push(new Vehicle(id, name, capacity));
  }

  setReservedCapacity(vehicleId: number, capacity: number): void {
    this.reservedCapacities.set(vehicleId, capacity);
  }

  reset(): void {
    this.vehicles = [];
    this.reservedCapacities.clear();
  }
}
