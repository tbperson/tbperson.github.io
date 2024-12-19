const christmasJokes = [
    ["Why did Santa go to music school?", "To improve his wrapping skills!"],
    ["What do snowmen eat for breakfast?", "Frosted flakes!"],
    ["Why are Christmas trees so bad at sewing?", "They always drop their needles!"],
    ["What do you get if you cross a snowman and a dog?", "Frostbite!"],
    ["Why did Rudolph get a bad report card?", "Because he went down in history!"],
    ["What do you call Santa when he stops moving?", "Santa Pause!"],
    ["How much did Santa pay for his sleigh?", "Nothing, it was on the house!"],
    ["What do elves learn in school?", "The elf-abet!"],
    ["Why don’t crabs celebrate Christmas?", "Because they’re shell-fish!"],
    ["What does Santa do in his garden?", "He hoes, hoes, hoes!"],
    ["What’s a sheep’s favorite Christmas song?", "Fleece Navidad!"],
    ["What do you get when you combine a Christmas tree and an iPad?", "A pineapple!"],
    ["Why did the turkey join the band?", "Because it had the drumsticks!"],
    ["What do you call an old snowman?", "Water!"],
    ["What’s Santa’s favorite type of music?", "Wrap!"],
    ["Why did the Christmas cookie go to school?", "It wanted to be a smart cookie!"],
    ["What kind of motorbike does Santa ride?", "A Holly Davidson!"],
    ["What’s a Christmas tree’s favorite candy?", "Orna-mints!"],
    ["How do you help someone who lost their Christmas spirit?", "Nurse them back to elf!"],
    ["What did one snowman say to the other?", "Do you smell carrots?"],
    ["Why don’t reindeer tell secrets?", "Because they’re afraid they’ll get sleighed!"],
    ["What do elves use to take photos?", "Elf-ies!"],
    ["Why is it cold on Christmas?", "Because it’s Decembrrr!"],
    ["What’s Santa’s favorite candy?", "Jolly Ranchers!"],
    ["Why did the boy bring a ladder to Christmas dinner?", "He heard it was a high-stakes meal!"],
    ["What do you call a cat on Christmas?", "Santa Claws!"],
    ["How do Christmas trees keep in shape?", "They do tree-robics!"],
    ["What’s a reindeer’s favorite game?", "Stable tennis!"],
    ["What’s a snowman’s favorite drink?", "Iced tea!"],
    ["Why did Santa cross the road?", "To get to the other sleigh!"],
    ["What kind of photos do elves take?", "Elfies!"],
    ["Why did the gingerbread man go to school?", "To become a smart cookie!"],
    ["What do you call a reindeer that tells jokes?", "Comet-y!"],
    ["What’s Santa’s favorite state?", "Ida-ho, ho, ho!"],
    ["Why does Santa have three gardens?", "So he can ho, ho, ho!"],
    ["Why do mummies like Christmas?", "Because of all the wrapping!"],
    ["What do you call a Christmas party in space?", "A meteoroid shower!"],
    ["How do snowmen travel?", "By riding an icicle!"],
    ["Why was the elf cold?", "Because it left its elf coat at home!"],
    ["What do you call a bankrupt Santa?", "Saint Nickel-less!"],
    ["Why does Santa like gardening?", "Because he likes hoeing around!"],
    ["Why don’t Christmas trees knit?", "They’re afraid they’ll drop their needles!"],
    ["What do elves do after school?", "Gnome-work!"],
    ["Why don’t penguins fly?", "Because they’re not tall enough to be pilots!"],
    ["Why does Santa wear a red suit?", "Because it’s suited for Claus-trophobia!"],
    ["What do you call an elf who sings?", "A wrapper!"],
    ["What did the snowman order at the fast food restaurant?", "An ice burger!"],
    ["Why don’t reindeer like picnics?", "Because of all the ant-lures!"],
    ["What’s Santa’s favorite cereal?", "Frosted Cheerios!"],
    ["Why did Santa wear sunglasses?", "Because his sleigh was too bright!"],
    ["What’s the best Christmas present?", "A broken drum—you can’t beat it!"],
    ["What kind of bug loves Christmas?", "A humbug!"],
    ["Why does Santa go down the chimney?", "Because it soot-s him!"],
    ["What do you get if you eat Christmas decorations?", "Tinselitis!"],
    ["What do you call a Santa who sleeps too much?", "Santa Snooze!"],
    ["What’s a snowman’s favorite food?", "Chill-i!"],
    ["Why did the Christmas lights break up?", "They couldn’t find the spark!"],
    ["What do you get when you cross Santa with a duck?", "A Christmas quacker!"],
    ["How does a snowman get around?", "By riding an icicle!"],
    ["What do elves do when they’re stressed?", "They have an elf-care day!"],
    ["What’s an elf’s favorite food?", "Candy canes!"],
    ["Why did the elf go to school?", "To improve his elf-esteem!"],
    ["What do you call a frog hanging from a Christmas tree?", "Mistle-toad!"],
    ["What kind of cars do elves drive?", "Toy-otas!"],
    ["Why did the ornaments break up?", "They were in pieces!"],
    ["What’s Santa’s favorite color?", "Red-y or not!"],
    ["What’s Santa’s favorite type of weather?", "A sleigh storm!"],
    ["Why did the gingerbread man go to the doctor?", "He felt crumby!"],
    ["What’s a Christmas tree’s least favorite drink?", "Root beer!"],
    ["Why don’t elves get sick?", "They have plenty of vitamin elf!"],
    ["Why is it hard to keep a secret at the North Pole?", "Because your breath always gives it away!"],
    ["What’s a reindeer’s favorite treat?", "Carrot cake!"],
    ["What do you call an elf who acts out?", "Elfish!"],
    ["What’s a Christmas tree’s favorite bird?", "The ornament owl!"],
    ["What’s a snowman’s favorite candy?", "Snowcaps!"],
    ["Why do elves love the news?", "For all the gnome-ments!"],
    ["What do reindeer hang on their trees?", "Horn-aments!"],
    ["What do you call Santa’s little helpers?", "Subordinate Clauses!"],
    ["What’s Santa’s favorite fruit?", "Sugar plums!"],
    ["Why are Christmas elves so small?", "They’ve got elf-esteem issues!"],
    ["Why was the elf depressed?", "He felt unwrapped!"]
];

function pickJoke() {
    let randomIndex = Math.floor(Math.random() * christmasJokes.length);
    let joke = christmasJokes[randomIndex][0];
    let answer = christmasJokes[randomIndex][1];

    let jokesContainer = document.getElementById('jokes-container');
    jokesContainer.querySelector('h1').textContent = joke;

    jokesContainer.addEventListener('click', function() {
        jokesContainer.querySelector('h1').textContent = answer;
        jokesContainer.style.transition = 'transform 0.5s';
        jokesContainer.style.transform = 'scale(1.1)';

        setTimeout(function() {
            jokesContainer.style.transform = 'scale(1)';
        }, 300);
    });
}
window.addEventListener('load', function() {
    pickJoke();
    let audio = new Audio('christmas_music.mp3');
    audio.loop = true;
    audio.play();
});