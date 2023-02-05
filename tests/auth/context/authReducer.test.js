import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types";

describe('tests authReducer', () => {
    
    const user = {
        id: 'ABC',
        username: 'Sergio_OA'
    };
    
    test('debe de retornar el estado por defecto', () => {
        const initialState = {
            logged: false
        }
        const authState = authReducer(initialState, '[Auth] error');
        expect(authState).toBe(initialState);
    })

    test('debe de realizar el login y establecer usuario', () => {
        const initialState = {
            logged: false
        }
        const action = {
            type: types.login,
            payload: user
        }
        const authState = authReducer(initialState, action);

        expect( authState.logged ).toBeTruthy();
        expect( authState.user ).toEqual(user);
    })

    test('debe de realizar el logout y eliminar usuario', () => {
        const initialState = {
            logged: true,
            user: user
        }
        const action = {
            type: types.logout
        }
        const authState = authReducer(initialState, action);
        expect( authState.user ).toBeNull();
    })
})