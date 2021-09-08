import { Fragment } from "react"
import styled from "styled-components"
import { Button } from "./Button"

const RadioButton = ({label, selected, handleSelect}) => {
    return (
        <Fragment key={`radio-${label}`}>
            <Radio 
                value={label}
                role='radio' 
                aria-checked={selected === label}
                checked={selected === label}
                onClick={handleSelect}>
                {label}
            </Radio>
        </Fragment>
    )
}  

const Radio = styled(Button)`
    width: auto;
    margin: 1rem;
    background-color: ${({ checked, theme }) => checked ? theme.colors.accent : theme.colors.primaryShade} !important;
    color: ${({ checked, theme }) => checked ? theme.colors.primary : theme.colors.text} !important;
    &:hover {
        background-color: ${({ checked, theme }) => checked ? theme.colors.accent : theme.colors.primary} !important;
        color: ${({ checked, theme }) => checked ? theme.colors.primary : theme.colors.text} !important;
    }
    transition: all 200ms;
`

export default RadioButton
