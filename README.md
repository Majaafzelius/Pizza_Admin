## Projektet - Admingränssnitt
Detta är admingränssnittet för webbsidan som utvecklats i sluprojektet i kursen Webbutveckling III.<br>
Gränssnittet är utvecklat med PHP, css och javascript. Det hämtar webbservicen som skapats i projektet med Fetch och använder sig utav Create, Read, Update och Delete från servicen för att hantera databasens innehåll. <br>
Gulp användes i projektets gång för att minifiera, konkatinera och konvertera koden som skrevs. Vid senare skede i projektet byttes alla html-filer ut mot PHP-filer för att göra det möjligt att lägga till funktionalitet för att logga in. Gulp fortsattes användas även efter detta byte, dock på ett annat sätt då php-filer ej kan köras lokalt på samma sätt som html-filer.
<br>De gulp-paket som använts för att utveckla denna kod är följande: 
<ul>
  <li>gulp-concat</li>
  <li>gulp-uglify-es</li>
  <li>gulp-sass</li>
  <li>node-sass</li>
  <li>browser-sync</li>
</ul>
