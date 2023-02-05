import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', ()=> ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate
}));

beforeEach(()=> {
    jest.clearAllMocks();
})

describe('test SearchPage', () => {

    test('debe de mostrarse correctamente con valores por defecto', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );
        expect( container ).toMatchSnapshot();
    })

    test('debe de mostrar a batman y el input con el valor del query string', () => {
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const inputSearch = screen.getByRole('textbox');
        const img = screen.getByRole('img');
        expect( inputSearch.value ).toBe('batman');
        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
    })

    test('no debe mostrar la alerta para buscar heroe', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const alertInfo = screen.getByTestId('alert-info');
        expect(alertInfo.style.display).toBe('none');
    })

    test('debe de mostrar un error si no se encuentra un hero (batman123)', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const alertDanger = screen.getByTestId('alert-danger');
        expect(alertDanger.style.display).not.toBe('none');
    })

    test('debe de llamar el navigate a la pantalla nueva', () => {
        const inputValue = 'batman';
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );
        const inputSearch = screen.getByRole('textbox');
        const btnSubmit = screen.getByTestId('btn-submit-search');
        fireEvent.input(inputSearch, {target: {value: inputValue}});
        fireEvent.click(btnSubmit);

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    })
})