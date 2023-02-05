import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "../../ui";
import { DCPages, HeroePage, MarvelPages, SearchPage } from "../pages";

export function HeroesRoutes() {
    return (
        <>
            <Navbar></Navbar>

            <div className="container">
                <Routes>
                    <Route path="/marvel" element={<MarvelPages></MarvelPages>}></Route>
                    <Route path="/dc" element={<DCPages></DCPages>}></Route>
                    <Route path="/search" element={<SearchPage></SearchPage>}></Route>

                    <Route path="/heroe/:heroeId" element={<HeroePage></HeroePage>}></Route>

                    <Route path="/" element={<Navigate to={'/marvel'}></Navigate>}></Route>
                </Routes>
            </div>

        </>
    )
}
