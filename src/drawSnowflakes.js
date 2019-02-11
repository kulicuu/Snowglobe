



var snowflakes = [];
var counter = 0;

const snowpackRes = 900;
var snowpack = [...Array(snowpackRes)];


[...Array(3000)].map((val, idx) => {

  let scaleFactor = (idx % 30) * .00033;

  let x = (Math.random() * 2.0) - 1.0;
  let y = (Math.random() * 2.0) - 1.0;

  snowflakes = snowflakes.concat([
    x, y,
    x - scaleFactor, y + scaleFactor,
    x + scaleFactor, y + scaleFactor,
  ]);

});


export default function drawSnowflakes ({ gl, vertShader, fragShader }) {

  if (counter++ % 4 === 0) {
    for (let idx = 0; idx < 30; idx++) {
      let scaleFactor = (idx % 30) * .00033;

      let x = (Math.random() * 2.0) - 1.0;
      let y = 1;

      snowflakes = snowflakes.concat([
        x, y,
        x - scaleFactor, y + scaleFactor,
        x + scaleFactor, y + scaleFactor,
      ]);
    }

  }


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
    } else if (treeCollision1(snowflakes[idx], snowflakes[idx + 1]) || treeCollision2(snowflakes[idx], snowflakes[idx + 1]) || treeCollision3(snowflakes[idx], snowflakes[idx + 1])) packed = true;

    if (packed === false) {

      const randXFactor = .011 * (Math.random() - .5);
      const randYFactor = .008 * (Math.random() - .5);

      snowflakes[idx] += randXFactor;
      snowflakes[idx + 2] += randXFactor;
      snowflakes[idx + 4] += randXFactor;
      snowflakes[idx + 1] -= (.01 + randYFactor);
      snowflakes[idx + 3] -= (.01 + randYFactor);
      snowflakes[idx + 5] -= (.01 + randYFactor);
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



const treePart1 = [
  0.0, .19,
  0.27, -.43,
  -0.27, -.43,
];



function treeCollision1 (x, y) {
  const eqSatisfied1 = (y > -.43);
  let eqSatisfied2 = false;
  if (y <= ((.62 /.27) * x) + .19) eqSatisfied2 = true;
  const eqSatisfied3 = (x > -.27);
  let eqSatisfied4 = false;
  if (y <= (-(.62 / .27) * x) + .19) eqSatisfied4 = true;
  const relSatisfied5 = (x < .27);
  return (eqSatisfied1 && eqSatisfied2 && eqSatisfied3 && eqSatisfied4 && relSatisfied5 && (Math.random() > .039));
}

const treePart2 = [
  0.0, -.13,
  .3, -.62,
  -.3, -.62,
];


function treeCollision2 (x, y) {
  const relSatisfied6 = (y < -.43);
  const eqSatisfied1 = (y > -.62);
  let eqSatisfied2 = false;
  if (y <= ((.49 / .3) * x) - .13) eqSatisfied2 = true;
  const eqSatisfied3 = (x > -.3);
  let eqSatisfied4 = false;
  if (y <= (-(.49 / .3) * x) - .13) eqSatisfied4 = true;
  const relSatisfied5 = (x < .3);
  return (eqSatisfied1 && eqSatisfied2 && eqSatisfied3 && eqSatisfied4 && relSatisfied5 && relSatisfied6 && (Math.random() > .039));
}

const treePart3 = [
  0, -.42,
  .4, -.849,
  -.4, -.849,
];

function treeCollision3 (x, y) {
  const relSatisfied6 = (y < -.62);
  const eqSatisfied1 = (y > -.849);
  let eqSatisfied2 = false;
  if (y <= ((.429 / .4) * x) - .42) eqSatisfied2 = true;
  const eqSatisfied3 = (x > -.4);
  let eqSatisfied4 = false;
  if (y <= (-(.429 / .4) * x) - .42) eqSatisfied4 = true;
  const relSatisfied5 = (x < .4);
  return (eqSatisfied1 && eqSatisfied2 && eqSatisfied3 && eqSatisfied4 && relSatisfied5 && relSatisfied6 && (Math.random() > .039));
}
