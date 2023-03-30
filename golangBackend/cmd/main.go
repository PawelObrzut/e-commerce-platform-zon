package main

import (
	"fmt"
	"github.com/PawelObrzut/e-commerce-platform-zon/golangBackend/handlers"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main (){
	err := godotenv.Load(".env")
	if err != nil {
			fmt.Println("Error loading .env file")
	}

	app := fiber.New()
	app.Use(cors.New())
	
	app.Get("/", handlers.GetMainRoute)
	
	app.Get("/api/product", handlers.GetAllProducts)
	app.Get("/api/product/:id", handlers.GetOneProduct)

	app.Get("/api/user", handlers.GetAllUsers)
	app.Post("/api/user", handlers.PostNewUser)

	app.Get("/api/store", handlers.GetAllStores)
	app.Get("/api/store/:id", handlers.GetOneStore)


	app.Listen(":8000")
}