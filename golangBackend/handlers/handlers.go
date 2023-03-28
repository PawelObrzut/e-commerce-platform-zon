package handlers

import (
	"github.com/PawelObrzut/e-commerce-platform-zon/golangBackend/connectPostgres"
	"github.com/gofiber/fiber/v2"
	"fmt"
)

type Product struct {
	Id								int			`json:"id"`
	Title							string	`json:"title"`
	Description				string	`json:"description"`
	Imageurl					string	`json:"imageUrl"`
	Storeid						int			`json:"storeId"`
	Price							string	`json:"price"`
	Quantity					int			`json:"quantity"`
	Category					string	`json:"category"`
}

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

	products := []Product{}

	for rows.Next() {
		var product Product
		err := rows.Scan(&product.Id, &product.Title, &product.Description, &product.Imageurl, &product.Storeid, &product.Price, &product.Quantity, &product.Category); 
		if err != nil {
			fmt.Printf("Could not scan ProductData rows: %v", err)
			panic(err)
		}
		products = append(products, product)
	}
	defer db.Close()

	return c.JSON(products)
}