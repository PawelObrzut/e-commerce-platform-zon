package main

import (
	"os"
	"fmt"
	"database/sql"
	
	
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main (){
	err := godotenv.Load(".env")
	if err != nil {
			fmt.Println("Error loading .env file")
	}

	app := fiber.New()

	app.Get("/api/product", func(c *fiber.Ctx) error {
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
		defer db.Close()

		err = db.Ping()
		if err != nil {
			fmt.Printf("Could not open Ping database: %v", err)
			panic(err)
		}


		rows, err := db.Query("SELECT * FROM ProductData")
		if err != nil {
			fmt.Printf("Could not query ProductData: %v", err)
			panic(err)
		}


		for rows.Next() {
			var id int
			var title string
			var description string
			var imageurl string
			var storeid int
			var price string
			var quantity int
			var category string

			err := rows.Scan(&id, &title, &description, &imageurl, &storeid, &price, &quantity, &category); 
			if err != nil {
				return nil
			}

			fmt.Println(id, title, description, imageurl, storeid, price, quantity, category + "\n");

		}

		return c.SendString("Hello, World 👋!")
	})

	app.Listen(":8000")
}