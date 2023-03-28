CREATE TABLE UserData (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50),
    storeId INT
);

CREATE TABLE StoreData (
    name VARCHAR(50),
    uniqueStoreId INT
);

CREATE TABLE ProductData (
    id SERIAL PRIMARY KEY,
    title VARCHAR(250),
    description TEXT,
    imageUrl VARCHAR(250),
    storeId INT,
    price VARCHAR(250),
    quantity INT,
    category VARCHAR(250)
);
