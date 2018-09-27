import {AuthController} from "./controller/AuthController";
import {PhotoController} from "./controller/PhotoController";
import {UserController} from "./controller/UserController";

export const Routes = [
    // AUTH
    {
        method: "post",
        route: "/register",
        controller: AuthController,
        action: "handleRegister"
    }, {
        method: "post",
        route: "/login",
        controller: AuthController,
        action: "handleLogin"
    }, {
        method: "get",
        route: "/auths",
        controller: AuthController,
        action: "all"
    },
    // PHOTO
    {
        method: "post",
        route: "/imageurl",
        controller: PhotoController,
        action: "handleSubmitImage"
    },
    //User
    {
        method: "get",
        route: "/users",
        controller: UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users",
        controller: UserController,
        action: "remove"
    }
];