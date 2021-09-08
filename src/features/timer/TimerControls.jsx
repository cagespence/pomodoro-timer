import styled from "styled-components";
import { Button } from "../common/Button";

const TimerControls = ({active, setActive, resetTimer, setSettingsOpen}) => {
    return (
        <TimerControlButtons>
            <Button onClick={() => setActive(!active)}>
                {active ? 'pause timer' : 'start timer'}
            </Button>
            <Button link onClick={resetTimer}>
                reset timer
            </Button>
            <Button link onClick={() => setSettingsOpen(true)}>
                settings
            </Button>
        </TimerControlButtons>
    )
};

const TimerControlButtons = styled.div`
    display: flex;
    flex-direction: column;
    width: 10rem;
    align-items: center;
    top: 60%;
    width: 100%;
    /* margin: 1rem; */
`

export default TimerControls;
