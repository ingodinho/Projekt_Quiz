let data=[
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4a864049-816a-479e-8736-51740e8b724b.jpg",
      question:"Which ocean lies on the east coast of the United States?",
      choice:["Eastern","Pacific","Indian","Atlantic"],
      answer:"Atlantic"
    },
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/4d101ba1-9275-4fb5-ba2c-5606e6c0274e.jpg",
      question:"Which is the world's highest mountain?",
      choice:["K2","Makalu","Mount Everest","Kilimanjaro"],
      answer:"Mount Everest"
    },
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/07121a24-b34b-4711-9bfa-5287163e65ce.jpg",
      question:"Which of these cities is not in Europe?",
      choice:["Prague","Moscow","Barcelona","Reykjavik"],
      answer:"Moscow"
    },
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/467a486b-be3a-4183-90ed-dd6867d5852d.jpg",
      question:"True or False: Iceland is covered in ice.",
      choice:[true,false],
      answer:false
    },
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
      question:"The United Kingdom is comprised of how many countries?",
      choice:[1,2,3,4],
      answer:4
    },
    { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/ecf8af7b-8541-4572-b63b-ee7d7f9fc4cc.jpg",
      question:"Which of the following countries do not border France?",
      choice:["Germany","Netherlands","Spain","Italy"],
      answer:"Netherlands"
    },
      { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/6e99b817-7be7-4f8a-9146-3f602ac81fad.jpg",
      question:"Which U.S. state is the Grand Canyon located in?",
      choice:["Wyoming","Arizona","New Mexico","Nevada"],
      answer:"Arizona"
    },
   { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/866f119d-e5e2-45ca-846c-b6d10a59d1e4.jpg",
      question:"Which is the smallest country, measured by total land area?",
      choice:["Maldives","Monaco","Vatican"],
      answer:"Vatican"
    },
   { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/13efaf72-d695-4f65-b043-2b805b6a88eb.jpg",
      question:"Which is the longest river in the world?",
      choice:["Amazon River","Congo River","Yellow River","Nile River"],
      answer:"Nile River"
    },
   { 
      url:"https://cdn.playbuzz.com/cdn//f063e8fe-ad57-485e-8211-ed2ee0d9a205/1226f177-dc1a-4142-8875-bdaa177717d7.jpg",
      question:"Which is the largest body of water?",
      choice:["indian Ocean","Pacific Ocean","Atlantic Ocean","Nile River"],
      answer:"Pacific Ocean"
    }
]

const content = document.querySelector('.content');
const start = document.createElement('button');

start.classList.add('start');
start.textContent = 'Start Quiz!'
content.insertAdjacentElement('afterbegin', start);

let score = 0;
const maxScore = data.length;
let counter = 0;

const createElements = () => {
  start.remove();

  // SCOREBOARD
  const scoreBoard = document.createElement('div');
  const scoreHeadline = document.createElement('h4');
  const scores = document.createElement('div');

  scoreBoard.classList.add('score-board');
  scores.classList.add('scores');

  scoreHeadline.textContent = 'SCORE';
  scores.textContent = `${score} / ${maxScore}`;

  scoreBoard.insertAdjacentElement('beforeend',scoreHeadline);
  scoreBoard.insertAdjacentElement('beforeend',scores);
  content.insertAdjacentElement('afterbegin',scoreBoard);

  // QUIZ
    data.forEach(el => {
        // CREATE ELEMENTS
        const container = document.createElement('div');
        const img = document.createElement('img');
        const question = document.createElement('h3');
        const answersBlock = document.createElement('div');

        // ADD CLASSES
        container.classList.add('container');
        answersBlock.classList.add('answers-block');

        // ADD CONTENT
        img.setAttribute('src', el.url);
        question.textContent = el.question;
        el.choice.forEach(ele => {
            // answersBlock.insertAdjacentHTML('beforeend', `<button class='choice'>${ele}</button>`);
            const choice = document.createElement('button');
            choice.classList.add('choice');
            choice.textContent = ele;
            answersBlock.insertAdjacentElement('beforeend', choice);
        })

        // insert ELEMENT
        container.insertAdjacentElement('beforeend',img);
        container.insertAdjacentElement('beforeend',question);
        container.insertAdjacentElement('beforeend',answersBlock);

        content.insertAdjacentElement('beforeend', container);


        // CONTROL ANSWER
        const control = (e) => {
            // Guard
            if(!e.target.classList.contains('choice')) return;

            counter++;
            scoreBoard.classList.remove('score-up');

            if(e.target.textContent == el.answer.toString()) {
              e.target.classList.add('right');
              requestAnimationFrame(() => scoreBoard.classList.add('score-up'));
              // scoreBoard.classList.add('score-up');
              score++;
            } else {
              e.target.classList.add('wrong');
            }
            // e.target.textContent == el.answer.toString() ? e.target.classList.add('right') : e.target.classList.add('wrong');
            scores.textContent = `${score} / ${maxScore}`;
            answersBlock.removeEventListener('click',control);
            if(counter === data.length) {
              setTimeout(()=> scoreBoard.classList.add('score-board-end'),1000)
              ;
            }
        }

        // EVENT LISTENER
        answersBlock.addEventListener('click', control)
    })
}


// EVENT LISTENER 
document.querySelector('.start').addEventListener('click', createElements);