import { useMemo } from "react";
import { getHeroesByPublisher } from "../helpers/getHeroesByPublisher"
import { HeroeCard } from "./HeroeCard";

export function HeroList({publisher}) {

    const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-3">
            {
                heroes.map((heroe) => (
                    // Pasar propiedades mediante desestructuración
                    <HeroeCard key={heroe.id} {...heroe}></HeroeCard>
                ))
            }
        </div>
    )
}
