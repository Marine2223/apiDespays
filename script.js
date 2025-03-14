let box = document.querySelector('.box')
let data = []
let bouton = document.querySelector('.inpu')
let range = document.querySelector('.tirets')
let span = document.querySelector('.inp span')

async function paysList() {
    await fetch("https://restcountries.com/v3.1/all")
     .then((response) => response.json()
    ).then((res) => data = res)
    console.log(data);
    affichDonne(data.slice(0, range.value)) 
}

function affichDonne(paysAffiche){
    let box = document.querySelector('.box')
    box.innerHTML = '';

    paysAffiche.forEach((pays)=>{
        let div = document.createElement("div");
        let image = document.createElement('img')
        let titre = document.createElement('h2')
        let titre1 = document.createElement('h3')
        let para = document.createElement('p')
        
        image.src = pays.flags.svg
        titre.textContent = pays.name.common
        titre1.textContent = pays.capital
        para.textContent = `Population: ${pays.population}`;

        image.style.width = '90px'
        image.style.height = '90px'
        div.style.backgroundColor = 'black'
        div.style.width = '23vw'
        div.style.height = '37vh'
        div.style.borderRadius = '30px'
        div.style.color = 'white'
        div.style.lineHeight = '35px'
        div.style.paddingTop = '25px'
        div.style.textAlign = 'center'

        div.appendChild(image);
        div.appendChild(titre);
        div.appendChild(titre1);
        div.appendChild(para);

        box.appendChild(div);
    })
}

function recherche(){
    let recherche = document.querySelector('.inpu').value.toLowerCase();
    let paysCherche = data.filter((pays) => {
        return pays.name.common.toLowerCase().includes(recherche);
    })
    affichDonne(paysCherche.slice(0, range.value));
    // affichDonne(paysCherche);
}

document.querySelector('.inpu').addEventListener('input', function() {
    recherche(); 
}); 

function croissant() {
    data.sort((a, b) => a.population - b.population);
    affichDonne(data.slice(0, range.value))
}

function decroissant() {
    data.sort((a, b) => b.population - a.population);
    affichDonne(data.slice(0, range.value))
}

function alphabetique() {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    affichDonne(data.slice(0, range.value))
}

// Ajoutez des écouteurs d'événements pour les boutons de tri
document.querySelector('.btn1').addEventListener('click', croissant);
document.querySelector('.btn2').addEventListener('click', decroissant);
document.querySelector('.btn3').addEventListener('click', alphabetique);

// afficharge du nombre en fonction de range

range.addEventListener('input', (e)=>{
    let nPays = e.target.value;
    span.textContent = nPays;
    affichDonne(data.slice(0, range.value))
})

window.addEventListener('load',paysList)

bouton.addEventListener("click", (e) => {
    bouton.classList.add('boutonhover')
})
