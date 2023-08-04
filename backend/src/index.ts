import express = require("express")
import { AppDataSource } from "./data-source"
import { Request, Response } from "express"
import { AppRoutes } from "./routes"
import cors = require("cors")
import { seed } from "./seeder/seed"

AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors())
    await seed();
    AppRoutes.forEach(route => {
        const middleware = Array.isArray(route.action) ? route.action : [route.action]; // Ensure action is an array
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            Promise.all(middleware.map(fn => fn(request, response)));
         
        });
    });

    app.listen(3000, () => {
        console.log('The application is listening on port 3000!');
    });

}).catch(error => console.log(error))



