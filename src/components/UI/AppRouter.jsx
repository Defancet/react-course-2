import React, {useContext} from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router/route";
import Error from "../../pages/Error";
import {AuthContext} from "../../context/index";
import Loader from "./Loader/Loader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    return (
        <Routes>
            {isAuth ? (
                privateRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                )
            ) : (
                publicRoutes.map(route =>
                    <Route
                        path={route.path}
                        element={<route.component />}
                        key={route.path}
                    />
                )
            )}
            <Route
                path="*"
                element={isAuth ? <Navigate to="/posts" /> : <Navigate to="/login" />}
            />
        </Routes>
    );
};

export default AppRouter;
