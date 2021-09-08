export const getCircularProgressConfig = (strokeSize, totalWidth, percentComplete) => {
    // Size of the enclosing square
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (totalWidth - strokeSize) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${totalWidth} ${totalWidth}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentComplete / 100;
    return { radius, viewBox, dashArray, dashOffset };
}