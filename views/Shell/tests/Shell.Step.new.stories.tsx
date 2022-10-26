import { createStep } from "../Shell.Step";
import { MockContainer } from "./Shell.mocks";

export default {
  title: "views/Shell/Step",
};


const Step = createStep<'hello' | 'world'>()

export const Default = () => (
  <MockContainer>
    <Step 
      label='hello world'
      inputs={{
        hello: 'Hello',
        world: {
          label: 'World',
          type: 'passowrd'
        }
      }}
      buttons={{
        Cancel: () => console.log('cancel'),
        Submit: {
          action: true,
          primary: true
        }
      }}
      onSubmit={ async (response) => {
        console.log(response)
        return null
      }
    }
    />
  </MockContainer>
);


export const Message = () => (
  <MockContainer>
    <Step 
      label='hello world'
      inputs={{
        hello: 'Hello',
        world: {
          label: 'World',
          type: 'passowrd'
        }
      }}
      buttons={{
        Cancel: () => console.log('cancel'),
        Submit: {
          action: true,
          primary: true
        }
      }}
      onSubmit={ async (response) => {
        console.log(response)
        return 'Something went wrong'
      }
    }
    />
  </MockContainer>
);

export const DelayedMessage = () => (
  <MockContainer>
    <Step 
      label='hello world'
      inputs={{
        hello: 'Hello',
        world: {
          label: 'World',
          type: 'passowrd'
        }
      }}
      buttons={{
        Cancel: () => console.log('cancel'),
        Submit: {
          action: true,
          primary: true
        }
      }}
      onSubmit={(response) => new Promise((resolve) => {
        console.log(response)

        setTimeout(() => resolve('Something went wrong, after awhile'),
          2000,
        )
    })}
    />
  </MockContainer>
);