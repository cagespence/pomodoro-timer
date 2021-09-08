import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCircularProgressConfig } from "../../utilities/circularProgressConfig";
import { getTimeString } from "../../utilities/timeFormatting";
import { useConstrainToWindow } from "../../utilities/useConstrainToWindow";

const CircularProgress = ({secondsLeft, secondsTotal, active }) => {

    const maxWidth = 500;
    const strokeWidth = maxWidth / 40;

    const [width] = useConstrainToWindow(maxWidth);
    const [percentComplete, setPercentComplete] = useState(0);

    useEffect(() => {
        const elapsed = secondsTotal - secondsLeft;
        const percentage = (elapsed / secondsTotal) * 100;
        setPercentComplete(percentage);
    }, [secondsLeft, secondsTotal]);

    const { 
        radius, 
        viewBox, 
        dashArray, 
        dashOffset 
    } = getCircularProgressConfig(strokeWidth, width, percentComplete);

    const { 
        formatted, 
        minutes, 
        seconds 
    } = getTimeString(secondsLeft);

    return (
        <ProgressWrapper 
            tabIndex='0'
            role='progressbar' 
            aria-label={`${minutes} minutes and ${seconds} seconds`}
            aria-valuenow={percentComplete} 
            aria-valuemin="0" 
            aria-valuemax="100" 
            aria-busy={active} 
            aria-describedby='timer-text'
            >
            <svg
                width={width}
                height={width}
                viewBox={viewBox}>
                <title>Progress of timer</title>
                <CircleBackground
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`} />
                <CircleProgress
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    // Start progress marker at 12 O'Clock
                    transform={`rotate(-90 ${width / 2} ${width / 2})`}
                    dashArray={dashArray}
                    dashOffset={dashOffset}
                />
                <CircleText
                    id='timer-text'
                    role="timer" 
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                    size={width}>
                    {formatted}
                </CircleText>
            </svg>
        </ProgressWrapper>
    );
}

const ProgressWrapper = styled.div`
`

const CircleBackground = styled.circle`
    fill: none;
    stroke: ${props => props.theme.colors.primaryShade};
`

/* 
 * attrs are used here because stroke-dashoffset is 
 * updated every second, generating many new classes
 * 
 * attrs provide a way to access the styles directly
 * and update without creating new classes
 */
const CircleProgress = styled.circle.attrs(({ dashOffset }) => ({
    strokeDashoffset: dashOffset
}))`
    fill: none;
    stroke: ${props => props.theme.colors.accent};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: ${props => props.dashArray};
`

const CircleText = styled.text.attrs(({ size }) => ({
    fontSize: `${((size / 500) * 3)}rem`
}))`
    font-weight: bold;
    fill: ${props => props.theme.colors.text};
`

export default CircularProgress;
