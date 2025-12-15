✅​ ❌ ​📚​

# 📚 Welcome to my first API REST with Node.js

## About the project

This project consists of a robust RESTful API developed using `Express.js` and `MongoDB`. Its primary objective is to facilitate user registration and enable users to curate and manage a personalized collection of favorite books.

The system implements a full `CRUD` (Create, Read, Update, Delete) architecture, ensuring data persistence and integrity. It also features a secure authentication layer to protect user data and endpoints.

## 🔨 Tech Stack & Libraries

- Runtime: Node.js with nodemon to expedite development
- Framework: Express.js
- Database: MongoDB managed from MongoAtlas
- Authentication: JWT
- Password hashing: bcrypt
- Cloud storage: cloudinary

## 💻 Installation, Setup & Run

### 1 - Clone repository

```bash
git clone https://github.com/matascon/proyecto-backend.git
cd proyecto-backend
```

### 2 - Install dependencies

```bash
npm install
```

### 3 - Modify .env

To run this project locally, you must modify .env file in the root directory and define the necessary environment variables with your own credentials.

### 4 - Run locally

To start the server locally, execute the following command in your terminal:

```bash
npm run dev
```

## Endpoints

The API is accessible via the following base route. All resource endpoints (Users, Books, etc.) will extend from this path:

```bash
http://localhost:3000/api
```

Example:

```bash
http://localhost:3000/api/user/getAllUsers
```

## User endpoints

### GET /user/getUser/:id

Retrieves the profile information of a specific user.

- **Authorization:** Protected (Requires a valid Bearer Token).
- **Parameters:** `id` (The unique identifier of the user to retrieve).

**Access Control Policies:**
This endpoint enforces strict Role-Based Access Control (RBAC):

- **Administrators:** Have unrestricted access to view any user profile.
- **Standard Users:** Are strictly limited to viewing their own profile. The requested `:id` must match the authenticated user's ID; otherwise, access is denied.

### GET /user/getAllUsers

This endpoint is protected and requires a valid authentication token. Only `admin's` can access to this endpoint.

### POST /user/createUser

Registers a new user in the system.

- **Access:** Public (No authentication required).
- **Payload:** Content the following fields (`userName`, `email`, `password`, `img`, `books`).
- **Default Behavior:** The `role` is automatically set to `"user"`. The `books` collection can be populated now or updated later.
- **Image Handling:** The `image` field is optional.

**Error Handling & Data Integrity:**
This endpoint implements a **fail-safe mechanism** for image uploads. The image will **not be persisted** to Cloudinary if:

1.  **Validation Error:** Required fields (`userName`, `email`, `password`) are missing or invalid.
2.  **Duplicate Conflict:** The provided `email` is already registered in the database.

This ensures that no "orphan files" are stored in the cloud service when a registration attempt fails.

### POST /user/login

Authenticates a registered user and establishes a session.

- **Access:** Public.
- **Request Body:** Requires valid `email` and `password`.

**Process:**

1.  **Credential Verification:** Validates the provided email and password against the database records.
2.  **Token Issuance:** Upon successful authentication, the server generates and returns a signed **JSON Web Token (JWT)**.
3.  **Usage:** This token must be included in the `Authorization` header (as a Bearer Token) for all subsequent requests to protected endpoints.

### PUT /user/updateUser/:id

Updates the profile information of an existing user.

- **Authorization:** Protected (Requires JWT).
- **Parameters:** `id` (The unique identifier of the user).
- **Payload:** Accepts the same fields as the Registration endpoint and one more which is **role** (`userName`, `email`, `password`, `role`, `img`, `books`).

**Access Control & Security:**

- **Administrators:** Have full permission to modify any user account, including the ability to change user roles (e.g., promoting a user to Admin).
- **Standard Users:**
  - Can **only** update their own profile (ID match required).
  - **Privilege Escalation Prevention:** Standard users are strictly forbidden from modifying the `role` field. Attempts to change their own role to "admin" will be ignored or rejected.

### DELETE /user/deleteUser/:id

Permanently removes a user account from the system.

- **Authorization:** Protected (Requires JWT).
- **Parameters:** `id` (The unique identifier of the user).

**Resource Cleanup & Logic:**
Upon deletion, the system performs a **cascade cleanup operation**:

1.  **Database:** The user record is removed from MongoDB.
2.  **Cloud Storage:** If the user has an associated profile picture, the system automatically contacts Cloudinary to destroy the image file, preventing storage waste (orphan files).

**Access Permissions:**

- **Admins:** Can delete any user account.
- **Standard Users:** Can only delete their own account (Self-service deletion).

## Book endpoints

### GET /book/getBook/:id

Retrieves detailed information for a specific book by its unique identifier.

- **Access:** Public. No authentication or role verification is required.
- **Parameters:** `id` (The unique MongoDB ID of the book).
- **Response:** Returns the full book object, including `title`, `author`, `year`, and `img` (if available).

### GET /book/getAllBooks

Retrieves the complete collection of books stored in the database.

- **Access:** Public. Unrestricted access for all users and visitors.
- **Response:** Returns a JSON array containing all book records. Each object includes the `title`, `author`, `year`, and `img` (if present).

### POST /book/createBook

- **Authorization:** Restricted. Requires a valid JWT and the user **must** hold the `admin` role.
- **Payload:**
  - **Mandatory:** `title`, `author`, `year`.
  - **Optional:** `img` (Book cover image).

**Data Integrity & Fail-Safe Upload:**
Similar to the user registration process, this endpoint implements a **fail-safe mechanism** for image handling to prevent storage waste:

1.  **Validation:** If any mandatory field (`title`, `author`, `year`) is missing.
2.  **Duplicate Check:** If the book already exists in the database.

In either of these cases, the operation is aborted, and the image is **not persisted** to Cloudinary, ensuring no "orphan files" are left in the cloud storage.

### PUT /book/updateBook/:id

Modifies the details of an existing book in the collection.

- **Authorization:** Restricted. Requires a valid JWT and the user **must** hold the `admin` role.
- - **Parameters:** `id` (The unique MongoDB ID of the book).
- **Payload:** Accepts `title`, `author`, `year`, and `img` (via multipart/form-data).

**Fail-Safe Image Handling:**
This endpoint maintains strict data integrity during the update process:

1.  **Validation:** The system validates the input fields before committing changes to the database.
2.  **Rollback Mechanism:** If the update fails due to invalid data or missing required fields, the system automatically destroys the newly uploaded image (if any). This prevents "orphan files" from cluttering the Cloudinary storage when an update operation is not successfully completed.

### DELETE /book/deleteBook/:id

Permanently removes a book entry from the library collection.

- **Authorization:** Restricted. Requires a valid JWT and the user **must** hold the `admin` role.
- **Parameters:** `id` (The unique identifier of the book).

**Resource Cleanup (Cascade Deletion):**
This endpoint triggers a comprehensive cleanup process:

1.  **Database Removal:** The book record is permanently deleted from MongoDB.
2.  **Asset Destruction:** The system automatically identifies and deletes the associated cover image from Cloudinary. This ensures that the cloud storage remains synchronized with the database, eliminating any "orphan files."
