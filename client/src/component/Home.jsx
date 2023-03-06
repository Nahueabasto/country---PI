// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCountries, filterContinent, filterActividades, getActivities } from '../Redux/Actions';
// import { Link } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import Card from './Card';
// import Paginado from './Pagination';
// import "./Home.css"

// export default function Home() {
//   const dispatch = useDispatch();
//   const allCountries = useSelector((state) => state.countries);
//   const allActivities = useSelector((state) => state.activities)

//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedActivity, setSelectedActivity] = useState("");
  

//   useEffect(() => {
//     dispatch(getCountries());
//     dispatch(getActivities())
//   }, [dispatch]);

//   function handleClick(e) {
//     e.preventDefault();
//     dispatch(getCountries());
//   }

//   function handleFilterContinent(e) {
//     e.preventDefault();
//     dispatch(filterContinent(e.target.value));
//   }

//   function handleFilterActivities(e){
//     e.preventDefault();
//     dispatch(filterActividades(e.target.value))
//     setCurrentPage(1)
//   }

//   const indexOfLastCountry = currentPage * (currentPage === 1 ? 9 : 10);
//   const indexOfFirstCountry = indexOfLastCountry - (currentPage === 1 ? 9 : 10);
//   const currentCountries = allCountries.slice(
//   indexOfFirstCountry,
//   indexOfLastCountry
// );

//   function paginate(pageNumber) {
//     setCurrentPage(pageNumber);
//   }

//   return (
//     <div>
//       <Link to="/activities"></Link>
//       <h1>Countries</h1>
//       <button onClick={(e) => handleClick(e)}>
//         Volver a cargar Countries
//       </button>
//       <div>
//         <SearchBar />
//       </div>
//       <div>
//         <select onChange={(e) => handleFilterContinent(e)}>
//           <option value="All"> All </option>
//           <option value="Africa">Africa</option>
//           <option value="Americas">Americas</option>
//           <option value="Antarctic">Antarctic</option>
//           <option value="Asia">Asia</option>
//           <option value="Europe">Europe</option>
//           <option value="Oceania">Oceania</option>
//         </select>

//         <select>
//           <option value="default">Orden</option>
//           <optgroup label="Population">
//             <option value="asc">Country por population</option>
//             <option value="des">Country por population</option>
//           </optgroup>
//           <optgroup label="Alphabetic">
//             <option value="az">A-Z</option>
//             <option value="za">Z-A</option>
//           </optgroup>
//         </select>

//         <select onChange={(e) => handleFilterActivities(e)}>
//           <option value="">Todas las actividades</option>
//       {allActivities.map((activity) => (
//       <option key={activity.id} value={activity.name}>{activity.name}</option>
//    ))}
// </select>
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterContinent, filterActividades, getActivities } from '../Redux/Actions';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Card from './Card';
import Paginado from './Pagination';
import "./Home.css"

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const allActivities = useSelector((state) => state.activities)

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState("");


  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleFilterContinent(e) {
    e.preventDefault();
    dispatch(filterContinent(e.target.value));
  }

  function handleFilterActivities(e){
    e.preventDefault();
    setSelectedActivity(e.target.value);
    dispatch(filterActividades(e.target.value))
  }

  const indexOfLastCountry = currentPage * (currentPage === 1 ? 9 : 10);
  const indexOfFirstCountry = indexOfLastCountry - (currentPage === 1 ? 9 : 10);
  const currentCountries = allCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );



  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <Link to="/activities"></Link>
      <h1>Countries</h1>
      <button onClick={(e) => handleClick(e)}>
        Volver a cargar Countries
      </button>
      <div>
        <SearchBar />
      </div>
      
      <div>
        <select onChange={(e) => handleFilterContinent(e)}>
          <option value="All"> All </option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Antarctic">Antarctic</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

        <select>
          <option value="default">Orden</option>
          <optgroup label="Population">
            <option value="asc">Country por population</option>
            <option value="des">Country por population</option>
          </optgroup>
          <optgroup label="Alphabetic">
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </optgroup>
        </select>

      
        <select value={selectedActivity} onChange={(e) => handleFilterActivities(e)}>
          <option value=""> All </option>
          {allActivities.map(activity => (
            <option key={activity.id} value={activity.name}>{activity.name}</option>
          ))}
        </select>

      </div>

      
      <div>
      <Paginado
        countriesPerPage={currentPage === 1 ? 9 : 10}
         allCountries={allCountries}
        paginate={paginate}
        />
      </div>

  <div className="cards-wrapper">
  <div className="cards-container">
    {currentCountries?.map((el) => {
      return (
        <div className="card-container" key={el.id}>
          <Card
        image={el.image}
        name={el.name}
        continent={el.continent}
        id={el.id}
      />
        </div>
      );
    })}
  </div>
</div>

    </div>
  );
}


// import React, { useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getCountries, filterContinent } from '../Redux/Actions';
// import { Link } from 'react-router-dom';
// import SearchBar from './SearchBar';
// import Card from './Card';
// import style from "./Home.css"

// export default function Home () {
//     const dispatch = useDispatch()
//     const allCountries = useSelector((state) => state.countries)

//     const [currentPage, setCurrentPage] = useState(1);
//     const [countriesPerPage, setCountriesPerPage] = useState(9);


//     useEffect(() => {
//         dispatch(getCountries());
//     },[dispatch])

//     function handleClick(e){
//         e.preventDefault();
//         dispatch(getCountries())
//     }

//      function handleFilterContinet(e){
//         e.preventDefault()
//         dispatch(filterContinent(e.target.value))
//      }

// return(
//     <div>
//         <Link to='/activities'> </Link>
//         <h1>Countries</h1>
//         <button onClick={e => {handleClick(e)}}>
//             Volver a cargar Countries
//         </button>
//         <div>
//         <SearchBar />
//         </div>
//         <div>
//         <select onChange={e => handleFilterContinet(e)}>
//             <option value='All'> All </option>
//             <option value='Africa'>Africa</option>
//             <option value='Americas'>Americas</option>
//             <option value='Antarctic'>Antarctic</option>
//             <option value='Asia'>Asia</option>
//             <option value='Europe'>Europe</option>
//             <option value='Oceania'>Oceania</option>
//         </select>

//         <select >

//         </select>

//                 <select >
//             <option value="default">Orden</option>
//             <optgroup label='Population'>
//             <option value='asc'>Country por population</option>
//             <option value="des">Country por population</option>
//             </optgroup>
//             <optgroup label='Alphabetic'>
//             <option value="az">A-Z</option>
//             <option value="za">Z-A</option>
//             </optgroup>
//         </select>

//         </div>

//         <div>
//             {allCountries?.map((el) => {
//                 return(
//                     <div className={`${style.container_card}`} key={el.id}>
//                         <Card 
//                             image={el.image}
//                             name={el.name}
//                             continent={el.continent}
//                             id={el.id}
//                         />
//                     </div>
//                 )
//             })}
            
             

            
//         </div>
//         <div></div>
//     </div>
   
// )

// }