package database

import (
	"fmt"
	"os"
	"database/sql"
	"strconv"
)

func ConnectPostgres() (*sql.DB, error) {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	portStr := os.Getenv("DB_PORT")

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return nil, fmt.Errorf("failed to convert port to integer: %v", err)
	}

	dataSourceName := fmt.Sprintf("host=%s port=%d user=%s dbname=%s password=%s", 
		host, port, dbUser, dbName, dbPassword,
	)

	db, err := sql.Open("postgres", dataSourceName)
	if err != nil {
		fmt.Printf("Could not open postgresql database: %v", err)
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		fmt.Printf("Could not open Ping database: %v", err)
		panic(err)
	}
	return db, nil
}