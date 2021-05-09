var start = document.querySelector(".begin");
var timer;
var questions;
var time = 0;
var qIndex = 0;


fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple").then(function (res) {
    return res.json();
}).then(function (data) {
    console.log(data);
    questions = data.results;

    startApp();
});

const startApp = function() {
    function timerCycle() {
        //time++;
        document.querySelector("#stopwatch").textContent =
            moment().hour(0).minute(0).second(time++).format('HH : mm : ss');
    }
    
    
    start.addEventListener("click", function () {
        //hide start
        document.querySelector("#start").classList.add("hide");
    
        //show questions
        document.querySelector("#question").classList.remove("hide");
    
        //start timer - set interval google this
        timer = setInterval(timerCycle, 1000);
    
        showQuestions();
    
        console.log("Total Amount of Points: " + points);
    });
    
    var points = 0;
    
    var showQuestions = function () {
        //get current question
        var currentQ = questions[qIndex];
    
        var choices = currentQ.incorrect_answers;
        choices.push(currentQ.correct_answer);
    
        var sortedArray = shuffle(choices);
    
        //generate a template literal
        var template = `
            <div class="question-container">
                <h5>${currentQ.question}</h5>
                <div class="answer-choice-container">
                    <button class="answer-choice">${sortedArray[0]}</button>
                    <button class="answer-choice">${sortedArray[1]}</button>
                    <button class="answer-choice">${sortedArray[2]}</button>
                    <button class="answer-choice">${sortedArray[3]}</button>
                </div>
            </div>
        `;
        // currentQ.correct_answer.addEventListener("click", function () {
        //     points++;
        // })
        //conver the template literal into a html and add it to the page
        document.querySelector("#question").innerHTML = template;
    }
    
    const handleAnswer = function (event) {
        //get the chosen answer
        var chosenAns = event.target.textContent;
        //std answer
        var stdAns = questions[qIndex].correct_answer
    
        if (chosenAns === stdAns) {
            points++;
        }
    
        qIndex++;

        if (qIndex === questions.length) {
            endQuiz();
        } else {
            showQuestions();
        }
    }
    
    document.querySelector("#question").addEventListener("click", function (event) {
        if (event.target.className.indexOf("answer-choice") > -1) {
            handleAnswer(event);
        }
    });
    
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const endQuiz = function() {
        //hide everything
        document.querySelector("#question").classList.add("hide");
        
        //show end screen
        document.querySelector("#end-screen").classList.remove("hide");

        //show points
        var final_score = `
        <h1>Your final score is ${points}</h1>
        `;

        document.querySelector("#end-screen").innerHTML = final_score;

        //stop timer
        clearInterval(timer)

    }
}

