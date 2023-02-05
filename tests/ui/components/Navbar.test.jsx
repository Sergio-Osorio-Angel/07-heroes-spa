import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../../src/auth/context/AuthContext"
import { Navbar } from "../../../src/ui/components/Navbar"

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

describe('tests Navbar', () => {
    
    const initialState = {
        logged: true,
        user: {
            id: 'ABC',
            username: 'Sergio_OA'
        }
    }
    const logoutMock = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrar el nombre del usuario', () => {
        render(
            <AuthContext.Provider value={{ authState: initialState }}>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(initialState.user.username)).toBeTruthy();
    })

    test('debe de llamar la función logout y realizar el navigate', () => {
        render(
            <AuthContext.Provider value={{ authState: initialState, logout: logoutMock }}>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        const btnLogout = screen.getByText('Logout');
        fireEvent.click(btnLogout);

        expect(logoutMock).toHaveBeenCalled();
        expect(mockUseNavigate).toHaveBeenCalledWith('/login', {replace:true});
    })
})