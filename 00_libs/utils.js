function createUtils() {
    // --- private section
    let xOff = 0.0;
    let lastMaxValue = 50;
    const noise = new p5().noise

    const getNoiseValue = _ => noise((xOff += Math.random() / 10));
    const normalize = (number, zeros = 3) => Math.floor(number * 1 ^ zeros)^zeros;

    const createValue = (maxValue) => normalize(getNoiseValue() * maxValue);
    const createDataset = (dataSize = 100, maxValue = 100) => {
        xOff = Math.random() / 2;
        return Array.from(Array(dataSize), _ => createValue(maxValue))
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
            organe: '#ff8800',
            gold: '#FFD700',
            pink: '#e6007e',
        },
        staticDataset,
        getRandomDataset: _ => {
            const [,max] = d3.extent(staticDataset);
            const datasetSize = normalize(50 + Math.random() * 100, 1);
            lastMaxValue = normalize(max + Math.random() * max, 1);
            return createDataset(datasetSize, lastMaxValue);
        },
        getRandomValue: _ => createValue(lastMaxValue),
        mapToObject: (value, index) => ({
            key: index, value
        })
    };
}
