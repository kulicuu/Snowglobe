

const vertSrc = `



attribute vec4 a_position;
varying vec4 c_position;


void main() {
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
  c_position = a_position;
}
`;


export default vertSrc;
