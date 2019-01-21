const posDotVec = (pos, vec) =>
  pos.map((p, i) => p * vec[i]).reduce((a, b) => a + b, 0);

const interpolate = (a0, a1, t) => {
  const u = t * t * (3.0 - 2.0 * t);
  return (1 - u) * a0 + u * a1;
};

const length = v => Math.sqrt(v.map(a => a * a).reduce((a, b) => a + b, 0));

const diff = (p0, p1) => p0.map((p, i) => p - p1[i]);

const normalize = v => {
  const k = 1 / length(v);
  return v.map(a => a * k);
};

const createVec = n => {
  const vec = [];
  while (vec.length < n) vec.push(2 * Math.random() - 1);
  return n === 1 ? vec : normalize(vec);
};

const generateGrid = dims => {
  const grid = [];
  const length = dims.reduce((a, b) => a * b, 1);
  while (grid.length < length) {
    grid.push(createVec(dims.length));
  }
  return grid;
};

const pointToIndex = (grid, dims) => {
  const wdims = dims.slice().reverse();
  for (let i in wdims) wdims[i] = i > 0 ? wdims[i] * wdims[i - 1] : wdims[i];
  return grid
    .map((g, i) => (i > 0 ? g * wdims[i - 1] : g))
    .reduce((a, b) => a + b, 0);
};

const perlin = (dims, steps) => {
  const grid = generateGrid(dims);
  const noise = [];

  const pos = dims.map(a => 0);
  const dpos = 1 / steps;
  while (pos[pos.length - 1] < dims[dims.length - 1] * steps) {
    const posGlobal = pos.map(p => p / steps);

    const c0 = posGlobal.map(p => Math.floor(p));
    const c1 = c0.map(p => p + 1);

    const offset = posGlobal.map((p, i) => p - c0[i]);

    let weights = [];
    const is = dims.map(() => 0);
    while (weights.length < 2 ** dims.length) {
      const point = is.map((a, i) => (a === 0 ? c0[i] : c1[i]));
      const index = pointToIndex(point.map((p, i) => p % dims[i]), dims);
      weights.push(posDotVec(diff(posGlobal, point), grid[index]));

      is[0]++;
      for (let i = 0; i < is.length - 1; i++) {
        if (is[i] == 2 && i + 1 < is.length) {
          is[i] = 0;
          is[i + 1]++;
        }
      }
    }
    let n = 0;
    while (n < dims.length) {
      const newWeights = [];
      for (let i = 0; i < weights.length; i += 2) {
        newWeights.push(interpolate(weights[i], weights[i + 1], offset[n]));
      }
      n++;
      weights = newWeights;
    }

    noise.push(weights[0]);

    pos[0] += 1;
    for (let i = 0; i < pos.length - 1; i++) {
      if (pos[i] >= dims[i] * steps && i + 1 < pos.length) {
        pos[i] = 0;
        pos[i + 1]++;
      }
    }
  }

  return noise;
};

export default perlin;
