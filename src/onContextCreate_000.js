

let _initialized = false;

export default function onContextCreate ({ gl, vertShaders, fragShaders }) {
  if (_initialized) {
    return;
  }

  const { vertSrc, vertSrc_002 } = vertShaders;
  const { fragSrc } = fragShaders;

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


  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");



  var positionAttributeLocation_002 = gl.getAttribLocation(program, "b_position");

  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);




  const program = gl.createProgram();


  gl.attachShader(program, vert_002);


  gl.attachShader(program, frag);


  gl.linkProgram(program);
  gl.detachShader(program, vert_002);
  gl.detachShader(program, frag);



  var positions33 = [
    0.7, 0.7,
    0, 0.5,
    0.7, 0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions33), gl.DYNAMIC_DRAW);

  gl.clearColor(0,0,0,0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(program);


  gl.enableVertexAttribArray(positionAttributeLocation_002);



  var size = 2;
  var type = gl.FLOAT;
  var normalize = false;
  var stride = 0;
  var offset = 0;
  gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
  gl.vertexAttribPointer(positionAttributeLocation_002, size, type, normalize, stride, offset);
  var primitiveType = gl.TRIANGLES;
  var offset_2 = 0;
  var count = 3;
  gl.drawArrays(primitiveType, offset_2, count);


  gl.flush();
  gl.endFrameEXP();
  _initialized = true;




  setInterval(() => {
    gl.clearColor(this.state.red, this.state.green, this.state.blue, 0.2);
    // gl.clear(gl.COLOR_BUFFER_BIT);


    const program2 = gl.createProgram();
    gl.attachShader(program2, vert);
    gl.attachShader(program2, frag);
    gl.linkProgram(program2);

    gl.useProgram(program2);
    gl.enableVertexAttribArray(positionAttributeLocation);




    var positions33 = [
      0.7, 0,
      -.58, .59,
      0.9, .8,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions33), gl.DYNAMIC_DRAW);




    gl.drawArrays(primitiveType, offset_2, count);
    gl.flush();
    gl.endFrameEXP();

    this.setState({
      red: Math.abs((this.state.red + .1) % 1),
      green: Math.abs((this.state.green - .1) % 1),
      blue: Math.abs((this.state.blue + .3) % 1),
    })


  }, 2000);













};
