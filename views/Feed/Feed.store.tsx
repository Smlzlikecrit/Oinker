import { createStore as createZustandStore, StoreApi } from 'zustand'
import { createContext } from 'react'
import * as types from './Feed.types'

export const context = createContext({} as StoreApi<types.store>)
export const { Provider } = context

const createTypedStore = createZustandStore<types.store>()

export const createApi = (): types.api =>  ({
    getOinks: () => Promise.resolve([] as types.oink.schema[]),
    getProfiles: () => Promise.resolve([] as types.profile.schema[])
})

export const createStore = (api: types.api): StoreApi<types.store> => {
    const store = createTypedStore(() =>({
        phase: 'loading',
        feed: null,
        profiles: null,
    }))

    const mount = async () => {
        const feed = await api.getOinks()
        const profiles = await api.getProfiles()
        store.setState({ phase: 'resting', feed, profiles })
    }

    mount ()
    return store
}


export const Container = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(createApi())
    return <Provider value={store}>{children}</Provider>
}