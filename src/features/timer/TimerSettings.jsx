import { useState } from "react"
import styled from "styled-components";
import { getMinutesAndSeconds } from "../../utilities/timeFormatting";
import { Button } from "../common/Button";

const TimerSettings = ({
    timerConfigurations, 
    setTimerConfigurations,
    settingsOpen,
    setSettingsOpen,
}) => {

    const [tempTimerConfig, setTempTimeConfig] = useState(timerConfigurations);

    const handleSaveOptions = () => {
        setTimerConfigurations(tempTimerConfig);
        setSettingsOpen(false);
    };

    const handleCancel = () => {
        setSettingsOpen(false);
    };

    return (
        <SettingsWrapper open={settingsOpen}>
            <SettingsDialogue tabIndex='0' role='group' aria-label='timer settings'>
                <h2>timer settings</h2>
                <Settings>
                    {Object.keys(timerConfigurations).map((timerName) => {
                        const durationInSeconds = tempTimerConfig[timerName];
                        const { minutes, seconds } = getMinutesAndSeconds(durationInSeconds);
                        return (
                            <InputWrapper key={`setting-${timerName}`}>
                                <InputLabel htmlFor={`setting-${timerName}`} aria-label={`${timerName} ${minutes} minutes and ${seconds} seconds`}>
                                    {timerName} 
                                </InputLabel>
                                <NumberInput
                                    id={`setting-${timerName}`}
                                    type='number'
                                    min='0.1'
                                    // show duration in minutes, so divide by 60
                                    value={durationInSeconds / 60} 
                                    onChange={({target}) => {
                                        const updated = {...tempTimerConfig};
                                        // save duration in seconds, multiply by 60
                                        updated[timerName] = parseInt(target.value * 60, 10); 
                                        setTempTimeConfig(updated);
                                    }}
                                />              
                            </InputWrapper>
                        )
                    })}
                </Settings>
                <SettingsButtons>
                    <Button link onClick={handleCancel}>cancel</Button>
                    <Button onClick={handleSaveOptions}>save settings</Button>
                </SettingsButtons>
            </SettingsDialogue>
        </SettingsWrapper>
    )
}

const SettingsWrapper = styled.div.attrs(({ open }) => ({
    style: {
        display: open ? 'flex' : 'none'
    }
}))`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #20202080;
    justify-content: center;
    align-items: center;
`

const SettingsDialogue = styled.div`
    background-color: ${({theme}) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    padding: 1rem .5rem 0 .5rem;
    color: ${({ theme }) => theme.colors.text};
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Settings = styled.div`
    display: flex;
    margin: 1rem 0;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
`

const InputLabel = styled.label`
    /* font-size: 1.5rem; */
`

const SettingsButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-end;
width: 100%;
`

const NumberInput = styled.input`
width: 5rem;
padding: 0 .5rem;
border: 3px solid ${({theme}) => theme.colors.primaryShade};
color: ${({ theme }) => theme.colors.text};
font-size: 1.5rem;
border-radius: 2rem;
// remove arrows
&::-webkit-outer-spin-button,
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
-moz-appearance: textfield;
`
export default TimerSettings
