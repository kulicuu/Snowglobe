



var snowflakes = [];




[...Array(300)].map(() => {
  let x = (Math.random() * 2.0) - 1.0;
  let y = (Math.random() * 2.0) - 1.0;

  snowflakes = snowflakes.concat([
    x, y,
    x - .008, y + .008,
    x + .008, y + .008,
  ]);

});




export default function drawSnowflakes ({ gl, vertShader, fragShader }) {





  const positionAttributeLocation_a = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);





  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(snowflakes), gl.DYNAMIC_DRAW);

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionAttributeLocation_a);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(positionAttributeLocation_a, size, type, normalize, stride, offset);
  const primitiveType = gl.TRIANGLES;

  const count = snowflakes.length / 2;

  gl.drawArrays(primitiveType, offset, count);

}
