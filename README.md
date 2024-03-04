# examenenroute
Examen Febrero 2024

## backend
Clone bakcend repository `git clone https://github.com/AlferDuran/backend.git`
Go to backend folder 
`\cd .\backend\`

Install the modules with `npm i`, go to the npm doc if you don't have npm installed

Run `npm run start` to start the backend on port 3001 feel free to change the port in the main.ts file

The commit has already a datbase with data, no need to add data unless you delete the databse file, it uses sqlite by default but you can change it o point other datbases thanks to TypeORM, use get /colors/seeder to seed the database

## ui

Go to ui folder 
`\cd .\frontend\`

Install the modules with `npm i`, go to the npm doc if you don't have npm installed 

Run the unit tests `npm run test:unit` it olny has unit tests for the class, you can see them on `IOhmValueCalculator.spec.ts`

Use `npm run start` to start the development server on port 3000, if this port is used you can use another port

this app has the application to use IOhmValueCalculator and a small crud to add and deactivate the last two band colors which comes from an api/database
