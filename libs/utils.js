function createUtlis() {
    // --- private section
    let xOff = 0.0;
    const noise = new p5().noise

    const getNoiseValue = () => noise((xOff += Math.random() / 10));
    const normalize = (number, zeros = 3) => Math.floor(number * 1^zeros) / 1^zeros;

    const createValue = (maxValue) => normalize(getNoiseValue() * maxValue);
    const createDataset = (dataSize = 100, maxValue = 100) => {
        xOff = Math.random() / 2;
        return Array.from(Array(dataSize), () => createValue(maxValue))
    };
    const staticDataset = Object.freeze(createDataset(100, 50));

    // --- public return object
    return {
        svgWidth: window.innerWidth * 0.9,
        svgHeight: window.innerHeight * 0.8,
        chartMargins: {
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
        },
        colors: {
            red: '#ff0000',
            green: '#00ff00',
            blue: '#0000ff',
            organe: '#f5af00',
            pink: '#e400f5',
        },
        staticDataset,
        getRandomDataset: () => {
            const [min, max] = d3.extent(staticDataset);
            const datasetSize = normalize(50 + Math.random() * 100, 1);
            const maxValue = normalize(min + Math.random() * max, 1);
            return createDataset(datasetSize, maxValue);
        },
        getRandomValue: (maxValue = 100) => createValue(maxValue),
    };
}
