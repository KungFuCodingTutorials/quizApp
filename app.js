// I'm the main JS file

let app = {};

// change question
let slideIndex = 1;

app.changeQuestion = function(n){

    let slide = document.getElementsByClassName('slide');

    if(n > slide.length){
        slideIndex = 1    
    }
    if(n < 1){
        slideIndex = slide.length;
    }
    for(let i=0;i<slide.length;i++){
        slide[i].style.display = 'none';
    }
    slide[slideIndex -1].style.display = '';

}

app.plusSlide = function(n){
    app.changeQuestion(slideIndex += n);
}


// Highlight section
app.highLight = function(){
    let allChoices = document.querySelectorAll('.choices');
    let form = document.querySelector('form');

    form.addEventListener('click',function(){
        let elements = this.elements;
        for(let i = 0; i<elements.length;i++){
            if(elements[i].type === "checkbox" && elements[i].checked){
                allChoices[i].style.backgroundColor = "white";
                allChoices[i].style.color = "black";
            }
            else if(elements[i].type === "checkbox" && elements[i]){
                allChoices[i].style.backgroundColor = "transparent";
                allChoices[i].style.color = "black";
            }
        }
    })


}

// store the user's answers

app.storeAnswers = function(){
    let payload = {};
    let form = document.querySelector('form');
    let elements = form.elements;

    for(let i = 0; i<elements.length;i++){
        if(elements[i].type !== "submit" && elements[i].checked){
            payload[elements[i].name] = elements[i].value;
        }

    }
    return payload;
}   



app.responseObject = function(){
    let responseObject = {};
    let payload = app.storeAnswers();
    let payloadValuesArray = Object.values(payload);

    let countResult = function(string){
        let count = 0;
        for(let i = 0; i < payloadValuesArray.length; ++i){
            if(payloadValuesArray[i] == string){
                count++;
            }
        }
        return count;
    }
    responseObject['a'] = countResult('a');
    responseObject['b'] = countResult('b');
    responseObject['c'] = countResult('c');
    responseObject['d'] = countResult('d');


    return responseObject;
}



app.quizResult = function(){

    let formContainer = document.querySelector('.formContainer');
    let photoA = document.querySelector('.photo.a');
    let photoB = document.querySelector('.photo.b');
    let photoC = document.querySelector('.photo.c');
    let photoD = document.querySelector('.photo.d');

    let responseObject = app.responseObject();
    let results = Object.keys(responseObject).reduce(function(a,b){
        return responseObject[a] > responseObject[b] ? a : b;
    })

    formContainer.classList.add('invisible');
    if(results === 'a'){
        photoA.classList.remove('invisible');
        photoA.classList.add('visible');
    }
    else if(results === 'b'){
        photoB.classList.remove('invisible');
        photoB.classList.add('visible');
    }
    else if(results === 'c'){
        photoC.classList.remove('invisible');
        photoC.classList.add('visible');
    }
    else if(results === 'd'){
        photoD.classList.remove('invisible');
        photoD.classList.add('visible');
    }
}


app.sendDataToServer = function(){
    let payload = app.storeAnswers();
    let xhr = new XMLHttpRequest();
    xhr.open('POST','/');
    let payloadString = JSON.stringify(payload);
    console.log(payloadString);
    xhr.send(payloadString);
}

let form = document.querySelector('form');
form.addEventListener('submit',function(event){
    event.preventDefault();
    app.storeAnswers();
    console.log(app.responseObject());
    app.quizResult();
    app.sendDataToServer();
    
})



app.init = function(){

    app.changeQuestion(slideIndex);

    app.highLight();

}

app.init();