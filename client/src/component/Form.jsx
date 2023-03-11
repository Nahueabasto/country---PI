
//pusheo siendo las 00:30: 
// Descubri el error que tenia de porque no me hacia el post de country. En la funcion handleSubmit le estaba haciendo un post solo actividades porque le habia creado a cuntries un estado con nombre diferente, bueno solucionado esto te cuento que:

//Le agregue en linea 164 esto: <div> {input.countries?.map(el => el + ", ")} que lo que hace es renderizar bien los countries seleccionados. Pero no me dejo agregarle un delete, probe de mil formas, y ademas si cambiaba esta parte: (el => el + ", ")} no me las renderizaba. Asi que bueno las muestra pero no las elimina, es lo unico que faltaria, te lo dejo si lo podes hacer, ah y te deje comentado una funcion delete para que mas o menos te quede como deberia ser!. :D
// Probe hacer varios post de la forma que esta el codigo ahora y anda bien, ya sea agregando uno o varios paises crea la actividad y me la relaciona con las tablas. :D

// Mañana seguramente vas a estar a la mañana, yo por otro lado voy a ver la serie y mañana voy a descansar hasta tarde..
// Si por casualidad llega a ver este codigo alguien mas se va a cagar de risa jajaja

import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getCountries, getActivities } from "../Redux/Actions";
import { useDispatch, useSelector } from 'react-redux';


function validate(input) {
    let errors = {};
  
    // Validación del campo "name"
    if (!input.name) {
      errors.name = "Se requiere un name";
    }
  
    // Validación del campo "difficulty"
    if (!input.difficulty) {
      errors.difficulty = "Se requiere una dificultad";
    } else if (isNaN(input.difficulty) || input.difficulty < 1 || input.difficulty > 5) {
      errors.difficulty = "La dificultad debe ser un número entre 1 y 5";
    }
  
    // Validación del campo "duration"
    if (!input.duration) {
      errors.duration = "Se requiere una duración";
    }
  
    // Validación del campo "season"
    if (!input.season) {
      errors.season = "Se requiere una temporada";
    } else if (!["Summer", "Fall", "Winter", "Spring"].includes(input.season)) {
      errors.season = "La temporada debe ser 'Summer', 'Fall', 'Winter' o 'Spring'";
    }
  
    return errors;
  }

export default function Form(){

    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries);
    
    //const [selectedCountries, setSelectedCountries] = useState([]);

    const [errors, setErrors] = useState({ });


    const [input, setInput] = useState({
        name: '', 
        difficulty: '', 
        duration: '', 
        season: '', 
        countries: []
    });

    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities())
      }, [dispatch]);

    function handleChange(e){
        setInput({ ...input, [e.target.name]: e.target.value });
        setErrors(
            validate({
            ...input,
            [e.target.name] : e.target.value
        })
        )
    }
 
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postActivities(input));
        alert("Actividad creada!");
        setInput({ 
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home'); 
    
    }

    function handleSelect(e) {
      setInput({
          ...input,
          countries: [
              ...input.countries,
              e.target.value
          ]
      });
  };


    // function handleDelete(name) {
    //   setInput({
    //     ...input,
    //     countries: input.countries.filter((el) => el.name !== el.name),
    //   });
    // }
    
    return(
        <div>
            <Link to='/home'>
                <button>Volver</button>
            </Link>
            <h1>Crear Actividad Turistica</h1>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name='name' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>difficulty:</label>
                    <input type="number" value={input.difficulty} name='difficulty' 
                    onChange={e => handleChange(e)}>
                    </input>
                    {errors.difficulty && <p>{errors.difficulty}</p>}
                </div>
                <div>
                    <label>duration:</label>
                    <input type='number' value={input.duration} name='duration'
                     onChange={e => handleChange(e)}>  
                    </input>
                    {input.duration && <span> horas</span>}
                    {errors.duration && <p>{errors.duration}</p>}
                </div>
                <div>
            <label>season:</label>
               <select value={input.season} name='season' onChange={e => handleChange(e)}>
                 <option value="Summer">Summer</option>
                   <option value="Fall">Fall</option>
                   <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
              {errors.season && <p>{errors.season}</p>}
                </div>

                <div>
                    <label>country:</label>
                    <select name='countries' onChange={e => handleSelect(e)}>
                        {allCountries.map(el => (
                            <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div> {input.countries?.map(el => el + ", ")} 
                 </div>
                <button type='submit'>Crear Actvidad</button>
            </form>
        </div>
    )
}

 /* <div> {input.countries?.map(el => el + ", ")} <button onClick={() => handleDelete(el.name)}>x</button>
                
                 </div> */