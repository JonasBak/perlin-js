const demo1d = () => {
  const c = document.querySelector("#canvas-1d").getContext("2d");

  const width = 6;
  const steps = 20;
  const size = 5;
  const noise = perlin([width], steps);
  c.moveTo(0, noise[0] * 100 + 100);
  for (i in noise) {
    c.lineTo(i * size, noise[i] * 100 + 100);
  }
  c.stroke();
};

demo1d();

const demo2d = () => {
  const c = document.querySelector("#canvas-2d").getContext("2d");

  const width = 3;
  const height = 3;
  const steps = 20;
  const size = 10;
  const noise = perlin([width, height], steps);
  for (i in noise) {
    const f = Math.floor((noise[i] + 1) / 2 * 255);
    c.fillStyle = `rgba(${f}, ${f}, ${f}, 1)`;

    c.fillRect(
      (i % (width * steps)) * size,
      Math.floor(i / (width * steps)) * size,
      size,
      size
    );
  }
};

demo2d();

const demo3d = () => {
  const c = document.querySelector("#canvas-3d").getContext("2d");

  const width = 3;
  const height = 3;
  const depth = 10;
  const steps = 20;
  const size = 10;
  const noise = perlin([width, height, depth], steps);

  let d = 0;
  let diff = width * height * steps * steps;
  setInterval(() => {
    for (let i = 0; i < diff; i++) {
      const f = Math.floor((noise[i + diff * d] + 1) / 2 * 255);
      c.fillStyle = `rgba(${f}, ${f}, ${f}, 1)`;

      c.fillRect(
        (i % (width * steps)) * size,
        Math.floor(i / (width * steps)) * size,
        size,
        size
      );
    }
    d = (d + 1) % (depth * steps);
  }, 100);
};

demo3d();
