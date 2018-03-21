import { User } from './user.model'

export class Dataset {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public price: number,
        public format: string,
        public url: string,
        public notes: string,
        public categories: string[],
        public provider: User /* OR just the user id */) {
    }

    /*
     TODO: either USER needs purchased datasets ...
     or DATASET needs the owner
     */


}
