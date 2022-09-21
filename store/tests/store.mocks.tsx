import { Provider, createStore } from '../store'
import * as types from '../store.types'
import { faker } from '@faker-js/faker'

const API = {}

const num = (min: number, max: number) => faker.datatype.number({ min, max})

const OINK_IDS = faker.datatype.array(300).map(() => faker.datatype.uuid())
const PROFILE_IDS = faker.datatype.array(50).map(() => faker.datatype.uuid())

const createMockProfile = (id: string): types.profile => ({
    key: id,
    bio: faker.lorem.paragraph(),
    coverImg: new Blob(['']),
    displayName: faker.name.fullName(),
    followerIds: faker.helpers.arrayElements(PROFILE_IDS, 20),
    followingIds: faker.helpers.arrayElements(PROFILE_IDS, 10),
    oinkIds: faker.helpers.arrayElements(OINK_IDS, 50),
    profileImg: new Blob(['']),
})

const createMockOink = (id: string): types.oink => ({
    key: id,
    createdDate: faker.date.past(),
    images: faker.datatype.array(5).map(() => new Blob([''])),
    profileId: faker.helpers.arrayElement(PROFILE_IDS),
    text: faker.lorem.sentence(),
})


export const MockContainer = (props: { children: JSX.Element }) => {
    const { children } = props
    const store = createStore(API)

    const [profile, ...restOfProfiles] = PROFILE_IDS.map((id) => createMockProfile(id))

    store.setState({
        feed: OINK_IDS.slice(0, 30).map(id => createMockOink(id)),
        profile,
        following: restOfProfiles,

    })
    return <Provider value={store}>{children}</Provider>
}

// `https://picsum.photos/${num(100, 600)}/${num(100, 600)}`
