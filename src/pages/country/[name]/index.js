import Image from 'next/image'
import Error from "next/error"
import {BsArrowLeft} from 'react-icons/bs';
import { useRouter } from "next/router";
import { useState } from 'react';

import { useCountry } from '../../../context/countryState';

const Country = ({country, error}) => {
  
    const {toggled} = useCountry();


    if(error && error.statusCode) 
    return <Error 
    statusCode={error.statusCode} title={error.statusText} 
    />;

    const [bordersc,setBorder] = useState([])
    
    //algoritmo para retornar un array que contenga los nombres de los paises
    

   const back=(e)=>{
        e.preventDefault();
        window.history.back();
   }

   //Variables para light theme
   let button_back_country;
   let country__name;
   let card_desc;
   let card_desc_span;
   let main;

   if(toggled){
        button_back_country = 'button_back_country__light' ;
        country__name = 'country__name__light';
        card_desc = 'card_desc__light';
        card_desc_span = 'card_desc_span__light';
        main='main__light';
   }else{
     button_back_country = 'button_back_country' ;
     country__name = 'country__name';
     card_desc = 'card_desc';
     card_desc_span = 'card_desc_span';
     main='main';
   }


    return ( 
        <section className={`${main} sm:h-screen py-10 flex flex-col items-center`}>
            <div className="max-w-7xl w-4/5 sm:w-11/12">
               
                <button 
                    onClick={back}
                    className={`${button_back_country} inline-flex items-center rounded-md cursor-pointer px-8 py-2 shadow-md shadow-VeryDarkBlue2`}>
                    <BsArrowLeft color={toggled ? 'black' : 'white'} className='mr-2'/>
                    Back
                </button>

                <div className='grid grid-cols-1 sm:grid-cols-2 py-16 gap-6 sm:gap-12'>
                    <div className='h-60 sm:h-72 relative mr-10 w-full'>
                        <Image className='' src={country[0].flags.png} alt={ country[0].name } layout='fill' placeholder="blur" blurDataURL={country[0].flags.png}/>
                    </div>
                    <div className='px-4 py-4'>
                        <h2 className={`${country__name} text-2xl`}>{country[0].name}</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Native Name: <span className={`text-xs ${card_desc_span}`}>{country[0].nativeName ? country[0].nativeName : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Population:  <span className={`text-xs ${card_desc_span}`}>{country[0].population ? country[0].population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Region:  <span className={`text-xs ${card_desc_span}`}>{country[0].region ? country[0].region : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Sub Region:  <span className={`text-xs ${card_desc_span}`}>{country[0].subregion ? country[0].subregion : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Capital:  <span className={`text-xs ${card_desc_span}`}>{country[0].capital ? country[0].capital : 'None'}</span>
                                </p>
                            </div>
                            <div>
                            <p className={`mt-2 text-xs ${card_desc}`}>
                                    Top Level Domain:  <span className={`text-xs ${card_desc_span}`}>{country[0].topLevelDomain ? country[0].topLevelDomain : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Currencies:  <span className={`text-xs ${card_desc_span}`}>{country[0].currencies ? country[0].currencies[0].name : 'None'}</span>
                                </p>
                                <p className={`mt-2 text-xs ${card_desc}`}>
                                    Languages: {country[0].languages ? country[0].languages.map(((language,index) =>
                                        <span key={language.name} className={`text-xs ${card_desc_span}`}>{(index ? ', ' : '') + language.name}
                                        </span> 
                                        )) : 'None'}
                                    
                                </p>
                            </div>
                        </div>
                           
                        <div className='mt-4 flex flex-col sm:flex-row'>
                        <p className={`mt-2 text-xs ${card_desc}`}>
                                    Border Countries:  
                                </p>
                                <div className={`${card_desc} text-xs flex flex-wrap  justify-between items-center`}>
                                  {country[0].borders ? country[0].borders.map(border =>
                                         <span className={`${button_back_country} inline-flex items-center rounded-md cursor-pointer px-2 py-1 ml-2 mt-2  shadow-md shadow-VeryDarkBlue2`}>{border}</span>
                                        ) :  <span className={`text-xs ${card_desc_span}`}>None</span>}
                                </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
     );
}
 
export default Country;


export async function getServerSideProps({query: {name}}) {


    const res = await fetch(`https://restcountries.com/v2/name/${name}`);

    const country = await res.json();
    if(country.status === 404){
        return {
            props: {
                error:{
                    statusCode: res.status,
                    statusText: 'El servicio no funciona en estos momentos',
                },
            }
        }
    } else {
        return {
            props: {
                country
            }
        }
    }
    
}