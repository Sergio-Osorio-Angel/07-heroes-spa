import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";

describe('test PrivateRoutes', () => {

    test('debe de mostrar el children si esta autenticado', () => {
        const initialState = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Sergio'
            }
        }

        // Esto sirve cuando se quiere evaluar el local storage
        Storage.prototype.setItem = jest.fn();

        render(
            <AuthContext.Provider value={{ authState: initialState }}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalled();
    })

})