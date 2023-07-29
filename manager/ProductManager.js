import fs from 'fs'

export default class ProductManager{

    constructor(path) {
        this.path = path;
    };

    addProduct = async(product) => {
        try {
            const products = await this.getProducts();
            const codeRepetido = products.find(p => p.code == product.code);

            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
                return console.log('complete todo');
            };
            if(codeRepetido) {
                return console.log('El codigo ingresado ya exite');
            };

            let id;

            if (products.length == 0) {
                id = 1
            }else {
                id = products[products.length -1].id + 1
            }

            products.push({
                ...product,
                id
            });

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

            return products
        } catch (err){
            console.log(err);
        };
    }

    getProducts = async() => {
        try {
            if(fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path,'utf-8');
                console.log(data);
                const parseData = JSON.parse(data);

                return parseData;
            }else {
                return [];
            };
        }catch (err){
            console.log(err);
        };
    };

    getProductsById = async(id) => {
        try{
            let resultado = await this.getProducts();
            let product = resultado.find(p => p.id == id);

            if(product) {
                return console.log(product);
            } else {
                return console.error("Not Found");
            };
        }catch (err) {
            console.log(err);
        };
    };

    updateProduct = async (product) => {
        try{

            const products = await this.getProducts();
            const productToUpdate = products.find( p => p.id == product.id);

            if(!productToUpdate) {
                return console.log(`can't finde the product with id: ${product.id}`);
            };

            const indexOfProduct = products.findIndex( p => p.id == product.id);

            products[indexOfProduct] = {
                ...productToUpdate,
                ...product
            };

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            
            return products[indexOfProduct];
        }catch (err) {
            console.log(err);
        };
    };

    deleteProduct = async(id) => {
        try{
            const products = await this.getProducts();
            const indice = products.findIndex( p => p.id === id);

            if(indice < 0) {
                return console.log(`can't finde the product eith id: ${id}`);
            };

            products.splice(indice, 1);
            await fs.promises.writeFile(thus.path, JSON.stringify(products, null, '\t'));

            return products;

        }catch(err) {
            console.log(err);
        };
    };
};