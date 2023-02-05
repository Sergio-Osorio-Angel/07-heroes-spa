import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import queryString from 'query-string';
import { gerHeroesByName } from "../helpers/gerHeroesByName";
import { HeroeCard } from "../components/HeroeCard";
import { useEffect } from "react";

export function SearchPage() {

  const navigate = useNavigate();

  // Get url - for query paramerts
  // location => ubicación de donde nos encontramos
  // location.search => Todos los parametros
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  const resultHeroes = gerHeroesByName(q);

  const showSearch = (q.length === 0) ? true : false;
  const showError = (q.length > 0 && resultHeroes.length === 0) ? true : false;

  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  function onSearchSubmit(event) {
    event.preventDefault();
    navigate(`?q=${searchText.toLowerCase()}`);
  }

  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">

        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSubmit}>
            <input type="text" placeholder="Search a hero"
              className="form-control" name="searchText"
              autoComplete="off" value={searchText} onChange={onInputChange} />
            <button data-testid="btn-submit-search" type="submit" className="btn btn-outline-primary mt-1">Search</button>
          </form>

        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />
          {/* {
            (q === '')
            ? <div className="alert alert-primary">Search a hero</div>
            : (resultHeroes.length === 0) && <div className="alert alert-danger">No hero with <b>{q}</b></div>
          }         */}

          <div data-testid="alert-info" className="alert alert-primary animate__animated animate__fadeIn" style={ {display: showSearch ? '' : 'none'} }>Search a hero</div>

          <div data-testid="alert-danger" className="alert alert-danger animate__animated animate__fadeIn" style={ {display: showError ? '' : 'none'} }>No hero with <b>{q}</b></div>

          {
            resultHeroes.map((hero) => (
              <HeroeCard key={hero.id} {...hero}></HeroeCard>
            ))
          }

        </div>
      </div>
    </>
  )
}
