const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require("bcrypt");
const Stores = require('./mockData/Store_Mock_data.json');
const Products = require('./mockData/Products_Mock_data.json');
const Users = require('./mockData/User_Mock_data.json');

const pool = new Pool({
	user: proces.env.DB_USER,
	password: proces.env.DB_PASSWORD,
	host: proces.env.DB_HOST,
	database: proces.env.DB_NAME,
	port: proces.env.DB_PORT,
	ssl: {
		rejectUnauthorized: false
	}
});

(async () => {
  const client = await pool.connect()
  try {
    for (let i = 0; i < Stores.length; i ++) {
      const store = Stores[i];
      client.query('INSERT INTO StoreData (name) VALUES ($1)', [store.name]);
    }
    console.log('store data ready')

    for (let i = 0; i < Users.length; i ++) {
      const user = Users[i];
      const hashedPassword = bcrypt.hashSync(user.password, 10);
      client.query('INSERT INTO UserData (email, password, role, storeid) VALUES ($1, $2, $3, $4)', [user.email, hashedPassword, user.role, user.uniqueStoreId]);
      console.log(i, hashedPassword);
    }
    console.log('user data ready');

    for (let i = 0; i < Products.length; i ++) {
      const product = Products[i];
      client.query('INSERT INTO ProductData (title, description, imageUrl, storeId, price, quantity, category) VALUES ($1, $2, $3, $4, $5, $6, $7)', [product.title, product.description, product.imageUrl, product.storeId, product.price, product.quantity, product.category]);
      console.log(product.title, i);
    }
    console.log('product data ready');

  } catch (err) {
    console.log(err.stack)
    console.log('error!')
  } finally {
    console.log('finished')
    // client.release();
    pool.end();
  }
})();
