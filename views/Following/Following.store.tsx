import { createStore as createZustandStore, StoreApi } from 'zustand'
import { createContext } from 'react'
import * as types from './Following.types'

export const context = createContext({} as StoreApi<types.store>)
export const { Provider } = context

const createTypedStore = createZustandStore<types.store>()

export const createApi = (): types.api =>  ({})

export const createStore = (api: types.api): StoreApi<types.store> => {
    const store = createTypedStore(() =>({
        following: [],
    }))

    return store
}


export const Container = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(createApi)
    return <Provider value={store}>{children}</Provider>
}