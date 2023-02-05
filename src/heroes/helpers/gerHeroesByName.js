import { heroes } from "../data/heroes";

export function gerHeroesByName(name = '') {
    name = name.toLowerCase().trim();

    if (name.length === 0) {
        return [];
    } else {
        return heroes.filter((hero) => hero.superhero.toLowerCase().includes(name));
    }
}