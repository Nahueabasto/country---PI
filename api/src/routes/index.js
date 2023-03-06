const { Router } = require('express');
const {Country, Activity, Country_Activity } = require ('../db');
const axios = require('axios')
const { Op } = require("sequelize");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


const getApiInfo = async() => {
    const ApiUrl = await axios.get('https://restcountries.com/v3/all')
    const info = await ApiUrl.data.map(el => {
        return {
            id: el.cca3,
            name: el.name,
            image: el.flags,
            continent: el.region,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
        }
    })
    return info;
}


const getDb = async() => {
    return await Country.findAll({
      include: {
        model: Activity,
        attributes: ['id', 'name', 'difficulty', 'duration', 'season'],
        through: {
          attributes: []
        }
      }
    })
  }


  

const getAll = async () => {
  const [apiInfo, dbInfo] = await Promise.all([getApiInfo(), getDb()]);
  const allInfo = [...apiInfo, ...dbInfo];
  return allInfo;
};





//http://localhost:3001/countries?name=Mayotte
router.get('/countries', async (req, res, next) => {
  const { name } = req.query;
  try {
    const countries = await Country.findAll({
      include: Activity
    });

    const result = name
      ? countries.filter((country) =>
          country.name.toString().toLowerCase().includes(name.toLowerCase())
        )
      : countries;

    if (result.length === 0) {
      res.status(404).send('No se encontraron países con ese nombre.');
    } else {
      res.json(result);
    }
  } catch (error) {
    next(error);
  }
});

//////
router.get('/activities', async (req, res, next) => {
  try {
    const activities = await Activity.findAll();
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

// router.get('/countries', async (req, res, next) => {
//   const { name } = req.query;
//   try {
//     const countries = await Country.findAll({
//       include: Activity
//     });

//     const result = name
//       ? countries.filter((country) =>
//           country.name.toString().toLowerCase().includes(name.toLowerCase())
//         )
//       : countries;

//     if (result.length === 0) {
//       res.status(404).send('No se encontraron países con ese nombre.');
//     } else {
//       // Aquí es donde modificamos la respuesta para no devolver un arreglo
//       const response = result.map(country => {
//         const { id, name, capital, population, Activities } = country;
//         const activities = Activities.map(activity => activity.toJSON());
//         return { id, name, capital, population, activities };
//       });
//       res.json(response);
//     }
//   } catch (error) {
//     next(error);
//   }
// });




router.get("/countries/:idPais", async (req, res, next) => {
    try {
      const { idPais } = req.params;
      const allCountries = await getAll();
  
      const country = allCountries.find((c) => c.id === idPais);
  
      if (!country) {
        return res.status(404).json({ message: "País no encontrado" });
      }
  
      const {
        name,
        image,
        continent,
        capital,
        subregion,
        area,
        population,
        activities,
      } = country;
  
      res.json({
        name,
        image,
        continent,
        capital,
        subregion,
        area: `${(area / 1000000).toFixed(2)} millones de km2`,
        population,
        activities,
      });
    } catch (error) {
      next(error);
    }
  });


  router.post('/activities', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
  try {
    const [newActivity, created] = await Activity.findOrCreate({
      where: { name, difficulty, duration, season }
    });

    if (!created) {
      return res.status(409).send('Esta actividad ya existe');
    }
    const countriesList = await Country.findAll({
      where: {
        id: countries
      }
    });
    await newActivity.addCountries(countriesList);
    res.status(201).send('Actividad turística creada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
});
  

  
  

module.exports = router;

