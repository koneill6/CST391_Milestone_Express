export class orderDAO
{
    private id: number = -1;
    private customer_name: string = "";
    private cost: number = -1;
    private books: string = "";

    constructor(id:number, customer_name:string, cost:number, books:string)
    {
        this.id = id;
        this.customer_name = customer_name;
        this.cost = cost;
        this.books = books;
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(id: number) {
        this.id = id;
    }

    public get Customer_name(): string {
        return this.customer_name;
    }

    public set Customer_name(customer_name: string) {
        this.customer_name = customer_name;
    }

    public get Cost(): number {
        return this.cost;
    }

    public set Cost(cost: number) {
        this.cost = cost;
    }

    public get Books(): string {
        return this.books;
    }

    public set Books(books: string) {
        this.books = books;
    }
}