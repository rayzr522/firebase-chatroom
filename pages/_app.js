import '../styles/globals.css'
import {UserContext} from '../lib/use-user'
import useLocalStorageState from 'use-local-storage-state'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useLocalStorageState('temp_username')

  return <UserContext.Provider value={[user, setUser]}>
    <Component {...pageProps} />
  </UserContext.Provider>
}

export default MyApp
