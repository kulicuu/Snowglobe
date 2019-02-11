



var snowflakes = [];


const snowpackRes = 500;
var snowpack = [...Array(snowpackRes)];


[...Array(4000)].map(() => {
  let x = (Math.random() * 2.0) - 1.0;
  let y = (Math.random() * 2.0) - 1.0;

  snowflakes = snowflakes.concat([
    x, y,
    x - .008, y + .008,
    x + .008, y + .008,
  ]);

});




var counter = 0;

export default function drawSnowflakes ({ gl, vertShader, fragShader }) {




  for (var idx = 0; idx < (snowflakes.length - 6); idx += 6) {


    let xVal = Math.floor((snowflakes[idx] + 1) * snowpackRes);


    // if (counter ++ % 20 == 0) console.log(snowpack[xVal], 'xVal');

    let packed = false

    if (snowpack[xVal] === undefined ) {

      if ( snowflakes[idx + 1] < -.93 ) {
        snowpack[xVal] = snowflakes[idx + 1]
      }
    } else if (Math.abs(snowpack[xVal] - snowflakes[idx + 1]) < .009) {
      snowpack[xVal] = snowflakes[idx + 1];
      packed = true;
    }




    if ( (snowflakes[idx + 1] > -.95) && (packed === false) ) {
      snowflakes[idx + 1] -= .003;
      snowflakes[idx + 3] -= .003;
      snowflakes[idx + 5] -= .003;
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



// snowflakes = snowflakes.map((coord, idx) => {
//
//   let packed = false;
//   if ((idx + 1) % 2 === 0) {
//     let xVal = Math.floor((coord + 1) * 100);
//     // console.log(xVal, 'xVal');
//     if (  (snowpack.indexOf(xVal) > -1) && (  Math.abs(snowflakes[idx + 1] - snowpack[xVal]) < .2)  ) {
//       snowpack[xVal] = snowflakes[idx + 1];
//       packed = true;
//     } else if (snowflakes[idx + 1] < -.90) {
//       snowpack[xVal] = snowflakes[idx + 1];
//       packed = true;
//     }
//   }
//
//
//
//
//   if (((idx + 1) % 2 === 0) && (coord > -.95) && (!packed)) {
//     return coord - .01
//   }
//   return coord;
// })
