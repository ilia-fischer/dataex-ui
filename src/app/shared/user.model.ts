export class User {
    constructor(
        public id: string,
        public name: string,
        public roles: string[]
        //Company, Anything else?
    ) {

    }

    /*
     TODO: either USER needs purchased datasets ...
     or DATASET needs the owner
     */
}
