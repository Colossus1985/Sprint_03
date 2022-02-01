let words = [];
//fonction qui permet d'écrire un participant dans le texte et de l'ajouter dans le tableau" words"

function add_name() {
  let userAdd = document.getElementById('input_name').value;

  //vérifie si le texte est vide donc ne fais rien
  if (userAdd != '') {
    words.push(userAdd);
    name_info();

  }
}
function name_info() {
    let showInfo = '';
  
    // inscrit pour chaque nom entrer dans le tableau "words" un <li>
    words.forEach(word =>
      showInfo += `
          <tr >
          <td>${word}</td>
          <td>(horaire+date)</td>
          <td>(bonton)</td>     
          </tr>
          `
        //   <p class="display-4">${word}<span class="float-right"><button  onClick="del(this)" class="btn btn-danger">X</button></span></p>
    );
    document.getElementById("ajout_nouveau").innerHTML = showInfo;
    document.getElementById('input_name').value = null;
  
    console.log("tableau:", words);

    return false;
    //empeche l'actualisation de la page
  
  }