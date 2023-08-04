import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Branch } from "./entity/Branch"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: "root",
    password: "password",
    database: "MindBehindDb",
    synchronize: true,
    logging: false,
    entities: [User, Branch],
    migrations: [],
    subscribers: [],
})
