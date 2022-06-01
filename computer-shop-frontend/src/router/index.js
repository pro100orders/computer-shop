import React, {useEffect, useState} from 'react';
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import WishList from "../pages/WishList/WishList";
import {useSelector} from "react-redux";
import Computers from "../pages/Computers/Computers";
import Basket from "../pages/Basket/Basket";
import ComputerDetails from "../components/Computers/ComputerDetails/ComputerDetails";
import LoginForm from "../components/LoginForm/LoginForm";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import Orders from "../pages/Orders/Orders";

const AppRoutes = () => {

    const roles = useSelector(state => state.auth.user.roles);;

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        setRoutes([
            {path: "/", component: Home},
            {path: "/computers", component: Computers},
            {path: "/computers/:id", component: ComputerDetails},
        ]);

        if (roles && roles.includes("ROLE_GUEST")) {
            const guestRoutes = [
                {path: '/login', component: LoginForm},
                {path: '/registration', component: RegistrationForm}
            ];

            setRoutes(routes => routes = routes.concat(guestRoutes));
        }

        if (roles && roles.includes("ROLE_USER")) {
            const userRoutes = [
                {path: "/profile", component: Profile},
                {path: "/wish-list", component: WishList},
                {path: "/basket", component: Basket},
                {path: "/orders", component: Orders},
            ];

            setRoutes(routes => routes = routes.concat(userRoutes));
        }

        if (roles && roles.includes("ROLE_ADMIN")) {
            const adminRoutes = [];

            setRoutes(routes => routes = routes.concat(adminRoutes));
        }
    }, [roles]);

    return routes;
}

export default AppRoutes;