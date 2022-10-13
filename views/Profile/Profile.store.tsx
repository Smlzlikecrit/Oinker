import { createStore as createZustandStore, StoreApi } from 'zustand'
import { createContext } from 'react'
import * as types from './Profile.types'

export const context = createContext({} as StoreApi<types.store>)

export const { Provider } = context

const createTypedStore = createZustandStore<types.store>()

export const createApi = (): types.api =>  ({})

export const createStore = (api: types.api): StoreApi<types.store> => {
    const store = createTypedStore(() => ({
        phase: 'loading',
        count: null,
        profile: null,
        oinks: null,
    }))

    const mount = async () => {
        const [oinks, profile, { count }] = await Promise.all([
            api.getOinks(),
            api.getProfile(),
            api.getOinksAggregates(),
        ])

        store.setState({
            oinks,
            count,
            profile,
            phase: 'resting'
        })
    }

    mount()
    return store
}


export const Container = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(createApi)
    return <Provider value={store}>{children}</Provider>
}