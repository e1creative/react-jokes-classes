import React from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

// function JokeList({ numJokesToGet = 10 }) {
//   const [jokes, setJokes] = useState([]);

//   /* get jokes if there are no jokes */

//   useEffect(function() {
//     async function getJokes() {
//       let j = [...jokes];
//       let seenJokes = new Set();
//       try {
//         while (j.length < numJokesToGet) {
//           let res = await axios.get("https://icanhazdadjoke.com", {
//             headers: { Accept: "application/json" }
//           });
//           let { status, ...jokeObj } = res.data;
  
//           if (!seenJokes.has(jokeObj.id)) {
//             seenJokes.add(jokeObj.id);
//             j.push({ ...jokeObj, votes: 0 });
//           } else {
//             console.error("duplicate found!");
//           }
//         }
//         setJokes(j);
//       } catch (e) {
//         console.log(e);
//       }
//     }

//     if (jokes.length === 0) getJokes();
//   }, [jokes, numJokesToGet]);

//   /* empty joke list and then call getJokes */

//   function generateNewJokes() {
//     setJokes([]);
//   }

//   /* change vote for this id by delta (+1 or -1) */

//   function vote(id, delta) {
//     setJokes(allJokes =>
//       allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
//     );
//   }

//   /* render: either loading spinner or list of sorted jokes. */

//   if (jokes.length) {
//     let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  
//     return (
//       <div className="JokeList">
//         <button className="JokeList-getmore" onClick={generateNewJokes}>
//           Get New Jokes
//         </button>
  
//         {sortedJokes.map(j => (
//           <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={vote} />
//         ))}
//       </div>
//     );
//   }

//   return null;

// }


/**********************************************************************/


class JokeList extends React.Component {
  constructor() {
    super();

    // JMT: bing our methods
    this.getJokes = this.getJokes.bind(this);
    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);

    // JMT: set our state
    this.state = { jokes: [] }

    this.numJokesToGet = 10
  }


  // const [jokes, setJokes] = useState([]);

  /* get jokes if there are no jokes */

  // useEffect(function() {
  //   async function getJokes() {
  //     let j = [...jokes];
  //     let seenJokes = new Set();
  //     try {
  //       while (j.length < numJokesToGet) {
  //         let res = await axios.get("https://icanhazdadjoke.com", {
  //           headers: { Accept: "application/json" }
  //         });
  //         let { status, ...jokeObj } = res.data;
  
  //         if (!seenJokes.has(jokeObj.id)) {
  //           seenJokes.add(jokeObj.id);
  //           j.push({ ...jokeObj, votes: 0 });
  //         } else {
  //           console.error("duplicate found!");
  //         }
  //       }
  //       this.setState(j);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   if (this.state.jokes.length === 0) getJokes();
  // }, [this.state.jokes, numJokesToGet]);

  async getJokes() {
    let j = [...this.state.jokes];
    let seenJokes = new Set();
    try {
      while (j.length < this.numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { status, ...jokeObj } = res.data;

        if (!seenJokes.has(jokeObj.id)) {
          seenJokes.add(jokeObj.id);
          j.push({ ...jokeObj, votes: 0 });
        } else {
          console.error("duplicate found!");
        }
      }
      this.setState({ jokes: j });
    } catch (e) {
      console.log(e);
    }
  }  

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState({ jokes: [] });
    this.getJokes();
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id, delta) {
    this.setState(allJokes =>
      allJokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  componentDidMount() {
    this.generateNewJokes();
    console.log("Component DID MOUNT")
  };

  componentDidUpdate() {
    console.log("Component DID UPDATE")
  };



  /* render: either loading spinner or list of sorted jokes. */

  render() {
    console.log("Component DID RENDER")
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
        return (
          <div className="JokeList">
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
              Get New Jokes
            </button>
      
            {sortedJokes.map(j => (
              <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
            ))}
          </div>
        );  
    }
    return null;
  };
}

export default JokeList;
