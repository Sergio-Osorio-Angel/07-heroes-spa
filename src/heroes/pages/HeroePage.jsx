import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroeById } from "../helpers/getHeroeById";

export function HeroePage() {

    const { heroeId } = useParams();
    const navigate = useNavigate();

    const heroe = useMemo(() => getHeroeById(heroeId), [heroeId]);

    function onNavigateBack() {
        navigate(-1);
    }


    if ( !heroe ) {
        return <Navigate to={'/marvel'}></Navigate>
    }

    return (
        <>
            <div className="row mt-5">
                <div className="col-4">
                    <img src={`/assets/heroes/${heroe.id}.jpg`} alt={heroe.superhero} className="img-thumbnail animate__animated animate__fadeInLeft"/>
                </div>
                <div className="col-8">
                    <h3>{heroe.superhero}</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><b>Alter ego: {heroe.alter_ego}</b></li>
                        <li className="list-group-item"><b>Publisher: {heroe.publisher}</b></li>
                        <li className="list-group-item"><b>First appearance: {heroe.first_appearance}</b></li>
                    </ul>

                    <h5 className="mt-3">Characters</h5>
                    <p>{heroe.characters}</p>

                    <button className="btn btn-outline-primary" onClick={()=>{onNavigateBack()}}>Regresar</button>
                </div>
            </div>
        </>
    )
}
