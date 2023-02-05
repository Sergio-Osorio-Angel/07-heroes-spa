import { Route, Routes } from "react-router-dom";


import { LoginPage } from "../auth";
import { HeroesRoutes } from "../heroes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoutes } from "./PublicRoutes";



export function AppRouter() {
    return (
        <>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login/*" element={
                    <PublicRoutes>
                        <Routes>
                            <Route path="/*" element={<LoginPage></LoginPage>}></Route>
                        </Routes>
                    </PublicRoutes>}>
                </Route>

                {/* Rutas privadas */}
                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRoutes></HeroesRoutes>
                    </PrivateRoute>}>
                </Route>

            </Routes>
        </>
    )
}
