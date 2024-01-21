import './App.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imageLinkForm';
import Rank from './components/Rank/rank';
import Particles from './components/Particles/particles';
import FaceRecognition from './components/FaceRecognition/faceRecognition';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boundingBoxes: []
    };
  }

  calculateFaceLocation = (boundingBoxes) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    boundingBoxes.forEach(boundingBox => {
      boundingBox.topRow = height * boundingBox.topRow;
      boundingBox.leftCol = width * boundingBox.leftCol;
      boundingBox.bottomRow = height - (height * boundingBox.bottomRow);
      boundingBox.rightCol = width - (width * boundingBox.rightCol);
    });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });  
    let boundingBoxes = [];


    const PAT = 'your PAT (Personal Access Token) here (https://www.clarifai.com/';
    const USER_ID = 'clarifai';
    const APP_ID = 'main';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
        "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
        },
        "inputs": [
        {
          "data": {
            "image": {
                    "url": IMAGE_URL
                  }
                }
              }
            ]
        });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },  
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
        const regions = result.outputs[0].data.regions;
        regions.forEach(region => {
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);
  
            region.data.concepts.forEach(concept => {
                const name = concept.name;
                const value = concept.value.toFixed(4);
  
                boundingBoxes.push({
                  name: name,
                  value: value,
                  topRow: topRow,
                  leftCol: leftCol,
                  bottomRow: bottomRow,
                  rightCol: rightCol                
                });
            });   
        });
        this.calculateFaceLocation(boundingBoxes);
        this.setState({ boundingBoxes: boundingBoxes });
    })
    .catch(error => console.log('error', error));  
  }


  render() {
    return (
      <div className="App">
        <Particles />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition imageUrl={this.state.imageUrl} boundingBoxes={this.state.boundingBoxes} />      </div>
    );
  }
}

export default App;
