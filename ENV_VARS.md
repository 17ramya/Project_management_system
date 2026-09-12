# Environment Variable Documentation

The backend of TaskNexus requires specific environment variables to connect to the database and secure the API.

## Configuration Steps

1. Navigate to the `backend` directory.
2. Create a new file named exactly `.env`.
3. Add the following variables to the file:

```env
# Database Connection String
# IMPORTANT: This URL points Prisma to your local MySQL instance. 
# If your MySQL root password contains special characters (like '#', '@', '!'), 
# they MUST be properly URL-encoded. For example, '#' becomes '%23'.
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME
DATABASE_URL="mysql://root:YOUR_URL_ENCODED_PASSWORD@localhost:3306/pms"

# JSON Web Token Secret
# This is the secret key used to sign and verify JWT authentication tokens.
# In a production environment, this should be a long, cryptographically secure random string.
JWT_SECRET="your_super_secret_jwt_key"

# Application Port (Optional)
# The port that the Node.js/Express backend server will listen on. Defaults to 5000 if omitted.
PORT=5000
```

## Troubleshooting
- If your backend crashes immediately on startup with a database parsing error, double-check that your `DATABASE_URL` password is URL-encoded. 
- Ensure that the `.env` file is placed inside the `backend` folder, **not** the root folder.
