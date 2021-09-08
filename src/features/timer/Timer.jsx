import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from './CircularProgress';
import TimerSelector from './TimerSelector';
import TimerSettings from './TimerSettings';
import TimerControls from './TimerControls';
import Announcer from '../common/Announcer';
import useSound from 'use-sound';
import alarmJingle from '../../assets/alarmJingle.mp3'

import { defaultTimerConfig } from '../../config/timer';

const Timer = () => {
    const [timerConfigurations, setTimerConfigurations] = useState(defaultTimerConfig);
    const [selectedTimer, setSelectedTimer] = useState(Object.keys(defaultTimerConfig)[0]);
    const [secondsLeft, setSecondsLeft] = useState(timerConfigurations[selectedTimer]);
    const [secondsTotal, setSecondsTotal] = useState(timerConfigurations[selectedTimer]);
    const [active, setActive] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);
    const [play, { stop }] = useSound(alarmJingle);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // for screen readers
    const [announcement, setAnnouncement] = useState('');

    const resetTimer = useCallback(() => {
        setActive(false);
        setSecondsLeft(timerConfigurations[selectedTimer]);
        setSecondsTotal(timerConfigurations[selectedTimer]);
    }, [selectedTimer, timerConfigurations]);

    useEffect(() => {
        resetTimer();
        stop();
    }, [selectedTimer, timerConfigurations, resetTimer, stop]);

    useEffect(() => {
        if (active) {
            setAnnouncement('timer started');
        }
        if (!active && !timerComplete) {
            setAnnouncement('timer paused');
        }
        if (!active && timerComplete) {
            setAnnouncement('timer complete');
            play();
        }
    }, [active, timerComplete, play]);

    useEffect(() => {
        let timer = null;
        if (active) {
            timer = setInterval(() => {
                if (secondsLeft > 0) {
                    setSecondsLeft(secondsLeft - 1);
                    setTimerComplete(false);
                }
                if (secondsLeft === 0) {
                    clearInterval(timer);
                    setActive(false);
                    setTimerComplete(true);
                }
            }, 1000);
        } else if (!active && secondsLeft !== 0) {
            clearInterval(timer);
            setTimerComplete(false);
        }
        return () => {
            clearInterval(timer);
        };
    }, [active, secondsLeft]);

    return (
        <TimerContainer>
            <AppTitle>Pomodoro Timer</AppTitle>
            <Announcer>{announcement}</Announcer>
            <TimerSelector 
                timerConfigurations={timerConfigurations}
                selectedTimer={selectedTimer} 
                setSelectedTimer={setSelectedTimer}/>
            <CircularProgress
                secondsLeft={secondsLeft}
                secondsTotal={secondsTotal}
                active={active}/>
            <TimerControls
                active={active}
                setActive={setActive}
                resetTimer={resetTimer}
                setSettingsOpen={setSettingsOpen}/>
            <TimerSettings
                timerConfigurations={timerConfigurations}
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                setTimerConfigurations={setTimerConfigurations}/>
        </TimerContainer>
    )
}

const AppTitle = styled.h1`
text-align: center;
margin-top: 1rem;
`

const TimerContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

export default Timer
