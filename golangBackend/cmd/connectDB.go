package main

import (
	"os"
	"database/sql"
	"fmt"
)

func ConnectDB() (*sql.DB, error) {
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	dataSourceName := fmt.Sprintf("host=localhost port=5432 sslmode=disable user=%s dbname=%s password=%s",
		dbUser, dbName, dbPassword,
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