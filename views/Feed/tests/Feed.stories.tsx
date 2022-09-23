import { Feed } from '../Feed'
import { MockContainer as Shell } from '../../Shell/tests/Shell.mocks'
import { MockContainer} from './Feed.mocks'


const Provider = (props: { children: JSX.Element }) => {
    return (
        <Shell>
            <MockContainer>
                {props.children}
            </MockContainer>
        </Shell>
    )
}

export default {
    title: 'views/Feed'
}

export const Default = () => <Provider><Feed /></Provider>