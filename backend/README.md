#Front End of the application
create a web auction application for an antique items seller. 
The application
will allow users to bid on antique items displayed in the site and admin users to set up items
for auction. 
Product management and auctioning are within the scope of the application;
shopping cart and payment integration are not.

#Step 1
Run:  change the database inside .env

#Step 2
run: php artisan db:seed

Faker was used to generate Item data in the application. The default number of items i have set is 50, you can change it in the file ItemSeeder.php under database/seeders
