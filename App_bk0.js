import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GLView } from 'expo';


import vertSrc from  './shaders/vertexShader0.js';
import fragSrc from './shaders/fragmentShader0.js';


let _initialized = false;

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholder: "placeholder000",
      gl: null,
      counter: 0,
    };
  }


  // we may like to avoid render cycles if we can avoid it.
  // GL context isn't React DOM context
  render() {
    // console.log('tick', this.state.counter);
    return (
      <View style={styles.container}>
        <GLView
          style={{ width: 400, height: 400 }}
          onContextCreate={this._onContextCreate}
        />
      </View>
    );
  }

  _onContextCreate = gl => {
    if (_initialized) {
      return;
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vertSrc);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fragSrc);
    gl.compileShader(frag);


    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);




    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);







    var positions33 = [
      0, 0,
      0, 0.5,
      0.7, 0,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions33), gl.STATIC_DRAW);

    gl.clearColor(1,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);



    var size = 2;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
    var primitiveType = gl.TRIANGLES;
    var offset_2 = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset_2, count);












    // gl.flush();
    // gl.endFrameEXP();
    _initialized = true;
    // this.setState({
    //   gl: gl,
    // });

    // setInterval(() => {
    //
    //
    //
    //
    //
    //
    //   // gl.clearColor(this.state.red, this.state.green, this.state.blue, 0.26);
    //   // gl.clear(gl.COLOR_BUFFER_BIT);
    //   //
    //   //
    //   //
    //   // gl.flush();
    //   // gl.endFrameEXP();
    //
    //   gl.drawArrays(gl.POINTS, 0, 1);
    //
    //   this.setState({
    //     counter: this.state.counter + 1,
    //     red: (this.state.red + 0.1) % 1,
    //     green: (this.state.green + 0.1) % 1,
    //     blue: this.state.blue,
    //   })
    // }, 100);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



function compileShader (gl, shaderSource, shaderType) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, shaderSource);
  gl.compileSHader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    throw "could not compile shader:" + gl.getSHaderIndfoLog(shader);
  }

  return shader;
}
