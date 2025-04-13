/**
 * @openapi
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *         name:
 *           type: string
 *       description: Represents a route through which deliveries or transportation is made.
 */

export class Route {
    private id: number;
    private name: string;

    constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
    }

    public getId(): number {
      return this.id;
    }

    public getName(): string {
      return this.name;
    }
  }
