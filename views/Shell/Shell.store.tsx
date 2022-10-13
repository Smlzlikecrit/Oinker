import { createStore as createZustandStore, StoreApi } from 'zustand'
import { createContext } from 'react'
import { createApi, types as userTypes } from '../../environments/api/user'
import * as types from './Shell.types'

export const context = createContext({} as StoreApi<types.store>)
export const { Provider } = context

const createTypedStore = createZustandStore<types.store>()

export const createStore = (api: userTypes.api): StoreApi<types.store> => {
    const store = createTypedStore(() =>({
        phase: 'loading',
    }))

    const mount = async () => {
        const user = await api.getUser()
        if (!user) return store.setState({ phase: 'logging-in'})
        store.setState({ phase: 'logged-in'})
    }

    mount ()
    return store
}


export const Container = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(createApi())
    return <Provider value={store}>{children}</Provider>
}