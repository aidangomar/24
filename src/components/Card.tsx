import React, { Fragment } from "react";
import { log } from "util";
import solver from "./Solver";



const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

declare global {
  interface Array<T> {
    take(n: number): Array<T>;
    head(): T;
  }
}

Array.prototype.take = function(n: number) {
  if (n < 0) {
    return [];
  }
  return this.slice(0, n);
}

Array.prototype.head = function() {
  return this[0];
}

const getCards = () => {
  let cards: Array<string> = [];
  let suits = ["clubs", "diamonds", "hearts", "spades"];
  let values = ["ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"];
  suits.forEach(suit => values.forEach(value => cards.push(`/Playing Cards/PNG-cards-1.3/${value}_of_${suit}.png`)));
  shuffleArray(cards);
  return cards;
}

const getValues = (cards: Array<string>) => {
  return cards
    .map(card => 
      card
        .split("/")!
        .pop()!
        .split("_")!
        .head()!
    )
  // map the values of the face cards to numbers using pattern matching
    .map(value => {
      switch (value) {
        case "ace":
          return 1;
        case "jack":
          return 11;
        case "queen":
          return 12;
        case "king":
          return 13;
        default:
          return parseInt(value);
      }
    });
}

const Cards = () => {
  const cards: Array<string> = getCards();
  console.log(getValues(cards).take(4));
  console.log(solver(getValues(cards).take(4)))
  return (
      <div>
        <div className="card-container">
          <img className="card" src={cards.take(4)[0]} alt="bruh" />
          <img className="card" src={cards.take(4)[1]} alt="bruh"/>
        </div>
        <div className="card-container">
          <img className="card" src={cards.take(4)[2]} alt="bruh"/>
          <img className="card" src={cards.take(4)[3]} alt="bruh"/>
        </div>
      </div>
  );
}

export default Cards;