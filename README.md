
# Rock, paper, scissors

### Abstract:
Sometimes, important decision making does come down to a game of rock, paper and scissors and you might not have an opponent worthy enough to hang with you for 20+ rounds. This app solves that problem while having smooth transitions to ensure that each round looks and feels as important as it truly is.

- The application lets the user choose their warrior name and avatar. The first alphabet of the name is automatically uppercased. These details are then displayed on the sidebar representing the player.
- The user gets to choose between a classic 3 fighter or a difficult 5 fighter game version.
- The user can hover on a fighter to see who that fighter beats.
- Once a fighter is selected, the user is taken to a showdown screen where they can click their own fighter to re-select their fighter.
- On this showdown screen, the user is required to click a `reveal` card to display computer's choice.
- Once computer choice is revealed, the result is declared with corresponding animation on the fighter cards.
- After a round, the screen is automatically reloaded to select a fighter again within the same game type.
- The user can also choose to click `change game` button and they'll get to choose between the game types.
- The score is updated on the sidebars after each round.


### Installation Instructions:
1. Make sure you're on [this page](https://github.com/taranveersingh93/rockPaperScissors)
2. Click on the green `code` button and copy the SSH
3. In your terminal, browse to the desired directory and enter the command `git clone [SSH]`
4. Enter the command `cd rockPaperScissors`
5. Enter the command `open index.html`


### Preview of App:

![demo of the application](https://user-images.githubusercontent.com/122247155/234115451-c3831165-cbd3-4807-a51a-dbc849d843a7.gif)

### Context:
I worked on the application for about 15 hours. Beyond the obvious functionality of a rock, paper, scissors game, I chose to focus on making elements interactive with the mouse hover.
At the time of doing this project, I am 5 weeks into mod 1 of Turing.

### Contributors:
[Taranveer Singh](https://github.com/taranveersingh93)

### Learning Goals:
- Gain experience building an application that utilizes HTML, CSS and JavaScript
- Keep javascript DRY and follow SRP despite complex functionalities
- Use event delegation appropriately
- Have user input modify data model first and then render the DOM from data model
- Make the website interactive enough that the user is invested in playing the game

### Wins + Challenges:
Wins:
- Used Javascript and CSS together fluently to create smooth and clean animations.
- Maintained the single responsibility principle.
- Kept the functions dynamic so that they could be reused.
- Utilized event delegation and bubbling to have efficient event listeners and non repeating functions.

Challenges: 
- Since I was trying out some CSS features for the first time, I did run into some unexpected looking animations but I was able to contextualize every visual bug to code. This helped me narrow down what needed to change to have the desired effect/functionality.
- Once done with the project, I realized that I was referring to multiple data models. As best practice, I combined them to be stored in a single data model object `game` and referred to it throughout. 
- Sometimes, my functions were modifying data model and DOM at the same trigger. While nothing broke, it didn't allow my data model to be the "source of truth" for the DOM. I am glad I kept a conscious memory of why we need data model. This helped me refactor my DOM functions to not respond to the user inputs directly but to feed off of the data model instead.