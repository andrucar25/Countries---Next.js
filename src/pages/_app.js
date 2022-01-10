import { CountryProvider } from '../context/countryState'
import '../styles/globals.css'
import '../styles/Spinner.css'
import {Header} from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <CountryProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </CountryProvider>
  
  )
 
}

export default MyApp
