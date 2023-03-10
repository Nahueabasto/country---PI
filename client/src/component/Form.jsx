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
    //const activities = useSelector((state) => state.activities);

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

    function handleSelect(e){
        setInput({
            ...input,
            countries: [
                ...input.countries,
                e.target.value
            ]
        });
    };

    // function handleCountries (e) {
    //     if (
    //       !input.countries.includes(
    //         allCountries.find((item) => item.name === e.target.value)
    //       )
    //     ) {
    //       input.countries.push(
    //         allCountries.find((item) => item.name === e.target.value)
    //       );
    //     }
    //     setErrors( //seteame mi estado errores, pasandole la funcion validate que hice arriba, con el estado completed y el [e.target.name]: en el e.target.value,
    //       validate({
    //         ...input,
    //         [e.target.name]: e.target.value,
    //       })
    //     );
    //   };
    
      

    // function handleSubmit(e){
    //     e.preventDefault();
    //     dispatch(postActivities(input))
    //     alert("Activity create!")
    //     setInput({
    //         name: '', 
    //         difficulty: '', 
    //         duration: '', 
    //         season: '', 
    //         countries: []
    //     });
    //     history.push('/home')
    // };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postActivities(input));
        alert("Actividad creada!");
        setInput({ //limpio los campos
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home'); //esto lo que hace es redirigirte al home después de crear la activity.
    
    }

    function handleDelete(name) {
        setInput({ //seteo el completed 
          ...input, //el completed que tiene todo y no quiero que se vaya
          countries: input.countries.filter((item) => item.name !== name), //a temperaments le digo, filtramelo por todo lo que no sea ese elemento. Va a agarrar y me va a devolver el estado nuevo sin ese elemento que yo clickee
        });
      }

    
      

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
                <div >
              {input.countries?.map((item) => ( //el estado local completed va a tener todos los temperaments //la funcion handleDelete va borrar el elemento que este clicleando
                <div key={item.id}>
                  {item.name}{" "}
                  <button onClick={() => handleDelete(item.name)}>x</button>
                </div>
                 ))}
                 </div>

                <button type='submit'>Crear Actvidad</button>
            </form>
        </div>
    )
}