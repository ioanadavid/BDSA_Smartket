
var url = "http://3.130.190.236/";
var urlFinal = url + "departamenteWeb/2"
var urlCategorie = url + "categoriiWeb/"
var urlProdus = url + 'produseWeb/';
var departments = [];
var categories = [];
var products = [];


function selectDepartment(event) {
  
  // $.get(urlCategorie + event.id, function (data, status) {
   
  //   console.log("Data: " + data + "\nStatus: " + status);
  //   data = '{ "categorii" : ["caine"]}';
  //   categorii = (JSON.parse(data))['categorii'];
  //   $('#departmentsList').empty();
  //   for (var categorie of categorii)
  //     $('#departmentsList').append('<li style="list-style-type: none; margin:10px;"><button id=' 
  //       + categorie.ID_CATEGORIE + ' class="btn btn-primary" style="width:100%;" onclick="selectCategory(this)">'
  //       + categorie.DENUMIRE + '</button></li>');
  // });
  data = '{"categorii" : [{"ID_CATEGORIE":1, "DENUMIRE":"caine pug"}, {"ID_CATEGORIE":2, "DENUMIRE":"caine pug 2"}]}';
    
    console.log("Data: " + data + "\nStatus: " + status);
    //data = '{"categorii" : [{"ID_CATEGORIE":1, "DENUMIRE":"caine pug"}, {"ID_CATEGORIE":2, "DENUMIRE":"caine pug 2"}]}';
    categorii = (JSON.parse(data))['categorii'];
    console.log(categorii);
    $('#categoriesList').empty();
    for (var categorie of categorii)
      $('#categoriesList').append('<li style="list-style-type: none; margin:10px;"><button id=' 
        + categorie.ID_CATEGORIE + ' class="btn btn-primary" style="width:100%;" onclick="selectCategory(this)">'
        + categorie.DENUMIRE + '</button></li>');

}

function selectCategory(event) {
  
  // $.get(urlProdus + event.id, function (data, status) {
  //   data = {
  //     "produse": [
  //       {"IMAGINE":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mops_oct09_cropped2.jpg/220px-Mops_oct09_cropped2.jpg" ,
  //       "DENUMIRE": "Pug 1",
  //       "PRET": 16.3},
  //       {"IMAGINE": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mops_oct09_cropped2.jpg/220px-Mops_oct09_cropped2.jpg" ,
  //       "DENUMIRE": "Pug 2",
  //       "PRET": 16.3}
  //     ]
  //   }
  //   produse = (JSON.parse(data))['produse'];
  //   for (var produs of produse)
  //     $('#produse').append('<div class="card" style="min-width:250px; min-height:250px; margin:15px; background: #eee;">' +
  //       '<img class="card-img-top card-img-bottom img-fluid img-thumbnail" style="padding:10px; width:100%; height:100%; object-fit:contain;" src=' 
  //       + produs.IMAGINE +
  //       ' alt="Card image cap"><div class="card-body"><h5 class="card-title">' + produs.DENUMIRE + '</h5>' +
  //       '<p class="card-text">Pret: <span style="margin-left: 10px;">' + produs.PRET + '</span> LEI</p>' +
  //       ' </div> </div></br></br>');
  //   $('.lista1').css("display", "none");
  //   $('#lista2').css("display", "block");
  //   $('#butonBack').css("display", "block");
  // });

  data = `{
    "produse": [
      {"ID":1,"IMAGINE":"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mops_oct09_cropped2.jpg/220px-Mops_oct09_cropped2.jpg" ,
      "DENUMIRE": "Pug 1",
      "PRET": 16.3},
      {"ID":2,"IMAGINE": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Mops_oct09_cropped2.jpg/220px-Mops_oct09_cropped2.jpg" ,
      "DENUMIRE": "Pug 2",
      "PRET": 16.3}
    ]
  }`;
  produse = (JSON.parse(data))['produse'];
  for (var produs of produse)
    $('#produse').append('<div class="card" style="min-width:250px; min-height:250px; margin:15px; background: #eee;">' +
      '<img class="card-img-top card-img-bottom img-fluid img-thumbnail" style="padding:10px; width:100%; height:100%; object-fit:contain;" src=' 
      + produs.IMAGINE +
      ' alt="Card image cap"><div class="card-body"><h5 class="card-title">' + produs.DENUMIRE + '</h5>' +
      '<p class="card-text">Pret: <span style="margin-left: 10px;">' + produs.PRET + '</span> LEI</p>' +
      ' </div> <button id='+ produs.ID + ' class="btn btn-primary" style="width:100%;" onclick="selectProduct(this)"> ADD </button> </div></br></br>');
  $('.lista1').css("display", "none");
  $('#lista2').css("display", "block");
  $('#butonBack').css("display", "block");
  $('#butonShoppingCart').css("display", "block");
}

function selectProduct(event) {
  console.log(event.id);
}

$(document).ready(function () {

  // $.get(urlFinal, function (data, status) {
  //   data = data = { "departamente" : ["caine"]}
  //   departamente = (JSON.parse(data))['departamente'];
  //   for (var departament of departamente) {
  //     var idD = departament.ID_DEPARTAMENT;
  //     $('#listaDepartamente').append('<li style="list-style-type: none; margin:10px;"><button id=' 
  //       + idD + ' class="btn btn-primary" style="width:100%;" onclick="selectDepartment(this)">'
  //       + departament.DENUMIRE + '</button></li>');
  //   }
  // });

    data = '{ "departamente" : [{"ID_DEPARTAMENT": 1, "DENUMIRE":"caine"}, {"ID_DEPARTAMENT": 2, "DENUMIRE":"caine2"}]}';
    departamente = (JSON.parse(data))['departamente'];


    for (var departament of departamente) {
      var idD = departament.ID_DEPARTAMENT;
      $('#listaDepartamente').append('<li style="list-style-type: none; margin:10px;"><button id=' 
        + idD + ' class="btn btn-primary" style="width:100%;" onclick="selectDepartment(this)">'
        + departament.DENUMIRE + '</button></li>');
    }

  $('#butonBack').click(function () {
    $('#lista2').css("display", "none");
    $('#butonBack').css("display", "none");
    $('#butonShoppingCart').css("display", "none");
    $('.lista1').css("display", "block");
    $('#produse').empty();
  });

  $('#butonShoppingCart').click(function () {
    $('#shoppingCart').css("display", "block");
    $('#produse').empty();
  });

});