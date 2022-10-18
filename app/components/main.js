import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Component, StyleSheet, Text, View, Image, TouchableOpacity, AppRegistry } from 'react-native';
// import Voice from '@react-native-voice/voice';
// import SoundRecorder from 'react-native-sound-recorder';
import { Audio } from 'expo-av';
import fs from 'fs';

const webmToMp4 = require("webm-to-mp4");

export class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      listening: false,
      results: [],
    };
    this.recording = new Audio.Recording();
  }
  RECORDING_OPTIONS_PRESET_HIGH_QUALITY = {
    android: {
      extension: '.mp4',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    web: {
      extension: '.mp4',
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.wav',
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
  };

  
  async startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      await this.recording.prepareToRecordAsync(this.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await this.recording.startAsync();
      // You are now recording!
      console.log('Starting recording..')    
      } catch (err) {
        console.error('Failed to start recording', err);
      }
    }

  blobToBase64 = (blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };
  
    async stopRecording() {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      this.recording = new Audio.Recording();
      console.log('Recording stopped and stored at', uri);
      var file = {};
      var blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          file.file = xhr.response;
          file.name = "whatever_filename.mp3";
          file.type = "audio/mpeg";
          resolve(file);

        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      console.log(blob);
      // const audioBase64 = await this.blobToBase64(blob);
      // console.log(await fs.writeFile("file.mp4", Buffer.from(webmToMp4(blob))));
      
      // blob = new Blob(blob. { type: "audio/mp3" });
      // audioBase64.arrayBuffer().then(result => {
      //   console.log(result);
      //   blob = new Blob(result, { type: "audio/mp3" });

      // })

      // console.log(audioBase64);

    }

    toggleListen = () => {
      console.log(this.state.listening ? 'Stopped listening.' : 'Listening...');
      if (this.state.listening) this.stopRecording() 
      else { this.startRecording() };

      this.setState({
        listening: !this.state.listening
      });
    }
  
  render() { 
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Click the mic to {this.state.listening ? 'stop' : 'start'} listening
        </Text>
        <TouchableOpacity onPress={this.toggleListen}>
          <Image style={styles.mic} source={require('../assets/microphone.svg')} />
        </TouchableOpacity>
        {this.state.results.map((result, index) => <Text style={styles.transcript}> {result}</Text>
        )}
        
      </View>
    );
  };
}

AppRegistry.registerComponent('Main', () => Main);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mic: {
    height: 200,
    width: 200,
  },
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '400%',
  },
});
