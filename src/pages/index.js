import { SP } from 'next/dist/shared/lib/utils';
import { useEffect, useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import Card from './components/Card';
import Spinner from './components/Spinner';

import { useCountry } from '../context/countryState';

export default function Home({countrys}) {

  const {toggled} = useCountry();

  //State data 
  const [countrysList, setCountrysList] = useState([]);

  //Spinner loading
  const[isLoading, setIsLoading] = useState(false);

  //Data not found
  const[errorMessage, setErrorMessage] = useState(false);
  
 

 
  useEffect(() => {
    setCountrysList(countrys);

  }, [])

  //Filtro por region
  const filterByRegion =async(region) =>{
    if(region === '') {
      setErrorMessage(false);
      setIsLoading(true);
      const resall = await fetch('https://restcountries.com/v3.1/all')
      const countrysall = await resall.json();
      setIsLoading(false);
      setCountrysList(countrysall);
      return
    }

    setErrorMessage(false);
    setIsLoading(true);
    const res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    const data = await res.json();

    setIsLoading(false);
    setCountrysList(data);
  } 
  
  //Search
  const searchCountry = async(search) =>{

    if(search.length  === 1 || search.length === 2) return
    else if(search === ''){
     
      setIsLoading(true);
      setErrorMessage(false);
      const resall = await fetch('https://restcountries.com/v3.1/all')
      const countrysall = await resall.json();
      
      // setErrorMessage(false);
      setIsLoading(false);
      setCountrysList(countrysall);
      return
    }

    setErrorMessage(false);
    setIsLoading(true);
    const res = await fetch(`https://restcountries.com/v3.1/name/${search}`);
    const data = await res.json();
    
    if(data.status === 404){

      setIsLoading(false);
      setErrorMessage(true);
      return;
    }
    setErrorMessage(false);
    setIsLoading(false);
    setCountrysList(data);
  }

  //Establecer alto de la pantalla cuando cambian la cantidad de paises
  let heighClass='';
  if(countrysList.length<5){
    heighClass='h-screen';
  }

  //Variables para los estilos
  let main;
  let color;
  let input_main;
  let select_main;

  if(toggled){
    main = 'main__light';
    input_main = 'input_main__light';
    select_main = 'select__main__light';
  }else{
    main='main';
    input_main = 'input_main';
    select_main = 'select__main';
  }
  
  return (

    <>
    
    <main className={`${main} sm:${heighClass} py-10 flex flex-col items-center`}>
         <div className='flex flex-col gap-8 sm:gap-0 sm:flex-row sm:items-center sm:justify-between max-w-7xl w-11/12 '>

          <form action="">
              <div className='relative flex items-center' >
                <AiOutlineSearch color={toggled ? 'black' : 'white'} className='absolute ml-3'/>
                  <input 
                  onChange={ e=>searchCountry(e.target.value) }
                  type="text" 
                  name="search"
                  placeholder="Search for a country..."
                  className={`${input_main} pr-3 pl-10 py-3 font-semibold rounded-md w-80 text-sm`}
                  />
              </div>
            </form>

          <div className='select-wrapper'>
            <select  
              onChange={e => filterByRegion(e.target.value)}
              name="region" className={`${select_main} px-5 py-3 text-sm outline-none rounded-md w-44`}>
                <option value="" >Filter by Region</option>
                <option value="Africa">Africa</option>
                <option value="America">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
          </div>
           

         </div>

        {isLoading ? 
          ( <section className='flex flex-row justify-center py-12 w-11/12 h-screen'>
             <Spinner/>
          </section>
        ) : errorMessage ? (
          <section className='flex flex-row justify-center py-12 w-11/12 h-screen'>
             <p className='title_header text-xl'>The country you are looking for doesn't exist!  </p>
          </section>
          
         ):( 
            <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center py-12 gap-14 w-7/12 sm:w-11/12 '>
            { countrysList.map((country, index)=>
                <Card
                  key={country.name.common}
                  country={country}
                ></Card>
              )
            }
              
          </section>
         )
        }
       
          
       </main>
    </>
       
   
  )
}


export const getServerSideProps = async() =>{
  
  const res = await fetch('https://restcountries.com/v3.1/all')
  const countrys = await res.json();

  return{
    props:{
      countrys,
    }
  }
}
