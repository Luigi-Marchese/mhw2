function divSelezionato(event){
    const div = event.currentTarget;
    let boxScelto = div.querySelector('img.checkbox');
    boxScelto.src='images/checked.png';
    div.classList.remove('inizio');
    div.classList.remove('nonSelezionato');
    div.classList.add('selezionato');
    opacizzazione(div.dataset.questionId, div.dataset.choiceId);
    controlloQuiz();
}

function opacizzazione(id_domanda, id_scelta){
    const div = document.querySelectorAll('div');
    for(let divCercato of div){
         if(divCercato.dataset.questionId===id_domanda && divCercato.dataset.choiceId!==id_scelta){
            divCercato.classList.remove("selezionato");
            divCercato.classList.add('nonSelezionato');
            let boxScelto = divCercato.querySelector('img.checkbox');
            boxScelto.src='images/unchecked.png';
        }
    }
}

function controlloQuiz(){
    let c =0;
    let listaSceltaID=[];
    const div = document.querySelectorAll('div.selezionato');
    for(const dselezionato of div){
        listaSceltaID.push(dselezionato.dataset.choiceId);
        c= c+1;      
    } 
       
    if(c===3){
        const eliminazioneEvDiv = document.querySelectorAll('div');
        for(const elDiv of eliminazioneEvDiv){
            elDiv.removeEventListener('click', divSelezionato);
        }
        quizCompletato(listaSceltaID);
    }
}
function reset(){
    const divContainerText = document.querySelector('#containerText');
    divContainerText.innerHTML='';
    const divContainerButton = document.querySelector('#containerButton');
    divContainerButton.innerHTML='';
    
    const divRes = document.querySelectorAll('.choice-grid div');
    const buttRes= document.querySelectorAll('img.checkbox');
    for(const div of divRes){
        div.classList.remove('selezionato');
        div.classList.remove('nonSelezionato');
        div.classList.add('inizio');
        div.addEventListener('click', divSelezionato);  
    }
    for(const butt of buttRes){
        butt.src='images/unchecked.png';
    }
}

function quizCompletato(lista){
    const stringa0=lista[0];
    const stringa1=lista[1];
    const stringa2=lista[2];
    const new_h1 = document.createElement('h1');
    const new_p = document.createElement('p');
    const new_button = document.createElement('button');
    const divContainerText = document.querySelector('#containerText');
    const divContainerButton = document.querySelector('#containerButton');
    new_button.textContent="Ricomincia il quiz";
    new_button.addEventListener('click', reset);
    if(stringa0===stringa1 || stringa0===[stringa2]){
        new_h1.textContent= RESULTS_MAP[stringa0].title;
        new_p.textContent=RESULTS_MAP[stringa0].contents;
    }else if(stringa1===stringa2){
        new_h1.textContent= RESULTS_MAP[stringa1].title;
        new_p.textContent=RESULTS_MAP[stringa1].contents;
    }else{
        new_h1.textContent= RESULTS_MAP[stringa0].title;
        new_p.textContent=RESULTS_MAP[stringa0].contents;
    }    
    
    divContainerText.appendChild(new_h1);
    divContainerText.appendChild(new_p);
    divContainerButton.appendChild(new_button);
}

const divScelto = document.querySelectorAll('div');
for(const scelta of divScelto){
    scelta.addEventListener('click', divSelezionato);
}
