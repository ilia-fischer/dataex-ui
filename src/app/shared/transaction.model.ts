export class Transaction {
    constructor(
        public datasetId: string,
        public date: Date,
        public consumer: {
            consumerId: string
        }){
    }

}
