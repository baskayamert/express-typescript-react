import { authenticateToken, restrictToRole } from "./auth/auth.service";
import { login, register } from "./controllers/AuthActions";
import { branchDeleteAction, branchGetAllAction, branchGetByIdAction, branchSaveAction, branchUpdateAction } from "./controllers/BranchActions";
import { userDeleteAction, userGetAllAction, userGetByIdAction, userSaveAction, userUpdateAction } from "./controllers/UserActions";
import { Role } from "./entity/User";

export const AppRoutes = [
    {
        path: "/api/auth/login",
        method: "post",
        action: [login ]
    },
    {
        path: "/api/auth/register",
        method: "post",
        action: [register]
    },
    {
        path: "/api/users",
        method: "get",
        action: [userGetAllAction ]
    },
    {
        path: "/api/users",
        method: "post",
        action: [userSaveAction ]
    },
    {
        path: "/api/users/:id",
        method: "get",
        action: [userGetByIdAction ]
    },
    {
        path: "/api/users/:id",
        method: "put",
        action: [userUpdateAction ]
    },
    {
        path: "/api/users/:id",
        method: "delete",
        action: [userDeleteAction ]
    },
    {
        path: "/api/branches",
        method: "get",
        action: [authenticateToken, branchGetAllAction ]
    },
    {
        path: "/api/branches",
        method: "post",
        action: [authenticateToken, restrictToRole(Role.OWNER), branchSaveAction ]
    },
    {
        path: "/api/branches/:branch_id",
        method: "get",
        action: [authenticateToken, restrictToRole(Role.OWNER), branchGetByIdAction ]
    },
    {
        path: "/api/branches/:branch_id",
        method: "put",
        action: [authenticateToken, restrictToRole(Role.OWNER), branchUpdateAction ]
    },
    {
        path: "/api/branches/:branch_id",
        method: "delete",
        action: [authenticateToken, restrictToRole(Role.OWNER), branchDeleteAction ]
    },
];