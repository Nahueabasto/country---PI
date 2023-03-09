import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getActivities } from "../Redux/Actions";
import "./Detail.css";

export default function Detail(props) {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const details = useSelector((state) => state.datails);
  const activities = useSelector((state) => state.activities);
  console.log(activities)

  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getActivities());
  }, [dispatch, id]);

  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
  };

  return (
    <div className="card" style={{ display: "flex" }}>
      {details && (
        <div style={{ flex: 1 }}>
          <img className="card-img" src={details.image} alt="Not found" />
          <p>Name: {details.name}</p>
          <p>Código de país: {details.id}</p>
          <p>Continente: {details.continent}</p>
          <p>Capital: {details.capital}</p>
          <p>Subregión: {details.subregion}</p>
          <p>Área: {details.area} km²</p>
          <p>Población: {details.population}</p>
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h2>Actividades turísticas</h2>
        <select value={selectedActivity} onChange={handleActivityChange}>
          <option value="">Selecciona una actividad</option>
          {details.activities?.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        {selectedActivity && (
          <div>
            <h4>Datos de la actividad seleccionada:</h4>
            {details.activities
              .filter((el) => el.name === selectedActivity)
              .map((el) => (
                <div key={el.id}>
                  <p>Dificultad: {el.difficulty}</p>
                  <p>Duración: {el.duration}</p>
                  <p>Temporada: {el.season}</p>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}









