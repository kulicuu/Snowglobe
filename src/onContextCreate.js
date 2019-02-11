

let _initialized = false;


import drawSnowflakes from './drawSnowflakes.js'


export default function onContextCreate ({ gl, vertShaders, fragShaders }) {

  const { vertSrc, vertSrc_002 } = vertShaders;
  const { fragSrc, snowflakeFragSrc } = fragShaders;

  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert, vertSrc);
  gl.compileShader(vert);

  const vert_002 = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vert_002, vertSrc_002);
  gl.compileShader(vert_002);

  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(frag, fragSrc);
  gl.compileShader(frag);

  const snowflakeFrag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(snowflakeFrag, snowflakeFragSrc);
  gl.compileShader(snowflakeFrag);





  setInterval(() => {



    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);


    drawChristmasTree({
      gl,
      vertShader: vert,
      fragShader: frag,
    });


    drawSnowflakes({
      gl,
      vertShader: vert,
      fragShader: snowflakeFrag,
    })



    gl.flush();
    gl.endFrameEXP();
  }, 20)




};










function drawChristmasTree ({ gl, vertShader, fragShader }) {

  const positionAttributeLocation_a = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);


  const positions33 = [
    0.0, 0.9,
    0.3, 0.7,
    -0.3, 0.7,

    0.0, .8,
    .45, .5,
    -.45, .5,

    0, .7,
    .6, .2,
    -.6, .2,

  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions33), gl.STATIC_DRAW);
  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation_a);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(positionAttributeLocation_a, size, type, normalize, stride, offset);
  const primitiveType = gl.TRIANGLES;

  const count = 9;
  gl.drawArrays(primitiveType, offset, count);


};
