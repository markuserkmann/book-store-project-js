const path = require('path')
const db = require(path.resolve(__dirname, '../util/db'))

class ProductController {
    constructor() {
        this.Products = []
        this.Loaded = false
    }

    async loadProducts() {
        try {
            const [rows, fields] = await db.query('SELECT * FROM Products');
            this.Products = rows
            this.Loaded = true
            return this.Products;
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    }

    async addProduct(dataFromClient) {
        console.log(dataFromClient.title);
        const values = [dataFromClient.title, dataFromClient.price, dataFromClient.description, dataFromClient.image_url];
        const sql = "INSERT INTO Products (TITLE, PRICE, description, url) VALUES (?, ?, ?, ?)";

        db.execute(sql, values, async (err, results) => {
            if (err) {
                console.error('Error adding product:', err);
                return;
            }

            const newProduct = {
                ID: results.insertId,
                TITLE: dataFromClient.title,
                PRICE: dataFromClient.price,
                description: dataFromClient.description,
                url: dataFromClient.image_url
            };

            this.Products.push(newProduct);

            if (!this.Loaded) {
                this.Loaded = true;
            }
        });
    }

    async FetchProducts(res) {
        if (this.Loaded) {
            console.log("Current products ", this.Products);
            res.render('shop', { data: this.Products });
            return;
        }

        try {
            const products = await this.loadProducts();
            res.render('shop', { data: products });
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
    async LoadAdminPage(res) {
        res.render('admin', { data: this.Products });
    }
    async UpdateProduct(res, dataFromClient) {
        try {
            const { ID, title, price, description, image_url } = dataFromClient;
    
            const updatedTitle = title !== undefined && title !== null ? title : null;
            const updatedPrice = price !== undefined && price !== null ? price : null;
            const updatedDescription = description !== undefined && description !== null ? description : null;
            const updatedUrl = image_url !== undefined && image_url !== null ? image_url : null;
    
            console.log("Prepared data for SQL:", {
                updatedTitle,
                updatedPrice,
                updatedDescription,
                updatedUrl,
                ID
            });
    
            const sql = "UPDATE Products SET TITLE = ?, PRICE = ?, description = ?, url = ? WHERE ID = ?";
            const values = [updatedTitle, updatedPrice, updatedDescription, updatedUrl, ID];
    
            const [results] = await db.execute(sql, values);
    
            const productIndex = this.Products.findIndex(p => p.ID === ID);
            if (productIndex !== -1) {
                this.Products[productIndex] = { ID, title: updatedTitle, price: updatedPrice, description: updatedDescription, url: updatedUrl };
            }

        } catch (err) {
            console.error('Error updating product:', err);
            res.status(500).send('Error updating product');
        }
        this.Loaded = false
        this.loadProducts()
        res.header("Refresh", "1");
    }

}

module.exports = new ProductController();