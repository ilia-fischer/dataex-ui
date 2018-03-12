import { User } from './user.model'

export class Dataset {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public classifications: string[],
        public provider: User /* OR just the user id */) {
    }

    /*
     TODO: either USER needs purchased datasets ...
     or DATASET needs the owner
     */

    get priceString() {
        return `$${this.price}`
    }
}
