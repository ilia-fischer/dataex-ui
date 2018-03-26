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
        public isConsumedByCurrentUser: boolean,
        public isProvidedByCurrentUser: boolean,
        public publicUrl: string,
        public consumers: any[] = [],
        public provider: User /* OR just the user id */) {
    }

}
