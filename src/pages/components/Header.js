import {MdOutlineDarkMode,MdDarkMode} from 'react-icons/md';
import { useRouter } from "next/router";
import { useState } from 'react';
import { useCountry } from '../../context/countryState';

export const Header = ({children}) => {

    const {toggled, setToggled} = useCountry();
    const router = useRouter();

    let header;
    let title_header;

    if(toggled){
        header ='header__light'
        title_header='title_header__light'
    }else{
        header ='header'
        title_header='title_header'
    }
    return ( 
        <>
            <header className={`${header} flex justify-center`}>
                <div className="flex flex-row items-center justify-between  py-4 max-w-7xl w-11/12">
                    <h1 className={`${title_header} text-base sm:text-xl cursor-pointer`} onClick={() => router.push('/')}>Where in the world?</h1>
                    
                    {toggled ? 
                     <button className='button_header__light inline-flex items-center rounded-sm cursor-pointer' onClick={() => setToggled(!toggled)}>
                        <MdDarkMode  className='mr-2'/>
                        Dark Mode
                     </button>
                    :(
                    <button className='button_header text-xs sm:text-base inline-flex items-center rounded-sm cursor-pointer' onClick={() => setToggled(!toggled)}>
                        <MdOutlineDarkMode color='white' className='mr-2'/>
                        Light Mode
                    </button>
                    )}
                </div>
            </header>
            {children}
        </>
     );
}
 
