import styled from 'styled-components';

import Theme from './features/common/Theme'
import Timer from './features/timer/Timer';

function App() {
  return (
    <Theme>
      <Container>
        <Timer />
      </Container>
    </Theme>
  );
}

const Container = styled.div`
height: 100vh;
background-color: ${props => props.theme.colors.primary};
`

export default App;
