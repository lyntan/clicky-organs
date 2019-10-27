import React, { Component } from "react";
import Organ from "./components/organ-cards/organ";
import Wrapper from "./components/wrapper/wrapper";
import Header from "./components/header/header";
import organs from "./organs.json";
import "./App.css";

class App extends Component {
  state = {
    organs,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({ highscore: this.state.score }, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.organs.forEach(card => {
      card.count = 0;
    });
    alert(
      `You have lost! Game will automatically reset. \nYour Score is: ${this.state.score}`
    );
    this.setState({ score: 0 });
    return true;
  };

  clickCount = id => {
    this.state.organs.find((o, i) => {
      if (o.id === id) {
        if (organs[i].count === 0) {
          organs[i].count = organs[i].count + 1;
          this.setState({ score: this.state.score + 1 }, function() {
            console.log(this.state.score);
          });
          this.state.organs.sort(() => Math.random() - 0.5);
          return true;
        } else {
          this.gameOver();
        }
      }
    });
  };

  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>
          <h1>Organ Memory Game</h1>
          <h4>Only click each organ once until you have clicked all 12!</h4>
        </Header>
        {this.state.organs.map(card => (
          <Organ
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
