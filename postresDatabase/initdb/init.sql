DROP TABLE IF EXISTS RefreshTokens;
DROP TABLE IF EXISTS ProductData;
DROP TABLE IF EXISTS StoreData;
DROP TABLE IF EXISTS UserData;

CREATE TABLE UserData (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100),
    role VARCHAR(50),
    storeId INT
);

CREATE TABLE StoreData (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
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

CREATE TABLE RefreshTokens (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES UserData(id),
    refreshToken VARCHAR(250)
)