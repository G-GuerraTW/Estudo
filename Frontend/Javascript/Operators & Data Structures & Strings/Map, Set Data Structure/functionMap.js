 /************************************
  * WHAT ARE MAPS IN JAVASCRIPT
 *************************************/
//CREATING A MAP
let question = new Map();

//SET() - ADD ENTRIES TO A MAP
question.set('question', 'In which year ES¨was released?')
question.set(1, 2009)
.set(2, 2013)
.set(3, 2015)
.set(4, 2018)
.set('correct', 3)
.set(true, 'You answer is correct.')
.set(false, 'The answer you entered is wrong');

console.log(question);

//RETRIVING VALUE FROM A MAP
let quest = question.get('question')
console.log(quest);
console.log(question.get(1));
console.log(question.get(2));
console.log(question.get(3));
console.log(question.get(4));


//PROMPT USER TO ENTER ANSWER
let ans = parseInt(prompt('Please provide your option for the answer.'));
let isCorrect = ans === question.get('correct');
console.log(question.get(isCorrect));

//OTHER USEFUL METHODS OF A MAP
//HAS() - RETURNS TRUE IF A MAP HAS A CERTAIN KEY, ELSE RETURNS FALSE 
console.log(question.has('correct'));
console.log(question.has('wrong'));

//SIZE - RETURNS NUMBER OF ENTRIES WHICH A MAP HAS
console.log(question.size);

//DELETE - DELETES AN ENTRY IN MAP WITH A GIVEN KEY
question.delete(4);
console.log(question);

//CLEAR - IT DELETE ALL ENTRY IN A MAP WITH A GIVEN KEY
question.clear();
console.log(questio);

//A MAP IS A INTERABLE CAN USE FOR LOOP