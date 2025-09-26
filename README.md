
# Social Network Backend

## Description
This repository provides a complete REST API for a social networking application.

## Technologies Used
- Spring boot
- Spring security
- JWT (Json Web Token)
- PostgreSQL

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
`DATABASE_USERNAME`
`DATABASE_PASSWORD`

`JWT_SECRET_ACCESS`
`JWT_SECRET_REFRESH`

`JWT_ISSUER`
`JWT_AUDIENC`

> 🔐 Note: Ensure your `JWT_SECRET_ACCESS` and `JWT_SECRET_REFRESH` values are at least 64 characters long when using the HS512 algorithm.

## License

[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)