import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PublicRoutes } from "../../src/router/PublicRoutes";

describe('test PublicRoutes', () => {

    test('debe de mostrar el children si no esta autenticado', () => {
        const initialState = {
            logged: false
        }
        render(
            <AuthContext.Provider value={{ authState: initialState }}>
                <PublicRoutes>
                    <h1>Ruta pública</h1>
                </PublicRoutes>
            </AuthContext.Provider>
        );
        const h1 = screen.getByText('Ruta pública');
        expect(h1).toBeTruthy();
    })

    test('debe de navegar si esta autenticado', () => {
        const initialState = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Sergio'
            }
        }
        render(
            <AuthContext.Provider value={{ authState: initialState }}>
                {/* Para testear un Navigate to, se debe de utilizar el MemoryRouter*/}
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="/login" element={
                            <PublicRoutes>
                                <h1>Ruta pública</h1>
                            </PublicRoutes>
                        }/>
                        <Route path="/" element={<h1>Página Home</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const h1 = screen.getByText('Página Home');
        expect(h1).toBeTruthy();
    })
})