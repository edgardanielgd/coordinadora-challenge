import { ITransporterRepository } from "../../../src/application/repositories/ITransporterRepository";
import { Transporter } from "../../../src/domain/entities/Transporter";

export class MockTransporterRepository implements ITransporterRepository {
  private transporters: Transporter[] = [];

  constructor() {
    // Optional initial data
    this.transporters.push(new Transporter(1, 101, "ACTIVE"));
    this.transporters.push(new Transporter(2, 102, "INACTIVE"));
  }

  async findById(id: number): Promise<Transporter | null> {
    return this.transporters.find(transporter => transporter.getId() === id) || null;
  }

  // Optional helper methods for tests

  addTransporter(id: number, userId: number, status: string): void {
    this.transporters.push(new Transporter(id, userId, status));
  }

  reset(): void {
    this.transporters = [];
  }
}
