#Back end End of the application
create a web auction application for an antique items seller. 
The application
will allow users to bid on antique items displayed in the site and admin users to set up items
for auction. 
Product management and auctioning are within the scope of the application;
shopping cart and payment integration are not.

#Step 1
Run:  change the database setting inside .env

#Step 2
run: php artisan migrate

#Step 3 set passport
run: php artisan passport:install

#Step 4 
run: php artisan db:seed

#Step 5 
run: php artisan serve

Faker was used to generate Item data in the application. The default number of items i have set is 50, you can change it in the file ItemSeeder.php under database/seeders



#Front End of the application
create a web auction application for an antique items seller. 
The application
will allow users to bid on antique items displayed in the site and admin users to set up items
for auction. 
Product management and auctioning are within the scope of the application;
shopping cart and payment integration are not.

#Step 1
Run:  npm install

#Step 2
change the url of the server inside the file HttpService.js under src/services folder
(url = "http://localhost:8000";)

#Step 3
run: npm serve
