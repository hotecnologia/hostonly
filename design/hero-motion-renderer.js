// Animação 2.5D da arte original; coordenadas em pixels do arquivo 1672 × 941.
export async function createHeroMotion(scene, onUnavailable) {
  const image = scene.querySelector("img");
  await image.decode();
  const canvas = document.createElement("canvas");
  canvas.className = "hero-canvas";
  canvas.setAttribute("aria-hidden", "true");
  const gl = canvas.getContext("webgl", { depth: false, stencil: false, antialias: false, preserveDrawingBuffer: true });
  if (!gl) return null;
  const parallelCompile = gl.getExtension("KHR_parallel_shader_compile");

  const vertexSource = `
    attribute vec2 position;
    varying vec2 uv;
    void main() { uv = (position + 1.0) * .5; gl_Position = vec4(position, 0.0, 1.0); }
  `;
  const fragmentSource = `
    precision highp float;
    uniform sampler2D artwork;
    uniform vec4 view;
    uniform vec2 source;
    uniform float sourceX;
    uniform float time;
    varying vec2 uv;
    vec2 rotatePoint(vec2 p, float a) {
      return mat2(cos(a), -sin(a), sin(a), cos(a)) * p;
    }
    vec3 pixel(vec2 p) { return texture2D(artwork, (p - vec2(sourceX, 0.0)) / source).rgb; }
    float ellipse(vec2 p, vec2 center, vec2 radius) {
      return 1.0 - smoothstep(.65, 1.0, length((p - center) / radius));
    }
    float blinkAt(float t, float at) {
      return smoothstep(at, at + .055, t) * (1.0 - smoothstep(at + .09, at + .23, t));
    }
    vec3 blinkEye(vec3 color, vec2 p, vec2 center, vec2 radius, float blink) {
      vec2 local = rotatePoint(p - center, -.36);
      float region = 1.0 - smoothstep(.72, 1.0, length(local / radius));
      if (region < .001 || blink < .001) return color;
      // Retira a emissão azul original e comprime só o desenho luminoso do olho.
      float glow = smoothstep(.08, .35, color.g - color.r) * smoothstep(.1, .4, color.b - color.r);
      vec3 visor = mix(color, vec3(.018, .046, .065), glow);
      local.y /= mix(1.0, .055, blink);
      vec3 squeezed = pixel(center + rotatePoint(local, .36));
      float light = smoothstep(.1, .35, squeezed.g - squeezed.r) * smoothstep(.1, .4, squeezed.b - squeezed.r);
      light *= 1.0 - smoothstep(.75, 1.0, length(local / radius));
      return mix(color, mix(visor, squeezed, light), region);
    }
    void main() {
      vec2 p = view.xy + vec2(uv.x, 1.0 - uv.y) * view.zw;
      float breath = sin(time * 6.2831853 / 4.3);
      float body = ellipse(p, vec2(1070.0, 350.0), vec2(280.0, 330.0));
      body *= 1.0 - smoothstep(1185.0, 1220.0, p.x);
      p.y += breath * 2.2 * body;
      p.x -= (p.x - 1080.0) * breath * .0022 * body;
      // Pulso gira discretamente em torno da ponta, que permanece apoiada.
      vec2 tip = vec2(1214.0, 366.0);
      vec2 handLocal = rotatePoint(p - vec2(1050.0, 465.0), -.32);
      float hand = 1.0 - smoothstep(.6, 1.0, length(handLocal / vec2(158.0, 96.0)));
      vec2 shaft = vec2(1214.0, 366.0) - vec2(1096.0, 440.0);
      float along = clamp(dot(p - vec2(1096.0, 440.0), shaft) / dot(shaft, shaft), 0.0, 1.0);
      float tool = 1.0 - smoothstep(7.0, 16.0, length(p - vec2(1096.0, 440.0) - along * shaft));
      float turn = sin(time * 6.2831853 / 2.15) * .018;
      p = mix(p, tip + rotatePoint(p - tip, turn), max(hand, tool));
      vec3 color = pixel(p);
      float cycle = mod(time, 8.6);
      float blink = max(blinkAt(cycle, 2.8), blinkAt(cycle, 6.15));
      color = blinkEye(color, p, vec2(1027.0, 251.0), vec2(51.0, 46.0), blink);
      color = blinkEye(color, p, vec2(1126.0, 213.0), vec2(43.0, 42.0), blink);
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  const program = gl.createProgram();
  for (const [type, sourceCode] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]]) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader);
  }
  gl.linkProgram(program);
  if (parallelCompile) {
    await new Promise((resolve) => {
      function checkCompilation() {
        if (gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR)) resolve();
        else setTimeout(checkCompilation, 30);
      }
      checkCompilation();
    });
  }
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const viewLocation = gl.getUniformLocation(program, "view");
  const sourceLocation = gl.getUniformLocation(program, "source");
  const sourceXLocation = gl.getUniformLocation(program, "sourceX");
  const timeLocation = gl.getUniformLocation(program, "time");
  let sourceWidth = 1672;
  let cropX = 0;
  let elapsed = 0;
  let playing = false;
  let lastFrame = 0;
  let frame = 0;
  let unavailable = false;
  function draw() {
    gl.uniform1f(timeLocation, elapsed);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
  function resize() {
    if (unavailable) return;
    const { width, height } = scene.getBoundingClientRect();
    if (!width || !height) return;
    const scale = Math.min(devicePixelRatio, 1.5, 1440 / width);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    const cover = Math.max(width / sourceWidth, height / 941);
    const visibleWidth = width / cover;
    const visibleHeight = height / cover;
    gl.uniform4f(viewLocation, cropX + (sourceWidth - visibleWidth) / 2, cropX ? (941 - visibleHeight) / 2 : 0, visibleWidth, visibleHeight);
    draw();
  }
  function updateTexture() {
    if (unavailable || !image.complete || !image.naturalWidth) return;
    const cropped = image.currentSrc.includes("hero-robot-mobile-");
    sourceWidth = cropped ? 1020 : 1672;
    cropX = cropped ? 652 : 0;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.uniform2f(sourceLocation, sourceWidth, 941);
    gl.uniform1f(sourceXLocation, cropX);
    resize();
  }
  function tick(now) {
    if (!playing) return;
    if (now - lastFrame >= 1000 / 30) {
      elapsed += Math.min((now - lastFrame) / 1000, .1);
      lastFrame = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function setPlaying(next, show = true) {
    canvas.hidden = !show || unavailable;
    next = next && !unavailable;
    if (playing === next) return;
    playing = next;
    cancelAnimationFrame(frame);
    if (playing) { lastFrame = performance.now(); frame = requestAnimationFrame(tick); }
  }
  canvas.addEventListener("webglcontextlost", () => {
    unavailable = true;
    setPlaying(false, false);
    onUnavailable();
  });
  scene.append(canvas);
  updateTexture();
  image.addEventListener("load", updateTexture);
  new ResizeObserver(resize).observe(scene);
  return { setPlaying, renderAt(time) { elapsed = time; draw(); gl.flush(); } };
}
