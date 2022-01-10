import { createContext, useContext, useState } from "react";

export const CountryContext =  createContext();

export const useCountry = () => useContext(CountryContext);
    

export const CountryProvider = ({children}) => {
   

    //Light mode
    const [toggled, setToggled]= useState(false);

    return (
        <CountryContext.Provider value={{toggled, setToggled}}>
            {children}
        </CountryContext.Provider>
    )
}