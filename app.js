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
    for ( let i = 0 ; i < data.length  ; i++){
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
            
        })
    })

}

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
        }

}
const container = document.getElementById('output');
const output = (e)=>{
    const data = e;
    
    container.className = "output"
    container.innerHTML = `<div id="remove">X</div><span id="number">${data.number}</span><span id="symbol">${data.symbol}</span><span id="atomic_mass">${data.atomic_mass.toLocaleString()}</span><button id="btnName">${data.name}</button>`;
    container.style.display = 'grid';

    const remove = document.getElementById('remove');

    remove.addEventListener('click',()=>{
        table.childNodes.forEach((e)=>{e.style.cursor = "";})
        table.classList.remove('disable');
        container.style.display = 'none';
        table.style.color = 'black';
        text.innerHTML = 'Select an element';
    })

    const btnName = document.getElementById('btnName');

    btnName.addEventListener('click',()=>{
        
        text.innerHTML = '';
        
        const dataKeys = Object.keys(data);
        const dataValue = Object.values(data);
        
       

        for (let i = 0 ; i < dataKeys.length; i++) {

            // text.innerHTML = 
            text.innerHTML += `<span><span class = 'upper'> ${dataKeys[i]} : </span> ${dataValue[i]}</span> <br>`;
        }
        
        
    })

}

getData(trieElement);

// getData(click)


