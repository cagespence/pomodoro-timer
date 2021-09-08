import { createGlobalStyle, ThemeProvider } from 'styled-components'

import { theme } from '../../theme'

const GlobalStyle = createGlobalStyle`
html {
    color: ${props => props.theme.colors.text};
    background-color: ${props => props.theme.colors.primary};
    font-family: ${props => props.theme.typography.family};
    font-size: ${props => props.theme.typography.baseSize}
}
`

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    )
}

export default Theme
