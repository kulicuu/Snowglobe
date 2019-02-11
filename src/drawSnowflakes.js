



var snowflakes = [];


const snowpackRes = 1000;
var snowpack = [...Array(snowpackRes)];


[...Array(18000)].map((val, idx) => {

  let scaleFactor = (idx % 20) * .0006;

  let x = (Math.random() * 2.0) - 1.0;
  let y = (Math.random() * 2.0) - 1.0;

  snowflakes = snowflakes.concat([
    x, y,
    x - scaleFactor, y + scaleFactor,
    x + scaleFactor, y + scaleFactor,
  ]);

});






export default function drawSnowflakes ({ gl, vertShader, fragShader }) {




  for (var idx = 0; idx < (snowflakes.length - 6); idx += 6) {


    let xVal = Math.floor((snowflakes[idx] + 1) * snowpackRes);




    let packed = false

    if (snowpack[xVal] === undefined ) {

      if ( snowflakes[idx + 1] < -.98 ) {
        snowpack[xVal] = snowflakes[idx + 1]
        packed = true;
      }
    } else if (Math.abs(snowpack[xVal] - snowflakes[idx + 1]) < .023) {
      snowpack[xVal] = snowflakes[idx + 1];
      packed = true;
    }




    if (packed === false) {

      const randXFactor = .011 * (Math.random() - .5);
      const randYFactor = .011 * (Math.random() - .5);

      snowflakes[idx] += randXFactor;
      snowflakes[idx + 2] += randXFactor;
      snowflakes[idx + 4] += randXFactor;
      snowflakes[idx + 1] -= (.014 + randYFactor);
      snowflakes[idx + 3] -= (.014 + randYFactor);
      snowflakes[idx + 5] -= (.014 + randYFactor);
    }

  }


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
