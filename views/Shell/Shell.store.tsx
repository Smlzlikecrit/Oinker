import { createStore as createZustandStore, StoreApi } from 'zustand'
import { createContext } from 'react'
import { createApi, types as userTypes } from '../../environments/api/user'
import * as types from './Shell.types'

export const context = createContext({} as StoreApi<types.store>)
export const { Provider } = context

const createTypedStore = createZustandStore<types.store>()

export const createStore = (api: userTypes.api): StoreApi<types.store> => {
    const store = createTypedStore((set, get) =>({
        phase: 'loading',
        sentEmail: null,
        
        goTo: {
            authenticating: () => set({ phase: 'authenticating', sentEmail: null}),
            creating: () => set({ phase: 'creating'}),
            resetting: () => set({ phase: 'resetting'}),
        },

        signIn: async (props) => {
            const response = await api.signIn(props) 
            if (response.status === 'error') return response.error
            set({ phase: 'accessed' })
            return null
        },

        signOut: async () => {
            await api.signOut() 
            set({ phase: 'authenticating' })
        },

        signUp: async (props) => {
            const response = await api.signUp(props) 
            if (response.status === 'error') return response.error
            set({ phase: 'emailed-confirm', sentEmail: props.email})
            return null
        },

        resetPassword: async (props) => {
            set({ phase: 'emailed-reset', sentEmail: props.email})
            await api.resetPassword(props)
        },
        
        resendEmail: async (props) => {
            const { phase } = get()
            if (phase === 'emailed-reset') return await api.resetPassword(props)
            if (phase === 'emailed-confirm') return await api.resendConfirmation(props)
            throw new Error('Invalid phase')
        }
    }))

    const mount = async () => {
        const user = await api.getUser()
        if (!user) return store.setState({ phase: 'authenticating'})

        store.setState({ 
            phase: 'accessed',
            })
    }

    mount ()
    return store
}


export const Container = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(createApi())
    return <Provider value={store}>{children}</Provider>
}