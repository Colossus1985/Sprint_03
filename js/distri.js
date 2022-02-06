//localStorage.clear();
var list_user = [];
var list_user_new = [];
var list_user_suivant = [];
var list_user_traite = [];
var list_user_traite_new = [];
var list_user_traite_LS = [];
var list_user_passer = [];
var list_user_passer_new = [];
var list_user_passer_LS = [];

var regex = /^([-'a-zA-Z0-9àâçéèêëîïôûùüÿñæœ_]*)$/;
var iterance = 0;

//###---controle des entrées de chararctères---###############################

const input_nom = document.getElementById("input_name");
input_nom.addEventListener("keydown", (event) => {
  var key_entre = event.key;
  if (!key_entre.match(regex)) {
    event.preventDefault();
    alert("Seulement les lettres et chiffres ainsi que ' ' ' et ' - ' !");
  }
});

//###---récupration des différents liste dans le LocalStorage---###############
//liste des personnes adentant d'étre aide (en blanc)
function recup_list_LS(id_list, recup_list_user_fct) {
  var list_user = localStorage.getItem(id_list);
  if (list_user != "" && list_user != null) {
    list_user = JSON.parse(list_user);
    for (var i = 0; i < list_user.length; i++) {
      var id = list_user[i].id;
      var nom = list_user[i].nom;
      var time = list_user[i].time;
      recup_list_user_fct(id, nom, time);
    }
  }
  return list_user;
}

var list_user_LS = recup_list_LS("list_user", recup_list_user_LS);
var list_user_passer_LS = recup_list_LS("list_user_passer", recup_list_user_passer_LS);
var list_user_traite_LS = recup_list_LS("list_user_traite", recup_list_user_traite_LS);

/*
var list_user_LS = localStorage.getItem("list_user");
if (list_user_LS != "" && list_user_LS != null) {
  list_user_LS = JSON.parse(list_user_LS);
  for (var i = 0; i < list_user_LS.length; i++) {
    var id = list_user_LS[i].id;
    var nom = list_user_LS[i].nom;
    var time = list_user_LS[i].time;
    recup_list_user_LS(id, nom, time);
  }
}

var list_user_passer_LS = localStorage.getItem("list_user_passer");
if (list_user_passer_LS != "" && list_user_passer_LS != null) {
  list_user_passer_LS = JSON.parse(list_user_passer_LS);
  for (var i = 0; i < list_user_passer_LS.length; i++) {
    var id = list_user_passer_LS[i].id;
    var nom = list_user_passer_LS[i].nom;
    var time = list_user_passer_LS[i].time;
    console.log(id, nom, time);
    recup_list_user_passer_LS(id, nom, time);
  }
}

var list_user_traite_LS = localStorage.getItem("list_user_traite");
if (list_user_traite_LS != "" && list_user_traite_LS != null) {
  list_user_traite_LS = JSON.parse(list_user_traite_LS);
  for (var i = 0; i < list_user_traite_LS.length; i++) {
    var id = list_user_traite_LS[i].id;
    var nom = list_user_traite_LS[i].nom;
    var time = list_user_traite_LS[i].time;
    recup_list_user_traite_LS(id, nom, time);
  }
}
*/
//###---fuctions pour reconstruire le tableau à partir des listes récuprérées dans le LocalStorage---###
//liste des personnes adentant d'étre aide (en blanc)
function recup_list_user_LS(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user.push(person);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var btn_passer = document.createElement("button");
  var a = document.createElement("a");
  var span = document.createElement("span");
  a.href = "";

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";
  span.className = "hide_id_on_btn";
  a.className = "link_all_btn";
  btn_passer.setAttribute("onclick", "passer(textContent)");

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
    td_date.textContent = list_user[i].time;
    a.textContent = "Je passe mon tour ";
    span.textContent = id;

    a.appendChild(span);
    btn_passer.appendChild(a);
    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
}

//liste des personnes déjà traitées (en vert)

function recup_list_user_traite_LS(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user_traite.push(person);
  //console.log(list_user_traite);

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
    td_date.textContent = list_user_traite[i].time;

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
}

//liste des personnes ayant annulé leur demande d'aide (en gris)

function recup_list_user_passer_LS(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  console.log(nom);
  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user_passer.push(person);
  console.log(list_user_passer);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var balise_barrer = document.createElement("del");

  tr_personne.className = "tr_demandant_base";

  for (i; i < list_user_passer.length; i++) {
    td_nom.className = "td_nom_demandant_passer";
    td_date.className = "td_date_demandant_passer";
    td_btn_passer.className = "td_btn_passer_passer";

    balise_barrer.textContent = list_user_passer[i].nom;
    td_date.textContent = list_user_passer[i].time;

    td_nom.appendChild(balise_barrer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
}

//###---création de l'id---##################################################

function id_user() {
  let id = 1;
  while (verification_Id_user(list_user, id)) {
    id++;
  }
  id = ("000" + id).slice(-4);
  return id;
}
function verification_Id_user(list_user, id) {
  for (var i = 0; i < list_user.length; i++) {
    if (list_user[i].id == id) {
      return true;
    }
  }
  return false;
}

//###---création de la date et temps + concatenation---######################

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

//#####---btn_ajout---########################################################################
//créer et ajouter un objet personne à la liste
function add_person(nom) {
  var id = id_user();
  var time = date_time();
  var nom = nom;
  var table_personnes = document.getElementById("table_personnes");
  var i = 0;

  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
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
  var a = document.createElement("a");
  var span = document.createElement("span");
  a.href = "";

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";
  span.className = "hide_id_on_btn";
  a.className = "link_all_btn";
  btn_passer.setAttribute("onclick", "passer(textContent)");

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
    td_date.textContent = list_user[i].time;
    a.textContent = "Je passe mon tour ";
    span.textContent = id;

    a.appendChild(span);
    btn_passer.appendChild(a);
    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }

  localStorage.setItem("list_user", JSON.stringify(list_user));
}

//#########--btn_suivant---###################################################################

function suivant() {
  if (list_user[iterance] == list_user[0]) {
    var user_traite = list_user.shift();
    list_user_traite.push(user_traite);
  }

  for (var i = 0; i < list_user_passer.length; i++) {
    var id = list_user_passer[i].id;
    var nom = list_user_passer[i].nom;
    var time = list_user_passer[i].time;
    recharge_list_user_passer(id, nom, time);
  }

  const list_user_copy = [...list_user]; //copy la list_user dans const
  for (var c = 0; c < list_user_copy.length; c++) {
    var id = list_user_copy[c].id;
    var nom = list_user_copy[c].nom;
    var time = list_user_copy[c].time;
    recharge_list_user(id, nom, time);
  }

  localStorage.clear();

  localStorage.setItem("list_user", JSON.stringify(list_user_copy));
  localStorage.setItem("list_user_passer", JSON.stringify(list_user_passer));
  localStorage.setItem("list_user_traite", JSON.stringify(list_user_traite));
}

//######--btn_passer--############################################################################

function passer(textContent) {
  console.log("ici", textContent);
  var id_btn_passer = textContent.slice(-4);
  console.log(id_btn_passer);
  id_btn_passer = parseInt(id_btn_passer);

  for (var b = 0; b < list_user.length; b++) {
    if (id_btn_passer == list_user[b].id) {
      list_user_passer.push(list_user[b]);
      var user_nom = list_user[b].nom;
      for (var i = 0; i < list_user.length; i++) {
        if (user_nom == list_user[i].nom) {
          var indice_delete = i;
        }
      }
      list_user.splice(indice_delete, 1);
    }
  }

  const list_user_copy2 = [...list_user];
  for (var i = 0; i < list_user_copy2.length; i++) {
    var id = list_user_copy2[i].id;
    var nom = list_user_copy2[i].nom;
    var time = list_user_copy2[i].time;
    recharge_list_user(id, nom, time);
  }
  for (var b = 0; b < list_user_traite.length; b++) {
    var id = list_user_traite[b].id;
    var nom = list_user_traite[b].nom;
    var time = list_user_traite[b].time;
    recharge_list_user_traite(id, nom, time);
  }

  localStorage.clear();

  localStorage.setItem("list_user", JSON.stringify(list_user_copy2));
  localStorage.setItem("list_user_traite", JSON.stringify(list_user_traite));
  localStorage.setItem("list_user_passer", JSON.stringify(list_user_passer));
}

//######--btn_raffraichir--########################################################

function raffraichir() {
  list_user_passer = [];
  localStorage.setItem("list_user_passer", JSON.stringify(list_user_passer));
}

//#################################################################################

function recharge_list_user(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user_new.push(person);
  console.log(list_user_new);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");
  var btn_passer = document.createElement("button");
  var a = document.createElement("a");
  var span = document.createElement("span");

  a.href = "";

  tr_personne.className = "tr_demandant_base";
  btn_passer.className = "btn_passer_base";
  btn_passer.setAttribute("onclick", "passer(textContent)");
  span.className = "hide_id_on_btn";
  a.className = "link_all_btn";

  for (i; i < list_user_new.length; i++) {
    if (list_user_new[i] == list_user_new[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    }

    td_nom.textContent = list_user_new[i].nom;
    td_date.textContent = list_user_new[i].time;
    a.textContent = "Je passe mon tour ";
    span.textContent = id;

    a.appendChild(span);
    btn_passer.appendChild(a);
    td_btn_passer.appendChild(btn_passer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
  localStorage.setItem("list_user_new", JSON.stringify(list_user_new));
}

function recharge_list_user_passer(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user_passer_new.push(person);
  console.log(list_user_passer_new);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");

  var balise_barrer = document.createElement("del");

  tr_personne.className = "tr_demandant_base";

  for (i; i < list_user_suivant.length; i++) {
    td_nom.className = "td_nom_demandant_passer";
    td_date.className = "td_date_demandant_passer";
    td_btn_passer.className = "td_btn_passer_passer";

    balise_barrer.textContent = list_user_passer_new[i].nom;
    td_date.textContent = list_user_passer_new[i].time;

    td_nom.appendChild(balise_barrer);

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
  localStorage.setItem("list_user_passer", JSON.stringify(list_user_passer_new));
}

function recharge_list_user_traite(id, nom, time) {
  var id;
  var nom;
  var time;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time);

  function Person(id, nom, time) {
    this.id = id;
    this.nom = nom;
    this.time = time;
  }

  list_user_traite_new.push(person);
  console.log(list_user_traite_new);

  var tr_personne = document.createElement("tr");
  var td_nom = document.createElement("td");
  var td_date = document.createElement("td");
  var td_btn_passer = document.createElement("td");

  tr_personne.className = "tr_demandant_base";

  for (i; i < list_user_suivant.length; i++) {
    td_nom.className = "td_nom_demandant_traite";
    td_date.className = "td_date_demandant_traite";
    td_btn_passer.className = "td_btn_passer_traite";

    td_nom.textContent = list_user_traite_new[i].nom;
    td_date.textContent = list_user_traite_new[i].time;

    table_personnes.appendChild(tr_personne);
    table_personnes.appendChild(td_nom);
    table_personnes.appendChild(td_date);
    table_personnes.appendChild(td_btn_passer);
  }
  localStorage.setItem("list_user_traite", JSON.stringify(list_user_traite_new));
}

//#############################################################################

function verifications() {
  var nom = document.getElementById("input_name").value;
  if (nom == "" || nom == null) {
    alert("Veuillez renseigner un nom, s'il vous plait!");
  } else if (!nom.match(regex)) {
    alert("Seulement les lettres et chiffres ainsi que ' ' ' et ' - ' !");
  } else {
    nom = nom.toLowerCase();
    nom = nom.charAt(0).toUpperCase() + nom.slice(1);
    //    nom = ".............." + nom;
    //    nom = nom.slice(-15);
    add_person(nom);
  }
}
//"0" + (day - 1)).slice(-2
