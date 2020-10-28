import {useContext, createContext} from 'react'

export const UserContext = createContext(null)

export const useUser = () => {
    const [user, setUser] = useContext(UserContext)

    // TODO: auth?

    return [user, setUser]
}
