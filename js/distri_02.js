//localStorage.clear();

var list_user = [];
var list_user_new = [];

var regex = /^([-'a-zA-Z0-9àâçéèêëîïôûùüÿñæœ_ ]*)$/;
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
//liste des personnes attentant d'étre aide (en blanc)
function recup_list_LS(list, recup_list_user_fct) {
  var list_user = localStorage.getItem(list);
  if (list_user != "" && list_user != null) {
    list_user = JSON.parse(list_user);
    for (var i = 0; i < list_user.length; i++) {
      var id = list_user[i].id;
      var nom = list_user[i].nom;
      var time = list_user[i].time;
      var status = list_user[i].status;
      recup_list_user_fct(id, nom, time, status);
    }
  }
  return list_user;
}

var list_user_LS = recup_list_LS("list_user", recup_list_user_LS);

//###---fuctions pour reconstruire le tableau à partir des listes récuprérées dans le LocalStorage---###
//liste des personnes attentant d'étre aide (en blanc)
function recup_list_user_LS(id, nom, time, status) {
  var id;
  var nom;
  var time;
  var status;
  var i = 0;
  var table_personnes = document.getElementById("table_personnes");
  var person = new Person(id, nom, time, status);

  function Person(id, nom, time, status) {
    this.id = id;
    this.nom = nom;
    this.time = time;
    this.status = status;
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
    if (list_user[i] == list_user[0] && list_user[i].status == "attendant") {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else if (list_user[i].status == "attendant") {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    } else if (list_user[i].status == "passer") {
      td_nom.className = "td_nom_demandant_passer";
      td_date.className = "td_date_demandant_passer";
      td_btn_passer.className = "td_btn_passer_passer";
      btn_passer.className = "btn_passer_hiding";
    } else if (list_user[i].status == "traite") {
      td_nom.className = "td_nom_demandant_traite";
      td_date.className = "td_date_demandant_traite";
      td_btn_passer.className = "td_btn_passer_traite";
      btn_passer.className = "btn_passer_hiding";
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
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  var date_hour =
    ("0" + day).slice(-2) +
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
  var status = "attendant";

  var person = new Person(id, nom, time, status);

  function Person(id, nom, time, status) {
    this.id = id;
    this.nom = nom;
    this.time = time;
    this.status = status;
  }

  if (list_user == null || list_user == "") {
    console.log(list_user);
    list_user.push(person);
    console.log(list_user);
  } else if (list_user != null || list_user != "") {
    console.log("liste n'est pas vide");
    for (var b = 0; b < list_user.length; b++) {
      console.log("vérifier status");
      console.log(b);
      console.log(list_user.length);
      if (list_user[b].status == "passer" || list_user[b].status == "traite") {
        console.log("autre trouvé");
        var indice_insert = b;
        list_user.splice(indice_insert, 0, person);
        break;
      } else if (list_user[list_user.length - 1].status == "attendant") {
        console.log("dernier est attendant");
        list_user.push(person);
        break;
      }
    }
  }

  //list_user.push(person);
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

  for (i; i < list_user_new.length; i++) {
    if (list_user_new[i] == list_user_new[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else if (list_user[i].status == "attendant") {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    } else if (list_user[i].status == "passer") {
      td_nom.className = "td_nom_demandant_passer";
      td_date.className = "td_date_demandant_passer";
      td_btn_passer.className = "td_btn_passer_passer";
      btn_passer.className = "btn_passer_hiding";
    } else if (list_user[i].status == "traite") {
      td_nom.className = "td_nom_demandant_traite";
      td_date.className = "td_date_demandant_traite";
      td_btn_passer.className = "td_btn_passer_traite";
      btn_passer.className = "btn_passer_hiding";
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
  if (list_user[iterance] == list_user[0] && list_user[iterance].status == "attendant") {
    var user_traite = list_user.shift();
    var date_old = user_traite.time;
    var date_new= date_time();
    console.log('dateold', date_old);
    console.log('datenew', date_new);

    user_traite.status = "traite";
     user_traite.time= "👋" + " " +date_old + " "+ "💨" + " " + date_new;
    list_user.push(user_traite);
  }

  localStorage.clear();
  localStorage.setItem("list_user", JSON.stringify(list_user));
}

//######--btn_passer--############################################################################

function passer(textContent) {
  console.log("ici");
  var indice_insert;
  var id_btn_passer = textContent.slice(-4);
  id_btn_passer = parseInt(id_btn_passer);

  for (var b = 0; b < list_user.length; b++) {
    if (id_btn_passer == list_user[b].id) {
      list_user[b].status = "passer";

      var user_passer = list_user.splice(b, 1);

      localStorage.clear();
      for (var i = 0; i < list_user.length; i++) {
        if (list_user[list_user.length - 1].status == "attendant") {
          list_user.push(user_passer[0]);
          break;
        } else if (list_user[list_user.length - 1].status == "passer") {
          list_user.push(user_passer[0]);
          break;
        } else if (list_user[i].status == "traite") {
          indice_insert = i;
          console.log(list_user);
          list_user.splice(indice_insert, 0, user_passer[0]);
          break;
        }
      }
    }
  }

  localStorage.clear();
  localStorage.setItem("list_user", JSON.stringify(list_user));
}
//######--btn_raffraichir--########################################################

function raffraichir() {
  console.log(list_user);
  for (var i = 0; i < list_user.length; i++) {
    console.log(list_user[i]);
    if (list_user[i].status == "attendant") {
      console.log("ici");
      list_user_new.push(list_user[i]);
    } else if (list_user[i].status == "traite") {
      list_user_new.push(list_user[i]);
    }
  }
  list_user = [];
  localStorage.clear();
  localStorage.setItem("list_user", JSON.stringify(list_user_new));
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
    //    nom = nom.split("").reverse().join("");
    console.log(nom);
    add_person(nom);
  }
}
