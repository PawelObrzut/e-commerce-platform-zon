package main

import (
	"fmt"
	"github.com/PawelObrzut/e-commerce-platform-zon/golangBackend/handlers"

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

	app.Get("/", handlers.GetMainRoute)
	app.Get("/api/product", handlers.GetAllProducts)

	app.Listen(":8000")
}