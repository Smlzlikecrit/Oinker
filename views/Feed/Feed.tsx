import { useContext } from 'react'
import { useStore } from 'zustand'
import { context } from '../../store'


export const Feed = () => {
    const store = useContext(context)
    const feed = useStore(store, state => state.feed)
    console.log(feed)
    return <div>Feed</div>
}

export default Feed