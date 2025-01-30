# Schedules

A web application designed to manage and display schedules efficiently.

## Features

- User authentication and authorization
- Schedule creation and management
- Responsive design for various devices

## Technologies Used

- **Frontend:**

  - Angular
  - SCSS
  - HTML

- **Backend:**

  - Node.js
  - Express
  - PostgreSQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tigran-sn/schedules.git
   cd schedules
   ```

2. **Backend Setup:**

   ```bash
   cd BE
   npm install
   ```

3. **Frontend Setup:**

   ```bash
   cd ../FE
   npm install
   ```

## Usage

1. **Start the Backend Server:**

   ```bash
   cd BE
   npm run dev
   ```

2. **Start the Frontend Application:**

   ```bash
   cd ../FE
   ng serve
   ```

3. **Access the Application:**

   Open your browser and navigate to `http://localhost:4200`.

## Database Setup

By running the following command `npm run dev`, the `schedule_db` will be initialized with `users` and `schedules` tables. 
Users will be automatically created and stored in the database when `USERS=[{"email":"user1@some.com","password":"user1@some.com"},{"email":"user2@some.com","password":"user2@some.com"}]` is specified in the `.env` file. 
The database should be created with default values, except for the password, which should be set to `54321`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

