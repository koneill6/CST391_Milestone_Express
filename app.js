const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const { dbConnector } = require('./lib/app/database/dbConnector.js');
const { orderDAO } = require('./lib/app/models/orderDAO');
const { bookDAO } = require('./lib/app/models/bookDAO');
const app = express();
const port = 3000
const dbHost = "localhost"
const dbPort = 3306;
const dbUsername = "root"
const dbPassword = "root"

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Bookstore Api',
            version: '1.0.0'
        }
    },
    apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * /books:
 *      get:
 *          description: Get all books
 *          responses:
 *              200:
 *                  description: Success, found books
 */
app.get('/books', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findAllBooks(function(books)
    {
        res.json(books);
    });
});

/**
 * @swagger
 * /books/id/{id}:
 *      get:
 *          description: Get all books by id
 *          parameters:
 *            - name: id
 *              description: Id of book
 *              in: path
 *              required: true
 *              type: integer
 *          responses:
 *              200:
 *                  description: Success, found books
 */
 app.get('/books/id/:id', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findBookById(req.params.id, function(book)
    {
        res.json(book);
    });
});

/**
 * @swagger
 * /books/author/{author}:
 *      get:
 *          description: Get all books by author
 *          parameters:
 *            - name: author
 *              description: Author of books
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success, found books
 */
 app.get('/books/author/:author', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findBooksByAuthor(req.params.author, function(books)
    {
        res.json(books);
    });
});

/**
 * @swagger
 * /books/genre/{genre}:
 *      get:
 *          description: Get all books by genre
 *          parameters:
 *            - name: genre
 *              description: Genre of books
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success, found books
 */
 app.get('/books/genre/:genre', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findBooksByGenre(req.params.genre, function(books)
    {
        res.json(books);
    });
});

/**
 * @swagger
 * /books/title/{title}:
 *      get:
 *          description: Get all books by title
 *          parameters:
 *            - name: title
 *              description: Title of books
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success, found books
 */
 app.get('/books/title/:title', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findBooksByTitle(req.params.title, function(books)
    {
        res.json(books);
    });
});

/**
 * @swagger
 * /books/addBook:
 *      post:
 *          description: Create new book
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: body
 *              name: New Book
 *              description: The book to create
 *              required: true
 *              type: object
 *          responses:
 *              201:
 *                  description: Book created
 */
app.post('/books/addBook', (req,res) => {
    let book = new bookDAO(-1, req.body.author, req.body.title, req.body.genre, req.body.cost, req.body.stock);
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.createBook(book, function(bookId)
    {
        if(bookId == -1)
            res.status(200).json({"error" : "Creating Book failed"})
        else
            res.status(200).json({"success" : "Creating Book passed with an Book ID of " + bookId});
    })
});

/**
 * @swagger
 * /books/updateBook:
 *      put:
 *          description: Update Book
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: body
 *              name: Update Book
 *              description: Update the book
 *              required: true
 *              type: object
 *          responses:
 *              201:
 *                  description: Book updated
 */
 app.put('/books/updateBook', (req,res) => {
    let book = new bookDAO(req.body.id, req.body.author, req.body.title, req.body.genre, req.body.cost, req.body.stock);
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.updateBook(book, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Updating Album passed but nothing was changed"})
        else
            res.status(200).json({"success" : "Updating Album passed and data was changed"});
    }); 
});

/**
 * @swagger
 *  /books/deleteBook/{id}:
 *      delete:
 *          description: Delete books by id
 *          parameters:
 *            - name: id
 *              description: Id of book to delete
 *              in: path
 *              required: true
 *              type: integer
 *          responses:
 *              200:
 *                  description: Success, deleted book
 */
 app.delete('/books/deleteBook/:id', (req,res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.deleteBookById(req.params.id, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Book failed"})
        else
            res.status(200).json({"success" : "Delete Book passed"})
    });
});

/**
 * @swagger
 * /orders:
 *      get:
 *          description: Get all orders
 *          responses:
 *              200:
 *                  description: Success, found orders
 */
 app.get('/orders', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findAllOrders(function(orders)
    {
        res.json(orders);
    });
});

/**
 * @swagger
 * /orders/id/{id}:
 *      get:
 *          description: Get all orders by id
 *          parameters:
 *            - name: id
 *              description: Id of order
 *              in: path
 *              required: true
 *              type: integer
 *          responses:
 *              200:
 *                  description: Success, found orders
 */
 app.get('/orders/id/:id', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findOrderById(req.params.id, function(orders)
    {
        res.json(orders);
    });
});

/**
 * @swagger
 * /orders/customer/{name}:
 *      get:
 *          description: Get all orders by customer name
 *          parameters:
 *            - name: name
 *              description: Name of customer
 *              in: path
 *              required: true
 *              type: string
 *          responses:
 *              200:
 *                  description: Success, found orders
 */
 app.get('/orders/customer/:name', (req, res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.findOrdersByCustomer(req.params.name, function(orders)
    {
        res.json(orders);
    });
});

/**
 * @swagger
 * /orders/addOrder:
 *      post:
 *          description: Create new order
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: body
 *              name: New order
 *              description: The order to create
 *              required: true
 *              type: object
 *          responses:
 *              201:
 *                  description: Order created
 */
 app.post('/orders/addOrder', (req,res) => {
    let order = new orderDAO(-1, req.body.customerName, req.body.cost, req.body.books);
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.createOrder(order, function(orderId)
    {
        if(orderId == -1)
            res.status(200).json({"error" : "Creating Order failed"})
        else
            res.status(200).json({"success" : "Creating Order passed with an Order ID of " + orderId});
    })
});

/**
 * @swagger
 * /orders/updateOrder:
 *      put:
 *          description: Update Order
 *          consumes:
 *            - application/json
 *          parameters:
 *            - in: body
 *              name: Update Order
 *              description: Update the order
 *              required: true
 *              type: object
 *          responses:
 *              201:
 *                  description: Order updated
 */
 app.put('/orders/updateOrder', (req,res) => {
    let order = new orderDAO(req.body.id, req.body.customerName, req.body.cost, req.body.books);
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.updateOrder(order, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Updating Order passed but nothing was changed"})
        else
            res.status(200).json({"success" : "Updating Order passed and data was changed"});
    }); 
});

/**
 * @swagger
 *  /orders/deleteOrder/{id}:
 *      delete:
 *          description: Delete orders by id
 *          parameters:
 *            - name: id
 *              description: Id of order to delete
 *              in: path
 *              required: true
 *              type: integer
 *          responses:
 *              200:
 *                  description: Success, deleted order
 */
 app.delete('/orders/deleteOrder/:id', (req,res) => {
    let dao = new dbConnector(dbHost, dbPort, dbUsername, dbPassword);
    dao.deleteOrderById(req.params.id, function(changes)
    {
        if(changes == 0)
            res.status(200).json({"error" : "Delete Order failed"})
        else
            res.status(200).json({"success" : "Delete Order passed"})
    });
});

app.listen(3000, () => console.log("listening on 3000"));