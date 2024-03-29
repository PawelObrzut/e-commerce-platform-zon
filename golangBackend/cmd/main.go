package main

import (
	"fmt"
	"os"
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
	
	app.Use(cors.New(cors.Config{
    AllowOrigins: "https://tradezon-node.onrender.com, *",
	}))
	
	app.Get("/", handlers.GetMainRoute)
	
	app.Get("/api/product", handlers.GetAllProducts)
	app.Get("/api/product/:id", handlers.GetOneProduct)
	app.Post("/api/product", handlers.PostNewProduct)
	app.Delete("/api/product/:id", handlers.DeleteOneProduct)
	app.Patch("/api/product/:id", handlers.PatchOneProduct)

	app.Get("/api/user", handlers.GetAllUsers)
	app.Post("/api/user", handlers.PostNewUser)
	app.Post("/api/user/saveRefreshToken", handlers.SaveUsersRefreshToken)
	app.Get("/api/user/token/:refreshToken", handlers.GetRefreshToken)
	app.Delete("/api/user/token/:refreshToken", handlers.DeleteRefreshToken)

	app.Get("/api/store", handlers.GetAllStores)
	app.Get("/api/store/:id", handlers.GetOneStore)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	app.Listen(":" + port)
}