export class bookDAO
{
    private id: number = -1;
    private author: string = "";
    private title: string = "";
    private genre: string = "";
    private cost: number = 0;
    private stock: number = 0;

    constructor(id: number, author: string, title: string, genre: string, cost: number, stock: number)
    {
        this.id = id;
        this.author = author;
        this.title = title;
        this.genre = genre;
        this.cost = cost;
        this.stock = stock;
    }

    public get Id(): number {
        return this.id;
    }

    public set Id(id: number) {
        this.id = id;
    }

    public get Author(): string {
        return this.author;
    }

    public set Author(author: string) {
        this.author = author;
    }

    public get Title(): string {
        return this.title;
    }

    public set Title(title: string) {
        this.title = title;
    }

    public get Genre(): string {
        return this.genre;
    }

    public set Genre(genre: string) {
        this.genre = genre;
    }

    public get Cost(): number {
        return this.cost;
    }

    public set Cost(cost: number) {
        this.cost = cost;
    }

    public get Stock(): number {
        return this.stock;
    }
    
    public set Stock(stock: number) {
        this.stock = stock;
    }
}