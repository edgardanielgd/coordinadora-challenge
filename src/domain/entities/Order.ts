/**
* @openapi
* components:
*   schemas:
*     Order:
*       type: object
*       required:
*         - id
*         - senderId
*         - receiverId
*         - productCategory
*         - weightGrams
*         - targetAddress
*         - productDescription
*         - dimensionX
*         - dimensionY
*         - dimensionZ
*         - status
*         - sourceCityId
*         - targetCityId
*         - latitude
*         - longitude
*         - solvedAddress
*         - solvedCity
*       properties:
*         id:
*           type: integer
*         senderId:
*           type: integer
*         receiverId:
*           type: integer
*         productCategory:
*           type: string
*         weightGrams:
*           type: number
*         targetAddress:
*           type: string
*         productDescription:
*           type: string
*         dimensionX:
*           type: number
*         dimensionY:
*           type: number
*         dimensionZ:
*           type: number
*         quantity:
*           type: number
*         status:
*           type: string
*         transporterId:
*           type: integer
*           nullable: true
*         routeId:
*           type: integer
*           nullable: true
*         sourceCityId:
*           type: integer
*         targetCityId:
*           type: integer
*         latitude:
*           type: number
*         longitude:
*           type: number
*         solvedAddress:
*           type: string
*         solvedCity:
*           type: string
*         assignedDate:
*           type: string
*           format: date-time
*         expectedReachDate:
*           type: string
*           format: date-time
*         actualReachDate:
*           type: string
*           format: date-time
*         shortId:
*           type: string
*       description: An order model that includes logistics, location, and transportation data
*/
export class Order {
    constructor(
      private id: number,
      private senderId: number,
      private receiverId: number,
      private productCategory: string,
      private weightGrams: number,
      private targetAddress: string,
      private productDescription: string,
      private dimensionX: number,
      private dimensionY: number,
      private dimensionZ: number,
      private quantity: number,
      private status: string,
      private transporterId: number | null,
      private routeId: number | null,
      private sourceCityId: number,
      private targetCityId: number,
      private latitude: number | null,
      private longitude: number | null,
      private solvedAddress: string | null,
      private solvedCity: string | null,
      private assignedDate: Date | null,
      private expectedReachDate: Date | null,
      private actualReachDate: Date | null,
      private shortId: string,
      private vehicleId: number | null
    ) {}

    public getId() { return this.id; }
    public getSenderId() { return this.senderId; }
    public getReceiverId() { return this.receiverId; }
    public getProductCategory() { return this.productCategory; }
    public getWeightGrams() { return this.weightGrams; }
    public getTargetAddress() { return this.targetAddress; }
    public getProductDescription() { return this.productDescription; }
    public getDimensionX() { return this.dimensionX; }
    public getDimensionY() { return this.dimensionY; }
    public getDimensionZ() { return this.dimensionZ; }
    public getQuantity() { return this.quantity; }
    public getStatus() { return this.status; }
    public getTransporterId() { return this.transporterId; }
    public getRouteId() { return this.routeId; }
    public getSourceCityId() { return this.sourceCityId; }
    public getTargetCityId() { return this.targetCityId; }
    public getLatitude() { return this.latitude; }
    public getLongitude() { return this.longitude; }
    public getSolvedAddress() { return this.solvedAddress; }
    public getSolvedCity() { return this.solvedCity; }
    public getAssignedDate() { return this.assignedDate; }
    public getExpectedReachDate() { return this.expectedReachDate; }
    public getActualReachDate() { return this.actualReachDate; }
    public getShortId() { return this.shortId; }
    public getVehicleId() { return this.vehicleId; }

    public setSenderId(val: number) { this.senderId = val; }
    public setReceiverId(val: number) { this.receiverId = val; }
    public setProductCategory(val: string) { this.productCategory = val; }
    public setWeightGrams(val: number) { this.weightGrams = val; }
    public setTargetAddress(val: string) { this.targetAddress = val; }
    public setProductDescription(val: string) { this.productDescription = val; }
    public setDimensionX(val: number) { this.dimensionX = val; }
    public setDimensionY(val: number) { this.dimensionY = val; }
    public setDimensionZ(val: number) { this.dimensionZ = val; }
    public setQuantity(val: number) { this.quantity = val; }
    public setStatus(val: string) { this.status = val; }
    public setTransporterId(val: number | null) { this.transporterId = val; }
    public setRouteId(val: number | null) { this.routeId = val; }
    public setSourceCityId(val: number) { this.sourceCityId = val; }
    public setTargetCityId(val: number) { this.targetCityId = val; }
    public setLatitude(val: number | null) { this.latitude = val; }
    public setLongitude(val: number | null) { this.longitude = val; }
    public setSolvedAddress(val: string | null) { this.solvedAddress = val; }
    public setSolvedCity(val: string | null) { this.solvedCity = val; }
    public setAssignedDate(val: Date | null) { this.assignedDate = val; }
    public setExpectedReachDate(val: Date | null) { this.expectedReachDate = val; }
    public setActualReachDate(val: Date | null) { this.actualReachDate = val; }
    public setShortId(val: string) { this.shortId = val; }
    public setVehicleId(val: number | null) { this.vehicleId = val; }
  }
