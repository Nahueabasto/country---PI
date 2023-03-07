//NO RENDERIZA LAS ACTIVIDADES

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getActivities } from "../Redux/Actions";

export default function Detail(props) {
  const { id } = props.match.params; // Obtener el id del país desde los parámetros de la URL

  const dispatch = useDispatch();
  const details = useSelector((state) => state.datails);

 // const [loading, setLoading] = useState(false)
//   const [count, setCount] = useState(0); // Definir el estado inicial del contador

//   // Función que se ejecuta cuando se presiona el botón
//   const incrementCount = () => {
//     setCount(count + 1); // Actualizar el estado del contador
//   };

  useEffect(() => {
    dispatch(getDetail(id)); // Llamar a la acción getDetail
    dispatch(getActivities)
    //setLoading(true)
  }, [dispatch, id]);

 
    return (
  <div>
    {details && (
      <>
        
        <p>Código de país: {details.id}</p>
        <p>Continente: {details.continent}</p>
        <p>Capital: {details.capital}</p>
        <p>Subregión: {details.subregion}</p>
        <p>Área: {details.area} km²</p>
        <p>Población: {details.population}</p>
        <h2>Actividades turísticas</h2>
        {details.touristActivities &&
          details.touristActivities.map((activity) => (
            <div key={activity.id}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <p>Duración: {activity.duration} horas</p>
              <p>Costo: {activity.cost} USD</p>
            </div>
          ))}
      </>
    )}
  </div>
);

}


//   return (
//     <div>
//       {loading ? (
//         <div>
//           <img src={details.image} alt="Not found" />
//           <h1>{details.name.common}</h1>
//           <p>Código de país: {details.id}</p>
//           <p>Continente: {details.continent}</p>
//           <p>Capital: {details.capital}</p>
//           <p>Subregión: {details.subregion}</p>
//           <p>Área: {details.area} km²</p>
//           <p>Población: {details.population}</p>
//           <h2>Actividades turísticas</h2>
//           {/* Mostrar la información de las actividades turísticas */}
//           {details.touristActivities &&
//             details.touristActivities.map((activity) => (
//               <div key={activity.id}>
//                 <h3>{activity.name}</h3>
//                 <p>{activity.description}</p>
//                 <p>Duración: {activity.duration} horas</p>
//                 <p>Costo: {activity.cost} USD</p>
//               </div>
//             ))}
//         </div>
//       ) : (
//         <div>Cargando...</div>
//       )}
//     </div>
//   );
  
// }

