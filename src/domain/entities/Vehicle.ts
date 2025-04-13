/**
 * @openapi
 * components:
 *   schemas:
 *     Vehicle:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - capacity
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the vehicle
 *         name:
 *           type: string
 *           description: The name of the vehicle
 *         capacity:
 *           type: number
 *           format: float
 *           description: The capacity of the vehicle
 *       description: A model representing a vehicle with an ID, name, and capacity.
 */

export class Vehicle {
    private id: number;
    private name: string;
    private capacity: number;

    constructor(id: number, name: string, capacity: number) {
      this.id = id;
      this.name = name;
      this.capacity = capacity;
    }

    public getId(): number {
      return this.id;
    }

    public getName(): string {
      return this.name;
    }

    public getCapacity(): number {
      return this.capacity;
    }
  }
