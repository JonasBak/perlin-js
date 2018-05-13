function main() {
  const canvas = document.querySelector("#glcanvas");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 5;

  const gl = canvas.getContext("webgl");

  const shaders = new Shader();

  shaders.init(gl);

  const scene = new Scene(canvas, gl, shaders);

  const va = new VertexArray(gl, shaders);

  scene.vas.push(va);

  const width = 4;
  const height = 4;
  const depth = 4;
  const steps = 4;
  const size = 0.7;
  const noise = perlin([width, height, depth], steps);

  let z = 0;
  let diff = width * height * steps * steps;

  while (z < depth * steps) {
    for (let i = 0; i < diff; i++) {
      const r = Math.pow((noise[i + diff * z] + 1) / 2, 4);
      const x = i % (width * steps);
      const y = Math.floor(i / (width * steps));
      va.addSphere(r, [x * size - 5, y * size - 5, z * size - 15], 10, 5, [
        x / (width * steps),
        y / (height * steps),
        z / (depth * steps)
      ]);
    }
    z++;
  }

  function render(now) {
    scene.update();
    scene.draw(gl, shaders);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
