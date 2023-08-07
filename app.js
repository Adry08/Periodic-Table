const table = document.getElementById('table');

const text = document.getElementById('text');

const getData = async(e) =>{ 
 
    await fetch('./PeriodicTableJSON.json')
        .then((response) => response.json())
        .then((json) => elements = json.elements)
    
    e(elements);
}



const trieElement = (e)=>{
   
    const data = e;
    for (let i = 0 ; i < data.length  ; i++){
        let element = data[i];

        // console.log(i + " " + element.symbol + " : "+" Xpos : "+element.xpos+" | "+"Ypos : "+element.ypos );
        
        let newElement = document.createElement('div');
        newElement.textContent = element.symbol;
        
        let category;

        if (element.category === "diatomic nonmetal" || element.category === "polyatomic nonmetal"){
            category = "nonMetal";
        }else if (element.category === "noble gas"){
            category = "nobleGas";
        }else if (element.category === "alkali metal"){
            category = "alkaliMetal";
        }else if (element.category === "alkaline earth metal"){
            category = "alkaliEarthMetal";
        }else if (element.category === "metalloid"){
            category = "metalloid";
        }else if (element.category === "post-transition metal"){
            category = "post-transitionMetal";
        }else if (element.category === "transition metal"){
            category = "transitionMetal";
        }else if (element.category === "lanthanide"){
            category = "lanthanide";
        }else if (element.category === "actinide"){
            category = "actinide";
        }else{
            category = "unknown";
        }

        newElement.className = `element ${category}`;
            
        newElement.id = element.number;

        
        let Ypos = element.ypos;

        let Xpos = element.xpos;

        newElement.style.gridRow = Ypos;

        newElement.style.gridColumn = Xpos;

        table.appendChild(newElement);

        
    };
    
    click(data);
    
}

const click = (el) =>{
    
    const btn = document.querySelectorAll('.element');
    
    btn.forEach((e)=>{

        e.addEventListener('click',(ee)=>{
            
            table.childNodes.forEach((e)=>{e.style.cursor = "not-allowed";})

            

            if (table.className !== "disable"){
                table.classList.add('disable');
                
                let a = el;
                let b = ee.target.id;            
                findEl(a,b)
            };
            
        });
    });

};

const findEl = (a,b) =>{
    // console.log(a);
    // console.log(b);
    let i = 0 ;
        let find = false;
        while (find === false){
            
            if (a[i].number == b){
                find = true;
                let data = a[i];
                output(data);

            }i++;
        };

};

const remove = ()=>{

    const remove = document.querySelectorAll('.remove');
    remove.forEach((e)=>{
        
        e.addEventListener('click',()=>{
    
        table.childNodes.forEach((e)=>{e.style.cursor = "";})
        table.classList.remove('disable');
        container.style.display = 'none';
        // table.style.color = 'black';
        text.innerHTML = 'Select an element';
    });
    });
};



const container = document.getElementById('output');
const output = (e)=>{
    const data = e;
    
    container.className = "output"
    container.innerHTML = `<div class="remove">X</div><span id="number">${data.number}</span><span id="symbol">${data.symbol}</span><span id="atomic_mass">${data.atomic_mass.toLocaleString()}</span><button id="btnName">${data.name}</button>`;
    container.style.display = 'grid';

    remove();

   

   

    const btnName = document.getElementById('btnName');

    btnName.addEventListener('click',()=>{
        
        text.innerHTML = '';
        
        // const dataKeys = Object.keys(data);
        // const dataValue = Object.values(data);
        
        const btnRemove = document.createElement('div');
        btnRemove.className = 'remove';
        btnRemove.innerText = 'X';
        text.appendChild(btnRemove);

        

        // for (let i = 0 ; i < dataKeys.length; i++) {
            
            
        //     text.innerHTML = 
        //     text.innerHTML += `<span><span class = 'upper'> ${dataKeys[i]} : </span> ${dataValue[i]}</span> <br>`;
        // }
        
        text.innerHTML += `<div class='container'><h2 class = 'name'>${data.name}</h2> 
        <div class="img"><img src="${data.image.url}" alt="${data.image.attribution}">
        </div><div class="legend">${data.image.title}</div>
        <div class="summary">${data.summary}</div></div>
        <div class="container"><div class="general">
        <span>Symbol : ${data.symbol}</span>
        <span>Block : ${data.block}</span>
        <span>Atomic mass : ${data.atomic_mass}</span>
        <span>Appearance : ${data.appearance}</span>
        <span>Number : ${data.number}</span>
        <span>Category : ${data.category}</span>
        </div></div>
        <div class="container"><div class="stat">
        <span>Boil : ${data.boil} °C</span>
        <span>Discovered by : ${data.discovered_by}</span>
        <span>Density : ${data.density}</span>
        <span>Melt : ${data.melt} °C</span>
        <span>Period : ${data.period}</span>
        <span>Group : ${data.group}</span>
        <span>Phase : ${data.phase}</span>
        <span>Electron affinity : ${data.electron_affinity}</span>
        <span>Electronegativity pauling : ${data.electronegativity_pauling}</span>
        </div></div>
        <div class="container"><a href="${data.source}">More</a></div>
        `

        remove();
        
        
    })

}

getData(trieElement);

getData(click)




const getQuiz = async() => {

    await fetch('./Quiz.json')
        .then((response) => response.json())
        .then((json) => {
            let quiz = json.quiz
            
            let i = 0
            quuiz(i,quiz);
            
        })
    
    
} 

getQuiz();

function quuiz(e,f){
    let i = e;
    
    const quiz = f;
    while (i < quiz.length ){
        const question = document.getElementById('question');
        question.innerHTML = quiz[i].question + ' <span>___</span> .';

        const choose = document.getElementById('choose');
        choose.innerHTML = "";

        for (j of quiz[i].choix){
            choose.innerHTML += `<button class="buttonquiz" id="${j}">${j}</button>`
        };

        const btnQuiz = document.querySelectorAll('.buttonquiz');
        btnQuiz.forEach((e)=>{
            e.addEventListener('click',(e)=>{
                let choose = e.target;
                let answer = quiz[i].answer;
                const rep = document.querySelector('#question span');
                if (answer === choose.id){
                    rep.textContent = choose.id;
                    rep.classList.add('true');
                    choose.classList.add('true');
                    setTimeout(()=>{
                        choose.classList.remove('true');
                        rep.classList.remove('true');
                        rep.textContent = "____";
                },500)
                    i++;
                    setTimeout(()=>{
                        quuiz(i++,quiz)
                    },700);
                    
                    
                }else{
                    rep.textContent = choose.id;
                    rep.classList.add('false');
                    choose.classList.add('false');
                    setTimeout(()=>{
                        choose.classList.remove('false');
                        rep.classList.remove('false');
                        rep.textContent = "____";
                },500)
                    
                }

            })
           
        })
        break;
        
    }

    if (i == quiz.length){
        document.querySelector('.containerquiz').innerHTML = '<span class="text-enter">Félicitation <br> Tu as tout fini !</span>'
    }
}
