import { INCREASE_SCORE } from './Events';

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

class Food extends Phaser.GameObjects.Image {
  constructor (scene: any, x: number, y: number, size: number) {
    super(scene, x * size, y * size, 'food')
  }
}

class Snake {
  headPosition: Phaser.Geom.Point;
  body: any;
  head: any;
  alive: any;
  speed: any;
  moveTime: any;
  tail: any;
  heading: any;
  direction: any;
  constructor (scene: any, x: number, y: number, size: number) {
    this.headPosition = new Phaser.Geom.Point(x, y);
    this.body = scene.add.group();
    this.head = this.body.create(x * size, y * size, 'body');
    this.head.setOrigin(0);
    this.alive = true;
    this.speed = 100;
    this.moveTime = 0;
    this.tail = new Phaser.Geom.Point(x, y);
    this.heading = RIGHT;
    this.direction = RIGHT;
  }
}

export class SnakeScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'SnakeScene',
    });
  }

  size = 24;
  cursors: any;
  total = 0;
  snake: any;
  food: any;
  // cursors = this.input.keyboard.createCursorKeys();

  preload() {
    this.load.image('food', 'images/heart24.png');
    this.load.image('body', 'images/square24.png');
  }

  create() {
    this.food = new Food(this, 3, 4, this.size);
    this.children.add(this.food);
    this.snake = new Snake(this, 8, 8, this.size);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  eat() {
    this.total = this.total + 1;
  }

  snakeUpdate(time: number) {
    if (time >= this.snake.moveTime) {
      return this.move(time);
    }
  }

  grow() {
    var newPart = this.snake.body.create(this.snake.tail.x, this.snake.tail.y, 'body');
    newPart.setOrigin(0);
  }

  collideWithFood(food: any) {
    if (food.x - this.size <= this.snake.head.x && this.snake.head.x <= food.x
      && food.y - this.size <= this.snake.head.y && this.snake.head.y <= food.y) {
      this.grow();
      this.eat();
      //  For every 5 items of food eaten we'll increase the snake speed a little
      if (this.snake.speed > 20 && this.total % 5 === 0) {
        this.snake.speed -= 5;
      }

      this.game.events.emit(INCREASE_SCORE, this.total);
      return true;
    }
    else {
      return false;
    }
  }

  updateGrid(grid: any) {
    //  Remove all body pieces from valid positions list
    this.snake.body.children.each((segment: any) => {
      var bx = segment.x / this.size;
      var by = segment.y / this.size;
      grid[by][bx] = false;
    });
    return grid;
  }

  faceLeft() {
    if (this.snake.direction === UP || this.snake.direction === DOWN) {
      this.snake.heading = LEFT;
    }
  }

  faceRight() {
    if (this.snake.direction === UP || this.snake.direction === DOWN) {
      this.snake.heading = RIGHT;
    }
  }

  faceUp() {
    if (this.snake.direction === LEFT || this.snake.direction === RIGHT) {
      this.snake.heading = UP;
    }
  }

  faceDown() {
    if (this.snake.direction === LEFT || this.snake.direction === RIGHT) {
      this.snake.heading = DOWN;
    }
  }

  move(time: number) {
    switch (this.snake.heading) {
      case LEFT:
        this.snake.headPosition.x = Phaser.Math.Wrap(this.snake.headPosition.x - 1, 0, 40);
        break;
      case RIGHT:
        this.snake.headPosition.x = Phaser.Math.Wrap(this.snake.headPosition.x + 1, 0, 40);
        break;
      case UP:
        this.snake.headPosition.y = Phaser.Math.Wrap(this.snake.headPosition.y - 1, 0, 30);
        break;
      case DOWN:
        this.snake.headPosition.y = Phaser.Math.Wrap(this.snake.headPosition.y + 1, 0, 30);
        break;
    }

    this.snake.direction = this.snake.heading;

    //  Update the body segments and place the last coordinate into this.tail
    Phaser.Actions.ShiftPosition(this.snake.body.getChildren(), this.snake.headPosition.x * this.size, this.snake.headPosition.y * this.size, 1, this.snake.tail);

    var hitBody = Phaser.Actions.GetFirst(this.snake.body.getChildren(), { x: this.snake.head.x, y: this.snake.head.y }, 1);
    if (hitBody) {
      console.log('dead');
      this.snake.alive = false;
      return false;
    }
    else {
      //  Update the timer ready for the next movement
      this.snake.moveTime = time + this.snake.speed;
      return true;
    }
  }

  update(time: number, delta: number): void {
    if (this.cursors.left!.isDown) {
      this.faceLeft();
    }
    else if (this.cursors.right!.isDown) {
      this.faceRight();
    }
    else if (this.cursors.up!.isDown) {
      this.faceUp();
    }
    else if (this.cursors.down!.isDown) {
      this.faceDown();
    }

    if (this.snakeUpdate(time)) {
      //  If the snake updated, we need to check for collision against food
      if (this.collideWithFood(this.food)) {
        this.repositionFood();
      }
    }
  }

  repositionFood() {
    //  First create an array that assumes all positions
    //  are valid for the new piece of food

    //  A Grid we'll use to reposition the food each time it's eaten
    var testGrid = [];

    for (var y = 0; y < 30; y++) {
      testGrid[y] = [];

      for (var x = 0; x < 40; x++) {
        // @ts-ignore
        testGrid[y][x] = true;
      }
    }

    this.updateGrid(testGrid);

    //  Purge out false positions
    var validLocations = [];

    for (var y = 0; y < 30; y++) {
      for (var x = 0; x < 40; x++) {
        if (testGrid[y][x] === true) {
          //  Is this position valid for food? If so, add it here ...
          validLocations.push({ x: x, y: y });
        }
      }
    }

    if (validLocations.length > 0) {
      //  Use the RNG to pick a random food position
      var pos = Phaser.Math.RND.pick(validLocations);

      //  And place it
      this.food.setPosition(pos.x * this.size, pos.y * this.size);

      return true;
    }
    else {
      return false;
    }
  }
}
