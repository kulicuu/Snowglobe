import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GLView } from 'expo';


import vertSrc from  './src/shaders/vertexShader0.js';
import vertSrc_002 from './src/shaders/vertexShader_002.js'


import fragSrc from './src/shaders/fragmentShader0.js';
import snowflakeFragSrc from './src/shaders/fragmentShader_002.js';


import onContextCreate from './src/onContextCreate.js';

let _initialized = false;

const vertShaders = { vertSrc, vertSrc_002 };
const fragShaders = { fragSrc, snowflakeFragSrc };


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      placeholder: "placeholder000",
      gl: null,
      counter: 0,
      red: 0.5,
      green: 0,
      blue: 0.3,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <GLView
          style={{ width: 400, height: 400 }}
          onContextCreate={ gl => onContextCreate.bind(this)({ gl, vertShaders, fragShaders }) }
        />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
