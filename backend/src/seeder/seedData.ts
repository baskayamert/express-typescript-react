import { Role } from "../entity/User";

export const userDataSeed = [
    { id:"69d20348-47f5-4109-a368-8017cacb4e82", username: 'owner1', password: '1234567', role: Role.OWNER },
    { id:"f01d489b-0dc0-4561-bb68-302c4f047f53", username: 'employee1', password: '1234567', role: Role.EMPLOYEE },
];

export const branchDataSeed = [
    { 
        branch_id:"e07b06a9-ab02-4e23-b8bf-9598bd93a3d9", 
        latitude: '35.6895° N', 
        longitude: '139.6917° E', 
        name: "Pineview Bank",
        full_address: "123 Main Street, New York City, NY 10001, United States",
        phone: "+1 (555) 123-4567" 
    },
    { 
        branch_id:"7e9100d7-af1e-4d9f-a6b6-b66b14d67988", 
        latitude: '37.7749° N', 
        longitude: '-122.4194° W', 
        name: "Greenfield Pharmacy",
        full_address: "456 Elm Street, San Francisco, CA 94101, United States",
        phone: "+1 (555) 123-4567" 
    },
    { 
        branch_id:"3dfc22a4-09da-4aa4-8daf-1151d90e67fa", 
        latitude: '33.7490° N', 
        longitude: '-84.3880° W', 
        name: "Riverside Fitness Center",
        full_address: "789 Oak Avenue, Atlanta, GA 30301, United States",
        phone: "+1 (555) 123-4567" 
    },
    { 
        branch_id:"d75eaba3-345c-46dc-a9b9-dc90eba9ec21", 
        latitude: '41.8781° N', 
        longitude: '-87.6298° W', 
        name: "Lakeside Cafe",
        full_address: "987 Lakeview Drive, Chicago, IL 60601, United States",
        phone: "+1 (555) 123-4567" 
    },
];
  