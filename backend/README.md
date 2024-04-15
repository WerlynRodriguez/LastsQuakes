# Backend section

> [!IMPORTANT]
> All commands must point to the project address in the terminal: '...ProjectRoute/LastsQuakes/backend'.

## Installation 
1. Run `bundle install` to install the dependencies.

## Before use
1. Create an `.env` file in the root of the backend project.
2. Include the environment variable needed for the database connection:
`BACKEND_DATABASE_PASSWORD = Your_password_here`

OR

1. Modify `backend/config/database.yml` file

> [!NOTE]
> You can also modify any other usage value in the development section.

## Custom tasks
```
rake earthquake_data:fetch
```
This task collects and stores in the database, the information provided by an external api. This task can be executed several times without duplicating data.

## Use
1. Execute `rails s`.
2. The main url should be: [Features](http://[::1]:3000//api/v1/features)
