import { IShortIdService } from '../../../src/application/services/IShortIdService'

export class MockShortIdService implements IShortIdService {

    public async generateShortId( ) : Promise<string> {
        return 'A123'
    }

}