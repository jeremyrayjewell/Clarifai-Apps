import './App.css';
import React from 'react';
import Logo from './components/Logo/logo';
import TextForm from './components/TextForm/textForm';
import TextOutput from './components/TextOutput/textOutput';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      status: null,
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ input: this.state.input });
    
    const PAT = 'your PAT (Personal Access Token) here (https://www.clarifai.com/)';
    const USER_ID = 'openai';    
    const APP_ID = 'chat-completion';
    const MODEL_ID = 'GPT-4';
    const MODEL_VERSION_ID = '5d7a50b44aec4a01a9c492c5a5fcf387'; 
    const RAW_TEXT = this.state.input;
    // To use a hosted text file, assign the url variable
    // const TEXT_FILE_URL = 'https://samples.clarifai.com/negative_sentence_12.txt';
    // Or, to use a local text file, assign the url variable
    // const TEXT_FILE_BYTES = './components/SystemPrompts/systemPrompts.txt';

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "text": {
              "raw": "You are the social media manager for The Arts Fuse, Boston's premier arts and culture magazine. You must take the following article and create social media posts for it. You must provde posts for Twitter, Instagram, Facebook, and LinkedIn. Posts should include appopriate emojis and hashtags, and should not exceed each platform's limits." + RAW_TEXT              
              // url: TEXT_URL, allow_duplicate_url: true 
              // raw: fileBytes
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
      .then((response) => {
          return response.json();
      })
      .then((data) => {
        if(data.status.code != 10000) console.log(data.status);
        else this.setState({ status: data['outputs'][0]['data']['text']['raw'] });      
      }).catch(error => console.log('error', error));}

    render() {
      return (
        <div className="App">
          <Logo />
          <TextForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <TextOutput status={this.state.status} />        
          </div>
      );
    }
  }

export default App;