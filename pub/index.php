<?php
// Utvecklad av Maja Afzelius som en del av kursern Webbutveckling III på webbutvecklingsprogrammet 

include("config.php");
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('location: login.php');
}

include("header.php"); ?>
        <main>
            <div id="main">
                <div>
                    <h2>Lägg till Maträtt</h2>
                    <form method="POST" id="postform">
                        <label for="name">Namn på rätt</label><br>
                        <input type="text" name="name" id="name"><br>

                        <label for="content">Rättens innehåll</label><br>
                        <input type="text" name="content" id="content"><br>

                        <label for="price">Pris: </label><br>
                        <input type="text" name="price" id="price"><br>

                        <input type="button" value="Lägg till" id="submit">
                    </form>
                    <div id="vis_form">
                        
                    </div>
                </div>
                <div>
                    <h2>Hantera beställningar</h2>
                    <ul id="orders">

                    </ul>
                    <h2>Nuvarande Meny</h2>
                    <ul id="menu">

                    </ul>
                    
                </div>
            </div>
        </main>
        <?php include("footer.php"); ?>