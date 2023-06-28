package database

import (
	"fmt"
	"os"
	"database/sql"
)

func ConnectPostgres() (*sql.DB, error) {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	host := os.Getenv("HOST")

	dataSourceName := fmt.Sprintf("host=%s port=5432 user=%s dbname=%s password=%s", 
		host, dbUser, dbName, dbPassword,
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