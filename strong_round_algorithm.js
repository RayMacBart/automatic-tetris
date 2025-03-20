'use strict';

const checkDepthList = () => {
    let depthList = [];
    for (const col of occupation) {
        depthList.push(col.findIndex(field => field));
    }
    depthList = depthList.map(depth => depth === -1 ? 15 : depth);
    return depthList;
}

const getIndexOfMax = (array) => {
    const max =  array.reduce((a, b) => Math.max(a, b));
    return array.findIndex(item => item === max);
}

const seekDouble = (depthList, focusIndex, cuttedIndexes, recursionDepth) => {
    recursionDepth++;
    for (let i = 0; i < depthList.length; i++) {  // loop only goes until second last!
        if (!cuttedIndexes.has(i)) {
            if ((focusIndex === i) && (depthList[i] === depthList[i+1])) {
                return i;
            }
        }
    }
    if (recursionDepth <= 3) {
        cuttedIndexes.add(focusIndex);
        const depthCache = {};
        for (const cutIdx of cuttedIndexes) {
            depthCache[cutIdx] = depthList[cutIdx];
            depthList[cutIdx] = 0;
        }
        focusIndex = getIndexOfMax(depthList);
        for (const cutIdx of cuttedIndexes) {
            depthList[cutIdx] = depthCache[cutIdx];
        }
        return seekDouble(depthList, focusIndex, cuttedIndexes, recursionDepth);
    }else {
        return -1;
    }
}

const calcHorRound = (depthList) => {
    const focusIndex = getIndexOfMax(depthList);
    const cuttedIndexes = new Set();
    let col = seekDouble(depthList, focusIndex, cuttedIndexes, 0);
    if (col >= 0) {
        return col;
    }else {
        console.log('no double found!');
        let doubleDepths = [];
        doubleDepths.push(Math.min(depthList[0], depthList[1]));
        doubleDepths.push(Math.min(depthList[1], depthList[2]));
        doubleDepths.push(Math.min(depthList[2], depthList[3]));
        return getIndexOfMax(doubleDepths);
    }
};


const calcRound = (dir) => (dir === 'ver') ? getIndexOfMax(checkDepthList()) : calcHorRound(checkDepthList());
