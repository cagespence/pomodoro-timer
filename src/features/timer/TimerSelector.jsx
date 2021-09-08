import { Fragment } from "react";
import styled from "styled-components";
import RadioButton from "../common/RadioButton"

const TimerSelector = ({
    timerConfigurations,
    selectedTimer,
    setSelectedTimer,
}) => {

    const handleSelectTimer = (event) => {
        setSelectedTimer(event.target.value);
    };

    return (
        <RadioGroup role='group' tabindex='0' aria-label={`timer type`}>
            {Object.entries(timerConfigurations).map(
                ([option, duration]) => (
                    <Fragment key={`option-${option}`}>
                        <RadioButton 
                            label={option}
                            duration={duration}
                            selected={selectedTimer} 
                            handleSelect={handleSelectTimer}
                        />
                    </Fragment>
                )
            )}
        </RadioGroup>
    )
}

const RadioGroup = styled.div`
position: relative;
display: inline-flex;
flex-wrap: wrap;
justify-content: center;
margin: 1rem 0;
background-color: ${props => props.theme.colors.primaryShade};
border-radius: 5rem;
@media (max-width: 500px) {
    border-radius: 0;
}
`

export default TimerSelector
