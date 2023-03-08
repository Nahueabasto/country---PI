import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getActivities } from "../Redux/Actions";
import "./Detail.css";

export default function Detail(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const details = useSelector((state) => state.datails);
  const activities = useSelector((state) => state.activities);
  console.log(activities)
  //const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getActivities());
  }, [dispatch, id]);
  

  return (
    <div className="card">
      {details && (
        <>
          <img className="card-img" src={details.image} alt="Not found" />
          <p>Código de país: {details.id}</p>
          <p>Continente: {details.continent}</p>
          <p>Capital: {details.capital}</p>
          <p>Subregión: {details.subregion}</p>
          <p>Área: {details.area} km²</p>
          <p>Población: {details.population}</p>
          <h2>Actividades turísticas</h2>
   
          <h4 > 
          {details.activities?.map(el => (
            <div key={el.id} >
              <p>Name: {el.name}</p>
              <p>Dificultad: {el.difficulty}</p>
              <p>Duración: {el.duration}</p>
              <p>Temporada: {el.season}</p>
            </div>
          ))}
          </h4>
        </>
      )}
    </div>
  );
}








