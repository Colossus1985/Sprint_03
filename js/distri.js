var list_user = [];

function add_name() {
  var time = date_time();
  var table_personnes = document.getElementById("table_personnes");
  var nom = document.getElementById("input_name").value.toString();
  var person = new Person(nom, time);

  var i = 0;
  var first = 0;

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

  const list_user_sorted = list_user.sort((a, b) => b.date - a.date);
  console.log(list_user_sorted);

  for (i; i < list_user_sorted.length; i++) {
    if (list_user_sorted[i] == list_user_sorted[0]) {
      td_nom.className = "td_nom_demandant_first";
      td_date.className = "td_date_demandant_first";
      td_btn_passer.className = "td_btn_passer_first";
    } else {
      td_nom.className = "td_nom_demandant_base";
      td_date.className = "td_date_demandant_base";
      td_btn_passer.className = "td_btn_passer_base";
    }

    td_nom.textContent = list_user_sorted[i].nom;
    td_date.textContent = time;
    btn_passer.textContent = "Je passe mon tour";

    td_btn_passer.appendChild(btn_passer);

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
