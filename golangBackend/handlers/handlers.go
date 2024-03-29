package handlers

import (
	"github.com/PawelObrzut/e-commerce-platform-zon/golangBackend/connectPostgres"
	"github.com/gofiber/fiber/v2"
	"fmt"
	"encoding/json"
)

type Product struct {
	Id		int	`json:"id"`
	Title		string	`json:"title"`
	Description	string	`json:"description"`
	Imageurl	string	`json:"imageUrl"`
	Storeid		int	`json:"storeId"`
	Price		string	`json:"price"`
	Quantity	*int	`json:"quantity"`
	Category	string	`json:"category"`
}

type User struct {
	Id 		int	`json:"id"`
	Email		string	`json:"email"`
	Password	string	`json:"password"`
	Role		string	`json:"role"`
	StoreId		int	`json:"storeId"`
	StoreName	string	`json:"storeName"`
}

type Store struct {
	Name	string	`json:"name"`
	Id	int	`json:"storeId"`
}

type UserRefreshToken struct {
	ID    int    `json:"id"`
	Token string `json:"token"`
}

func GetMainRoute(c *fiber.Ctx) error {
	return c.SendString("Hello there! General Kenobi.")
}

func GetAllProducts(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

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

	return c.JSON(fiber.Map{
		"message": "success",
		"data": products,
	})
}

func GetOneProduct(c *fiber.Ctx) error {
	id := c.Params("id")

	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM ProductData WHERE id=$1", id)
	if err != nil {
		fmt.Printf("Could not query ProductData: %v", err)
		panic(err)
	}

	var product Product

	for rows.Next() {
		err := rows.Scan(&product.Id, &product.Title, &product.Description, &product.Imageurl, &product.Storeid, &product.Price, &product.Quantity, &product.Category); 
		if err != nil {
			fmt.Printf("Could not scan ProductData rows: %v", err)
			panic(err)
		}
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"data": product,
	})
}

func PostNewProduct(c *fiber.Ctx) error {
	product := new(Product)

	if err := c.BodyParser(product); err != nil {
		return err
	}

	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	var id int
	sqlStatement := `
		INSERT INTO ProductData (title, description, imageurl, storeid, price, quantity, category)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id
		`
	err = db.QueryRow(sqlStatement, product.Title, product.Description, product.Imageurl, product.Storeid, product.Price, product.Quantity, product.Category).Scan(&id)
	
	if err != nil {
		panic(err)
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"id": id,
	})
}

func DeleteOneProduct(c *fiber.Ctx) error {
	id := c.Params("id")

	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	result, err := db.Exec("DELETE FROM Productdata WHERE id=$1", id)
	if err != nil {
		panic(err)
	}

	rowCount, err := result.RowsAffected()
	if err != nil {
		panic(err)
	}
	if rowCount != 1 {
		panic("Expected to delete 1 row")
	}

	return c.SendString("Product deleted")
}

func PatchOneProduct(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	id := c.Params("id")

	product := new(Product)
	if err := c.BodyParser(product); err != nil {
		return err
	}

	sqlStatement := "UPDATE productdata SET"

	if product != nil && product.Quantity != nil {
		sqlStatement += fmt.Sprintf(" quantity = %d,", *product.Quantity)
	}

	if product != nil && product.Price != "" {
		sqlStatement += fmt.Sprintf(" price = '%s',", product.Price)
	}

	sqlStatement = sqlStatement[:len(sqlStatement)-1]
	sqlStatement += fmt.Sprintf(" WHERE id = %s", id)

  _, err = db.Exec(sqlStatement)
  if err != nil {
   panic(err)
  }

	return c.SendString("updated")
}

func GetAllUsers(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM Userdata")
	if err != nil {
		fmt.Printf("Could not query Userdata: %v", err)
		panic(err)
	}

	users := []User{}

	for rows.Next() {
		var user User
		err := rows.Scan(&user.Id, &user.Email, &user.Password, &user.Role, &user.StoreId)
		if err != nil {
			fmt.Printf("Could not scan UserData rows: %v", err)
			panic(err)
		}
		users = append(users, user)
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"data": users,
	})
}

func PostNewUser(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		return err
	}

	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	if user.Role == "admin" {
		var id int
		err = db.QueryRow(`
			INSERT INTO storedata (name)
			VALUES ($1)
			RETURNING id
			`, user.StoreName).Scan(&id)
		if err != nil {
			panic(err)
			}

		_, err = db.Exec(`
			INSERT INTO UserData (email, password, role, storeid)
			VALUES ($1, $2, $3, $4)
			`, user.Email, user.Password, user.Role, id)
		if err != nil {
		 panic(err)
		}
	} else {
		_, err = db.Exec(`
			INSERT INTO UserData (email, password, role, storeid)
			VALUES ($1, $2, $3, $4)
			`, user.Email, user.Password, user.Role, 0)
		if err != nil {
		 panic(err)
		}
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"data": user,
	})
}

func SaveUsersRefreshToken(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	var userRefreshToken UserRefreshToken
	
	if err := json.Unmarshal(c.Body(), &userRefreshToken); err != nil {
		fmt.Printf("Failed to parse request body: %v", err)
		return c.SendStatus(fiber.StatusBadRequest)
	}

	sqlStatement := "INSERT INTO RefreshTokens (userId, refreshToken) VALUES ($1, $2)"

	result, err := db.Exec(sqlStatement, userRefreshToken.ID, userRefreshToken.Token)
	if err != nil {
		panic(err)
	}

	rowCount, err := result.RowsAffected()
	if err != nil {
		panic(err)
	}
	if rowCount != 1 {
		panic("Expected to insert 1 row")
	}

	return c.SendString("Refresh Token Saved")
}

func GetRefreshToken(c *fiber.Ctx) error {
	refreshToken := c.Params("refreshToken")
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	var result bool

	row, err := db.Query("SELECT EXISTS(SELECT 1 FROM RefreshTokens WHERE refreshToken = $1)", refreshToken)
	if err != nil {
		fmt.Printf("Could not query RefreshTokens: %v", err)
		panic(err)
	}

	for row.Next() {
		err := row.Scan(&result)
		if err != nil {
			fmt.Printf("Could not scan RefreshTokens row: %v", err)
			panic(err)
		}
	}

	return c.JSON(result)
}

func DeleteRefreshToken(c *fiber.Ctx) error {
	refreshToken := c.Params("refreshToken")
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	sqlStatement := "DELETE FROM RefreshTokens WHERE refreshtoken = ($1)"

	result, err := db.Exec(sqlStatement, refreshToken)
	if err != nil {
		panic(err)
	}

	rowCount, err := result.RowsAffected()
	if err != nil {
		panic(err)
	}
	if rowCount != 1 {
		panic("Expected to delete 1 row")
	}

	return c.SendString("Refresh Token Deleted")
}

func GetAllStores(c *fiber.Ctx) error {
	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM StoreData")
	if err != nil {
		fmt.Printf("Could not query Storedata: %v", err)
		panic(err)
	}
	stores := []Store{}
	for rows.Next() {
		var store Store
		err := rows.Scan(&store.Id, &store.Name)
		if err != nil {
			fmt.Printf("Could not scan Storedata rows: %v", err)
			panic(err)
		}
		stores = append(stores, store)
	}

	return c.JSON(fiber.Map{
		"message": "success",
		"data": stores,
	})
}

func GetOneStore(c *fiber.Ctx) error {
	id := c.Params("id")

	db, err := database.ConnectPostgres()
	if err != nil {
		fmt.Printf("Could not connect to db: %v", err)
		panic(err)
	}
	defer db.Close()

	rows, err := db.Query("SELECT * FROM StoreData WHERE Id=$1", id)
	if err != nil {
		fmt.Printf("Could not query StoreData: %v", err)
		panic(err)
	}

	var store Store

	for rows.Next() {
		err := rows.Scan(&store.Id, &store.Name); 
		if err != nil {
			fmt.Printf("Could not scan StoreData rows: %v", err)
			panic(err)
		}
	}
	return c.JSON(fiber.Map{
		"message": "success",
		"data": store,
	})
}
