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
      red: 0,
      green: 1,
      blue: 0,
    };
  }

  render() {
    console.log('tick', this.state.counter);
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
    // gl.clearColor(1, 0, 1, 1);
    gl.clearColor(this.state.red, this.state.green, this.state.blue, 1);


    // Compile vertex and fragment shader
    const vert = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vert, vertSrc);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(frag, fragSrc);
    gl.compileShader(frag);

    // Link together into a program
    const program = gl.createProgram();
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);

    gl.flush();
    gl.endFrameEXP();
    _initialized = true;
    this.setState({
      gl: gl,
    });

    setInterval(() => {


      gl.clearColor(this.state.red, this.state.green, this.state.blue, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.flush();
      gl.endFrameEXP();


      this.setState({
        counter: this.state.counter + 1,
        red: this.state.red + 0.1,
        green: this.state.green - 0.1,
        blue: this.state.blue,
      })
    }, 3000);
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
