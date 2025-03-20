export interface Transaction {
    id:string,
    userId: string | null;
    amount:string,
    reason:string,
    category:string,
<<<<<<< HEAD
    currentDate:string,
=======
    currentDate:Date;
>>>>>>> 512fc2b (Final submission before IV)
}
