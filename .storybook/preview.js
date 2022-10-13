import { Storybook } from '../environments/containers/Storybook'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


export const decorators = [
  (Story) => (
    <Storybook>
      <Story />
    </Storybook>
  )
]