import Image from 'next/image'
import { useRouter } from "next/router";

import { useCountry } from '../context/countryState';

const Card = ({country}) => {


    const router = useRouter();

    const {toggled} = useCountry();

    //Variables para light mode
    let card__information;
    let card_name;
    let card_desc;
    let card_desc_span;
    let shadow_card;

    if(toggled){
        card__information = 'card__information__light';
        card_name = 'card_name__light';
        card_desc = 'card_desc__light'
        card_desc_span = 'card_desc_span__light'
        shadow_card='shadow_card'

    }else{
        card__information = 'card__information';
        card_name = 'card_name';
        card_desc = 'card_desc'
        card_desc_span = 'card_desc_span'
        shadow_card='';
    }

    return ( 
        <div className={`lg:w-52 xl:w-64 min-w-fit flex flex-col cursor-pointer ${shadow_card}`}
         onClick={() => router.push(`/country/${country.name.common}`)}
         >
            <div className='h-40 relative'>
              <Image className='w-full rounded-t-md' src={country.flags.png} alt={ country.name.common } layout='fill' placeholder="blur" blurDataURL={country.flags.png}/>
            </div>
            <div className={`${card__information} pt-4 pb-10 px-6 rounded-b-md`}>
                <h2 className={`${card_name}`}>{country.name.common}</h2>
                <p className={`mt-2 text-sm ${card_desc}`}>Population: <span className={`text-sm ${card_desc_span}`}>{country.population.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                <p className={`mt-1 text-sm ${card_desc}`}>Region: <span className={`text-sm ${card_desc_span}`}>{country.region}</span></p>
                <p className={`mt-1 text-sm ${card_desc}`}>Capital: <span className={`text-sm ${card_desc_span}`}>{country.capital}</span></p>

            </div>
        </div>
  
     );
}
 
export default Card;