# Carpool

Carpool is a web application that facilitates carpooling among students and staff within a university setting. Users can register their carpool details, including their availability, campus, and preferred locations. Additionally, users can search for potential carpoolers based on specific criteria, fostering a sense of community and environmental sustainability.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Carpool Registration](#carpool-registration)
  - [Finding Carpoolers](#finding-carpoolers)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/biswadeep-roy/carpool.git
```


2. Navigate to the project frontend directory:

```bash
cd frontend
```


3. Install dependencies:


```bash
npm install
```
4. Start the frontend server

```bash
npm start
```

5. Navigate to the project backend directory:

```bash
cd backend
```


6. Install dependencies:


```bash
npm install
```

7. Create a `.env` file in the root directory of backend with the following content:

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

8. Start the backend server

```bash
node ./server.js
```



The application should now be running locally on http://localhost:5000.

## Usage

### Carpool Registration

1. Navigate to the Carpool Registration page.
2. Fill in your details, including name, contact information, campus, and carpool timings.
3. Agree to the terms and conditions.
4. Click "Submit" to register your carpool entry.

### Finding Carpoolers

1. Navigate to the Find Carpoolers page.
2. Specify your search criteria, including start time, end time, campus, and locations.
3. Click "Search" to find matching carpoolers.
4. View the list of matching carpoolers and their contact information.

## Features

- **Carpool Registration:**
- Users can register their carpool details, including personal information and availability.
- Input validation ensures accurate and complete information.

- **Finding Carpoolers:**
- Users can search for potential carpoolers based on specified criteria, such as time, campus, and locations.
- Matching carpoolers are displayed, along with their contact information.

- **Terms and Conditions:**
- Users must agree to terms and conditions before registering a carpool entry.

## Contributing

Contributions are welcome! Please follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines.

## License

This project is licensed under the [MIT License](LICENSE).



