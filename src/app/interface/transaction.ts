export interface Transaction {
    id:string,
    userId: string | null;
    amount:string,
    reason:string,
    category:string,
    currentDate:string,
}
