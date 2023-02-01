import React from 'react';

class Joke extends React.Component {
  render() {
    const { jokeObj, saveJoke, fetchJoke } = this.props;

    return (
      <div>
        <p>{jokeObj.joke}</p>
        <button
          type="button"
          onClick={ fetchJoke }
        >
          Next Joke
        </button>
        <button type="button" onClick={saveJoke}>
          Save Joke
        </button>
      </div>
    );
  }
}

export default Joke;