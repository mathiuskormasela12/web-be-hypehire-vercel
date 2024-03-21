# Hype Hire Book Store

This is a RESTfull API for Hype Hire Book Store that is built on top Express js + Typescript

## Installation 

- Make sure you had clone this repo
- Copy environment from `.env.example` to `.env`
- Configure your `.env` file according to your PostgreSQL credentials
- Open your terminal in this project and run 

	```bash
	npm install
	```

## How To Run This RESTful API

- Run On Development

	```bash
	npm start
	```

- Run On Production

	```bash
	npm run build
	npm run start:prod
	```

## API SPECS

- POST `/api/v1/auth/register` (Register new User)

	Request Body

	```
	{
		"email": "your email",
		"password": "your password (should include upper-case letter, lower-case-letter, number and symbol)",
    "repeatPassword": "your repeatPassword  (should include upper-case letter, lower-case-letter, number and symbol)"
	}
	```

- POST `/api/v1/auth/login` (Login User)

	Request Body

	```
	{
		"email": "your email",
		"password": "your password (should include upper-case letter, lower-case-letter, number and symbol)"
	}
	```

- POST `/api/v1/auth/token` (Create an Access Token)

	Request Body

	```
	{
		"refreshToken": "your refresh token"
	}
	```

- POST `/api/v1/books` (Insert a new books)

	Request Body

	```
	{
		"title": "your book title",
		"writer": "your book writer"
		"price": "your book price",
    "tagId": "your tagId"
	}
	```

- GET `/api/v1/books` (Get All Books)

- POST `/api/v1/books/tags` (Create a tag)

	Request Body

	```
	{
		"name": "your tag name (example Sci-Fi)"
	}
	```

- POST `/api/v1/order` (To order a book)

	Request Body

	```
	{
		"status": "PENDING",
		"bookId": "your book id"
	}
	```

- PUT `/api/v1/order/:id` (To pay book on list of buy)

- PUT `/api/v1/order/cancel/:id` (To cancel buying book on list of buy)

- GET `/api/v1/order/:status` (To get list of buy or purchased book)

## License
[MIT](https://choosealicense.com/licenses/mit/)