export interface User {
    id: string
    username: string
    password: string
    role: Role
    token: string

}

export enum Role {
    OWNER = "Owner",
    EMPLOYEE = "Employee"
}
