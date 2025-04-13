import { Transporter } from "../../domain/entities/Transporter";

export interface ITransporterRepository {

    findById( id : number ) : Promise<Transporter | null>;

}