

const vertSrc_002 = `

attribute vec4 b_position;

void main() {
  vec4 c = vec4(0.9, -1.9, 1.0, 1.0);

  gl_Position = b_position + c;



}
`;


export default vertSrc_002;
