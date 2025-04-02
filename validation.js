const mysql = require('config.php');

// Database connection setup
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "sign_up"
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

// Validation functions
function validateName(first_Name) {
    return /^[A-Za-z]{2,}$/.test(first_Name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhoneNumber(phone_number) {
    return /^[0-9]{8,15}$/.test(phone_number);
}

function validateDateOfBirth(date_birth) {
    const birthDate = new Date(date_birth);
    const today = new Date();
    return birthDate < today; // Ensures past date
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// Function to validate all fields and insert into database
function registerUser(user) {
    const { first_Name, last_Name, email, phone_number, date_birth, password } = user;

    if (!validateName(first_Name) || !validateName(last_Name)) {
        console.log("Nederīgs vārds vai uzvārds ! -__-(common human).");
        return false;
    }
    if (!validateEmail(email)) {
        console.log("Neder šis e- pasts, pa jauno!.");
        return false;
    }
    if (!validatePhoneNumber(phone_number)) {
        console.log("Invalid phone number.");
        return false;
    }
    if (!validateDateOfBirth(date_birth)) {
        console.log("Invalid date of birth.");
        return false;
    }
    if (!validatePassword(password)) {
        console.log("Password does not meet security requirements.");
        return false;
    }

    const query = "INSERT INTO users (name, surname, email, phone, dob, password) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [name, surname, email, phone, dob, password], (err, result) => {
        if (err) {
            console.error("Error inserting user:", err);
            return false;
        }
        console.log("User registered successfully.");
        return true;
    });
}

