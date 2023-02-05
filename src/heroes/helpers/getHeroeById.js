import { heroes } from "../data/heroes";

export function getHeroeById(id) {
    const array = heroes;

    return array.find( (heroe) => heroe.id === id);
}