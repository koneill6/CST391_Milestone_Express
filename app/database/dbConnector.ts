import { bookDAO } from "../models/bookDAO";
import { orderDAO } from "../models/orderDAO";
import * as mysql from "mysql";
import * as util from "util";

export class dbConnector
{
    private host:string = "";
    private port:number = 3306;
    private username:string = "";
    private password:string = "";
    private schema:string = "bookstore";
    private pool = this.initDbConnection();
    
    constructor(host:string, port:number, username:string, password:string)
    {
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password;
        this.pool = this.initDbConnection();
    }

    private initDbConnection():any
    {
        return mysql.createPool({host: this.host, port: this.port, user: this.username, password: this.password, database: this.schema, connectionLimit: 10});
    }

    public findAllBooks(callback: any)
    {
        let books:bookDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err
 
            connection.query('SELECT * FROM books', function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    books.push(new bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
                }
    
                callback(books);
            });
    
        });
    }

    public findBookById(id:number, callback: any)
    {
        let book:bookDAO;
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err

            connection.query('SELECT * FROM books WHERE ID = '+id, function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    book = new bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK);
                }
    
                callback(book);
            });
    
        });
    }

    public findBooksByAuthor(author:string, callback: any)
    {
        let books:bookDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err

            connection.query("SELECT * FROM books WHERE AUTHOR LIKE '%"+author+"%'", function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    books.push(new bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
                }
    
                callback(books);
            });
    
        });
    } 

    public findBooksByGenre(genre:string, callback: any)
    {
        let books:bookDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err

            connection.query("SELECT * FROM books WHERE GENRE LIKE '%"+genre+"%'", function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    books.push(new bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
                }
    
                callback(books);
            });
    
        });
    }

    public findBooksByTitle(title:string, callback: any)
    {
        let books:bookDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err
    
            connection.query("SELECT * FROM books WHERE TITLE LIKE '%"+title+"%'", function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    books.push(new bookDAO(rows[x].ID, rows[x].AUTHOR, rows[x].TITLE, rows[x].GENRE, rows[x].COST, rows[x].STOCK));
                }
    
                callback(books);
            });
    
        });
    }

    public createBook(b:bookDAO, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO books (AUTHOR, TITLE, GENRE, COST, STOCK) VALUES(?,?,?,?,?)', [b.Author, b.Title, b.Genre, b.Cost, b.Stock]);
            if(result1.affectedRows != 1){
                callback(-1);
            }
            callback(result1.insertId);
        });
    }

    public updateBook(b:bookDAO, callback: any)
    {
            this.pool.getConnection(async function(err:any, connection:any)
            {
                connection.release();

            if (err) throw err;

                let changes = 0;
                connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE books SET AUTHOR=?, TITLE=?,  GENRE=?, COST=?, STOCK=? WHERE ID=?', [b.Author, b.Title, b.Genre, b.Cost, b.Stock, b.Id]);
            if(result1.changedRows != 0)
                ++changes;

            callback(changes);
            });
    }

    public deleteBookById(id:number, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM books WHERE ID='+id);
            changes = changes + result1.affectedRows;

            callback(changes);
        });
    }

    public findAllOrders(callback: any)
    {
        let orders:orderDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err

            connection.query('SELECT * FROM orders', function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    orders.push(new orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS));
                }
    
                callback(orders);
            });
    
        });
    }

    public findOrderById(id:number, callback: any)
    {
        let order:orderDAO;
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err

            connection.query('SELECT * FROM orders WHERE ID = '+id, function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    order = new orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS);
                }
    
                callback(order);
            });
    
        });
    }

    public findOrdersByCustomer(customer:string, callback: any)
    {
        let orders:orderDAO[] = [];
        
        this.pool.getConnection(function(err:any, connection:any)
        {
            if (err) throw err
    
            connection.query("SELECT * FROM orders WHERE CUSTOMER_NAME LIKE '%"+customer+"%'", function (err:any, rows:any, fields:any) 
            {
                connection.release();

                if (err) throw err

                for(let x=0;x < rows.length;++x)
                {
                    orders.push(new orderDAO(rows[x].ID, rows[x].CUSTOMER_NAME, rows[x].COST, rows[x].BOOKS));
                }
    
                callback(orders);
            });
    
        });
    }

    public createOrder(o:orderDAO, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('INSERT INTO orders (CUSTOMER_NAME, COST, BOOKS) VALUES(?,?,?)', [o.Customer_name, o.Cost, o.Books]);
            if(result1.affectedRows != 1){
                callback(-1);
            }
            callback(result1.insertId);
        });
    }

    public updateOrder(o:orderDAO, callback: any)
    {
            this.pool.getConnection(async function(err:any, connection:any)
            {
                connection.release();

            if (err) throw err;

                let changes = 0;
                connection.query = util.promisify(connection.query);
            let result1 = await connection.query('UPDATE orders SET CUSTOMER_NAME=?, COST=?, BOOKS=? WHERE ID=?', [o.Customer_name, o.Cost, o.Books, o.Id]);
            if(result1.changedRows != 0)
                ++changes;

            callback(changes);
            });
    }

    public deleteOrderById(id:number, callback: any)
    {
        this.pool.getConnection(async function(err:any, connection:any)
        {
            connection.release();

            if (err) throw err;

            let changes = 0;
            connection.query = util.promisify(connection.query);
            let result1 = await connection.query('DELETE FROM orders WHERE ID='+id);
            changes = changes + result1.affectedRows;

            callback(changes);
        });
    }
}