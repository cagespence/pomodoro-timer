import styled from "styled-components";

export const Button = styled.button.attrs(({link, theme}) => ({
    style: {
        backgroundColor: link ? theme.colors.primary : theme.colors.text,
        color: link ? theme.colors.text : theme.colors.primary,
        textDecoration: link ? 'underline' : 'none',
        padding: link ? '0 1rem' : '1rem 2rem',
        margin: link ? '.5rem' : '1rem'
    }
}))`
    background-color: ${({ theme }) => theme.colors.text};
    &:hover {
        background-color: ${({theme, link}) => {
            return link ? theme.colors.primary : theme.colors.accent
        }} !important;
    }
    color: ${({ theme }) => theme.colors.primary};
    border: none;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 10rem;
    /* margin: .5rem 0; */
    cursor: pointer;
    width: 10rem;
`