import { useContext } from 'react'
import { useStore } from 'zustand'
import * as types from './Shell.types'
import { context } from './Shell.store'

export const useData = () => {
    const store = useContext(context)
    const phase = useStore(store, state => state.phase)

    return { phase }
}