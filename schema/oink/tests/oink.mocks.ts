import { faker } from '@faker-js/faker'
import * as types from '../oink.types'

export const OINK_IDS = faker.datatype.array(300).map(() => faker.datatype.uuid())


export const createMockOink = (props?: {
    id?: string,
    profileIds?: string[]
}): types.schema => {
    const { id, profileIds } = props || {}

    return {
        key: id || faker.datatype.uuid(),
        createdDate: faker.date.past(),
        images: faker.datatype.array(5).map(() => new Blob([''])),
        profileId: profileIds ? faker.helpers.arrayElement(profileIds) : faker.datatype.uuid(),
        text: faker.lorem.sentence(),
    }
    
}