import React, { Component } from 'react';
import Joke from './Joke';
import './App.css';

export default class DadJoke extends Component {
  constructor() {
    super();

    this.saveJoke = this.saveJoke.bind(this);

    this.state = {
      jokeObj: undefined,
      loading: true,
      storedJokes: [],
    }
  }

  async fetchJoke() {
    this.setState(
      { loading: true },
      async () => {
        const requestHeaders = { headers: { Accept: 'application/json' } };
        const response = await fetch('https://icanhazdadjoke.com/', requestHeaders);
        const data = await response.json();
        this.setState({
          loading: false,
          jokeObj: data
        });
      });
  }

  componentDidMount() {
    this.fetchJoke();
  }

  saveJoke() {
    this.setState(({ storedJokes, jokeObj}) => ({
      storedJokes: [...storedJokes, jokeObj],
    }));
  }

  deleteJoke(jokeIndex)  {
    const { storedJokes } = this.state; 
    const filteredJokes = storedJokes
      .filter((_joke, index) => index !== jokeIndex);
  
      this.setState({ storedJokes: filteredJokes })
  };

  render() {
    
    const { storedJokes, loading, jokeObj } = this.state;
    const loadingElement = <span>Loading...</span>;

    return (
      <div
        className="App"
      >
        <span>
          {storedJokes.map(({ id, joke }, index) => (<p key={id}>{joke}<button
            id={ index }
            type="button"
            onClick={ () => this.deleteJoke(index) }
          >x</button>
          </p>))}
         </span>

      {
        loading ? loadingElement : <Joke jokeObj={jokeObj} saveJoke={this.saveJoke} fetchJoke={ () => this.fetchJoke() } /> 
      }
      </div>
    );
  }
}

