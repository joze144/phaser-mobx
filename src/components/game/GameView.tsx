import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'phaser';
import { COMPLETE_LEVEL, INCREASE_SCORE, RESET_SCORE } from './Events';
import CurrentScoreView from './CurrentScoreView';
import { IGameStore } from './gameStore';
import { SnakeScene } from './SnakeScene';

interface Props {
  gameStore?: IGameStore;
}

interface GameOptions {
  type: number;
  width: number;
  height: number;
  parent: string;
  scene: any;
  backgroundColor: any;
}

@observer
export class GameView extends Component<Props> {
  game: Phaser.Game;

  constructor(props: Props) {
    super(props);

    const config: GameOptions = {
      type: Phaser.CANVAS,
      width: 960,
      height: 720,
      backgroundColor: '#e4e4e4',
      parent: 'game',
      scene: SnakeScene
    };

    this.game = new Phaser.Game(config);
    this.game.scale.scaleMode = Phaser.Scale.RESIZE;

    addListeners(this.game, this.props);
  }

  render() {
    return (
      <div>
        <CurrentScoreView currentScore={this.props.gameStore!.currentScore} />
        <div id="game" />
      </div>
    )
  }
}

function addListeners(game: Phaser.Game, props: Props) {
  // This will be required for every custom event we want, unless i can figure out a way of doing it dynamically.
  game.events.on(COMPLETE_LEVEL, (level: number) => {
    console.log('level complete')
    // do some cool animation.
    props.gameStore!.completeLevel();
  });

  game.events.on(INCREASE_SCORE, (amount: number) => {
    console.log('increase')
    props.gameStore!.increaseScore(amount);
  });

  game.events.on(RESET_SCORE, () => {
    console.log('reset')
    props.gameStore!.resetScore();
  });
}
