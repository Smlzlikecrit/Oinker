import { Profile } from '../Profile'
import { MockContainer } from './Profile.mocks'
export default {
    title: 'views/Profile'
}

export const Default = () => (
    <MockContainer>
        <Profile />
    </MockContainer>
)