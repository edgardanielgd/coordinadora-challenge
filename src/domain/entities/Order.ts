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
*           type: string
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
    private id: number;
    private senderId: number;
    private receiverId: number;
    private productCategory: string;
    private weightGrams: string;
    private targetAddress: string;
    private productDescription: string;
    private dimensionX: number;
    private dimensionY: number;
    private dimensionZ: number;
    private quantity: number;
    private status: string;
    private transporterId: number | null;
    private routeId: number | null;
    private sourceCityId: number;
    private targetCityId: number;
    private latitude: number | null;
    private longitude: number | null;
    private solvedAddress: string | null;
    private solvedCity: string | null;
    private assignedDate: Date | null;
    private expectedReachDate: Date | null;
    private actualReachDate: Date | null;
    private shortId: string;
    private vehicleId: number | null;

    constructor(
        id: number,
        senderId: number,
        receiverId: number,
        productCategory: string,
        weightGrams: string,
        targetAddress: string,
        productDescription: string,
        dimensionX: number,
        dimensionY: number,
        dimensionZ: number,
        quantity: number,
        status: string,
        transporterId: number | null,
        routeId: number | null,
        sourceCityId: number,
        targetCityId: number,
        latitude: number,
        longitude: number,
        solvedAddress: string,
        solvedCity: string,
        assignedDate: Date | null,
        expectedReachDate: Date | null,
        actualReachDate: Date | null,
        shortId: string,
        vehicleId: number | null
    ) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.productCategory = productCategory;
        this.weightGrams = weightGrams;
        this.targetAddress = targetAddress;
        this.productDescription = productDescription;
        this.dimensionX = dimensionX;
        this.dimensionY = dimensionY;
        this.dimensionZ = dimensionZ;
        this.quantity = quantity;
        this.status = status;
        this.transporterId = transporterId;
        this.routeId = routeId;
        this.sourceCityId = sourceCityId;
        this.targetCityId = targetCityId;
        this.latitude = latitude;
        this.longitude = longitude;
        this.solvedAddress = solvedAddress;
        this.solvedCity = solvedCity;
        this.assignedDate = assignedDate;
        this.expectedReachDate = expectedReachDate;
        this.actualReachDate = actualReachDate;
        this.shortId = shortId;
        this.vehicleId = vehicleId;
    }

    public getId(): number {
        return this.id;
    }

    public getSenderId(): number {
        return this.senderId;
    }

    public getReceiverId(): number {
        return this.receiverId;
    }

    public getProductCategory(): string {
        return this.productCategory;
    }

    public getWeightGrams(): string {
        return this.weightGrams;
    }

    public getTargetAddress(): string {
        return this.targetAddress;
    }

    public getProductDescription(): string {
        return this.productDescription;
    }

    public getDimensionX(): number {
        return this.dimensionX;
    }

    public getDimensionY(): number {
        return this.dimensionY;
    }

    public getDimensionZ(): number {
        return this.dimensionZ;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public getStatus(): string {
        return this.status;
    }

    public getTransporterId(): number | null {
        return this.transporterId;
    }

    public getRouteId(): number | null {
        return this.routeId;
    }

    public getSourceCityId(): number {
        return this.sourceCityId;
    }

    public getTargetCityId(): number {
        return this.targetCityId;
    }

    public getLatitude(): number | null {
        return this.latitude;
    }

    public getLongitude(): number | null {
        return this.longitude;
    }

    public getSolvedAddress(): string | null {
        return this.solvedAddress;
    }

    public getSolvedCity(): string | null {
        return this.solvedCity;
    }

    public getAssignedDate(): Date | null {
        return this.assignedDate;
    }

    public getExpectedReachDate(): Date | null {
        return this.expectedReachDate;
    }

    public getActualReachDate(): Date | null {
        return this.actualReachDate;
    }

    public getShortId(): string {
        return this.shortId;
    }

    public getVehicleId(): number | null {
        return this.vehicleId;
    }
}
