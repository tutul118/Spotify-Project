import React from 'react';
import './App.css';
import axios from 'axios';
import { Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import SpotifyApi from 'spotify-web-api-js';
import qs from 'qs';

let api = new SpotifyApi();


axios.post('https://accounts.spotify.com/api/token', {
  "grant_type": 'client_credentials',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic YTQzZWU3Y2U2MmI4NGEyNGI3NWI3ZjdmNmEwZGFmODg6ZGVkYjM3YTc2NjZlNGI3M2FkNjdiYzYxMWViMWIzZmU='
  }
}).then(res => api.setAccessToken(res.data.access_token));

interface State { };


interface Props { };

export default class App extends React.PureComponent<Props, State> {
  state = {
    query: ''
  }

  search() {
    console.log('this.state', this.state)
    api.searchArtists(this.state.query)
      .then(function (data) {
        console.log('Artist albums', data)
      })
      .catch(error =>
        console.log(error)
      )

  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Music Master</div>
        <InputGroup>
          <Input
            placeholder="search for an artist..."
            value={this.state.query}
            onChange={(event: any) => this.setState({ query: event.target.value })}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.search();
              }
            }}
          />
          <InputGroupAddon addonType="append" onClick={() => this.search()}>
            <Button color="secondary">Search</Button>
          </InputGroupAddon>
        </InputGroup>
        <div className="Profile">
          <div>Artist Name</div>
          <div>Artist Picture</div>
        </div>
        <div className="gallery">
          Gallery
        </div>
      </div>
    );
  }
}
