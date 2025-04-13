import { nanoid } from 'nanoid'
import { IShortIdService } from '../../application/services/IShortIdService'

export class ShortIdService implements IShortIdService {

    public async generateShortId( ) : Promise<string> {
        return nanoid(10)
    }

}