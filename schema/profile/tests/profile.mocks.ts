import { faker } from '@faker-js/faker'
import * as types from '../profile.types'


export const PROFILE_IDS = faker.datatype.array(50).map(() => faker.datatype.uuid())

export const createMockProfile = (props?: {
    id?: string,
    oinkIds?: string[],
    }): types.schema => {
        const { id, oinkIds } = props || {}
    return {
        key: id || faker.datatype.uuid(),
        bio: faker.lorem.paragraph(),
        coverImg: new Blob(['']),
        displayName: faker.name.fullName(),
        followerIds: faker.helpers.arrayElements(PROFILE_IDS, 20),
        followingIds: faker.helpers.arrayElements(PROFILE_IDS, 10),
        oinkIds: 
        oinkIds ? 
            faker.helpers.arrayElements(oinkIds, 50) : 
            faker.datatype.array(50).map(() => faker.datatype.uuid()),
        profileImg: null,
    }
}

