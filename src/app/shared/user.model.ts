export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public roles: string[],
        public balance: number
        //Company, Anything else?
    ) {

    }
}
