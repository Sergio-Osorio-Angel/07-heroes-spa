import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";

describe('test AppRouter', () => {

    test('debe de mostrar el login si no está autenticado', () => {
        const contextValue = {
            logged: false
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{ authState: contextValue }}>
                    <AppRouter></AppRouter>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);
    })

    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Sergio'
            }
        };
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={{ authState: contextValue }}>
                    <AppRouter></AppRouter>
                </AuthContext.Provider>
            </MemoryRouter>
        );
        expect( screen.getByRole('heading', {level:1}).innerHTML ).toBe('Marvel Comics');
    })
})