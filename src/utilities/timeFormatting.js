export const getTimeString = (secondsLeft) => {
    const { minutes, seconds } = getMinutesAndSeconds(secondsLeft);
    const formatted = `${padWithZero(minutes)}:${padWithZero(seconds)}`;
    return {
        formatted, 
        minutes, 
        seconds
    };
}

const padWithZero = (duration) => {
    return duration < 10 ? '0' + duration : duration;
}

export const getMinutesAndSeconds = (secondsLeft) => {
    const minutes = ~~(secondsLeft / 60);
    const seconds = secondsLeft - minutes * 60;
    return { minutes, seconds }
}