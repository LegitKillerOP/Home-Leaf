<?php
session_start();
require 'config.php'; // Database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assume you have some code here to validate user credentials
    // and set session variables if the login is successful
    
    // Get the redirect URL from the form submission
    $redirect_url = isset($_POST['redirect']) ? $_POST['redirect'] : 'index.php';
    
    // If login is successful, redirect to the original URL
    if ($login_success) {
        $_SESSION['user_id'] = $user_id; // Set session or other login-related operations
        header("Location: " . $redirect_url);
        exit;
    } else {
        // Handle login failure (e.g., redirect back to login with an error message)
        header("Location: login.php?error=invalid_credentials&redirect=" . urlencode($redirect_url));
        exit;
    }
}
?>
