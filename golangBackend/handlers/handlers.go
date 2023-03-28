package handlers

import (
	"github.com/PawelObrzut/e-commerce-platform-zon/golangBackend/connectPostgres"
	"github.com/gofiber/fiber/v2"
	"fmt"
)

func GetMainRoute(c *fiber.Ctx) error {
	return c.SendString("Hello there general Kenobi")
}

func GetAllProducts(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
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
		defer db.Close()
		return c.SendString("Hello, World 👋!!!!!!")
}