<?php
// Utvecklad av Maja Afzelius som en del av kursern Webbutveckling III på webbutvecklingsprogrammet 

include("config.php");

include('header.php');

?>

<main>
    <!-- form för att skriva in inloggningsupgifter -->
    <form method="post" action="login.php">
        <label for="username">Användarnamn:</label>
        <input type="text" id="username" name="username">
        <br>
        <label for="password">Lösenord:</label>
        <input type="password" id="password" name="password">
        <br>
        <input type="submit" value="Login">
    </form>
</main>
<?php 
$user = isset($_POST['username']) ? $_POST['username'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if ($user == "admin" && $password == "password") {
    $_SESSION['logged_in']=true; 
    echo "<script>window.location.href = 'index.php';</script>";          
}
$page_title = 'Logga in';
include("footer.php");
?>
