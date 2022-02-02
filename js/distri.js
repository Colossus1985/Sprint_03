//Storage.clear();
var list_user = [];
var list_user_suivant = [];
var list_user_traite = [];
var list_user_recharge_LS = [];
var list_user_traite_LS = [];

var iterance = 0;

//récupération des participant du localStorage avec le chargement de la page;
var list_user_LS = localStorage.getItem("list_user");
//retransformer en objet
if (list_user_LS != "" && list_user_LS != null) {
  list_user_LS = JSON.parse(list_user_LS); //transformer le string du LS en liste d'objet
  for (var i = 0; i < list_user_LS.length; i++) {
    //récupération de chaque valeur de chaque participant
    var nom = list_user_LS[i].nom;
    var time = list_user_LS[i].time;
    //appel de la fonction pour réintégrer les participant dans la liste d'affichage
    //avec comme paramètre les valeur appartenant à l'objet correspondnant
    recup_list_user_LS(nom, time);
  }
}

var list_user_traite_LS = localStorage.getItem("list_user_traite");
if (list_user_traite_LS != "" && list_user_traite_LS != null) {
  list_user_traite_LS = JSON.parse(list_user_traite_LS);
  for (var i = 0; i < list_user_traite_LS.length; i++) {
    var nom = list_user_traite_LS[i].nom;
    var time = list_user_traite_LS[i].time;
    recup_list_user_traite_LS(nom, time);
  }
}

function recup_list_user_LS(nom, time) {
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(nom, time);

  function Person(nom, time) {
    this.nom = nom;
    this.time = time;
  }

  list_user.push(person);
  console.log(list_user);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var btn_passer = document.createElement("button");

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";

  for (i; i < list_user.length; i++) {
    if (list_user[i] == list_user[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    }

    td_nom.textContent = list_user[i].nom;
    td_date.textContent = time;
    btn_passer.textContent = "Je passe mon tour";

    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
}

function recup_list_user_traite_LS(nom, time) {
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(nom, time);

  function Person(nom, time) {
    this.nom = nom;
    this.time = time;
  }

  list_user_traite.push(person);
  console.log(list_user_traite);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");

  tr_personne.className = "tr_demandant_base";

  for (i; i < list_user_traite.length; i++) {
    td_nom.className = "td_nom_demandant_traite";
    td_date.className = "td_date_demandant_traite";
    td_btn_passer.className = "td_btn_passer_traite";

    td_nom.textContent = list_user_traite[i].nom;
    td_date.textContent = time;

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
}

function date_time() {
  const date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  var date_hour =
    ("0" + (day - 1)).slice(-2) +
    "/" +
    ("0" + (month + 1)).slice(-2) +
    "/" +
    year +
    ", " +
    ("0" + hour).slice(-2) +
    ":" +
    ("0" + min).slice(-2) +
    ":" +
    ("0" + sec).slice(-2);

  return date_hour;
}

function add_name() {
  var time = date_time();
  var table_personnes = document.getElementById("table_personnes");
  var nom = document.getElementById("input_name").value.toString();
  var person = new Person(nom, time);
  var i = 0;

  function Person(nom, time) {
    this.nom = nom;
    this.time = time;
  }

  list_user.push(person);
  console.log(list_user);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var btn_passer = document.createElement("button");

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";

  for (i; i < list_user.length; i++) {
    if (list_user[i] == list_user[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    }

    td_nom.textContent = list_user[i].nom;
    td_date.textContent = time;
    btn_passer.textContent = "Je passe mon tour";

    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }

  localStorage.setItem("list_user", JSON.stringify(list_user));
}

function suivant() {
  console.log("ici");
  if (list_user[iterance] == list_user[0]) {
    console.log(list_user[0]);
    var user_traite = list_user.shift();
    console.log(user_traite);
    list_user_traite.push(user_traite);
    console.log(list_user_traite);
  }
  const list_user_copy = [...list_user]; //copy la list_user dans const
  for (var c = 0; c < list_user_copy.length; c++) {
    var nom = list_user_copy[c].nom;
    var time = list_user_copy[c].time;
    recharge_list_suivant(nom, time);
  }

  localStorage.clear("list_user");
  console.log("ici");
  localStorage.setItem("list_user", JSON.stringify(list_user_copy));
  localStorage.setItem("list_user_traite", JSON.stringify(list_user_traite));
}

function recharge_list_suivant(nom, time) {
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(nom, time);

  function Person(nom, time) {
    this.nom = nom;
    this.time = time;
  }

  list_user_suivant.push(person);
  console.log(list_user_suivant);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var btn_passer = document.createElement("button");

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";

  for (i; i < list_user_suivant.length; i++) {
    if (list_user_suivant[i] == list_user_suivant[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    }

    td_nom.textContent = list_user_suivant[i].nom;
    td_date.textContent = time;
    btn_passer.textContent = "Je passe mon tour";

    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
  localStorage.setItem("list_user", JSON.stringify(list_user));
}
