
var url = "http://ec2-3-131-82-112.us-east-2.compute.amazonaws.com:8081/";
var urlDepartamente = url + "departments";
var urlCategorii = url + "categories?departmentID=";
var urlProduse = url + "products?categoryID=";
var urlComenzi = url + "orders";
var urlComenziUpdate = url + "orders/update";
var urlStergeComenzi = url + "orders/delete?orderID=";
var departments = [];
var categories = [];
var products = [];
var addedProducts = [];
var totalPrice = 0;
var order;
var detaliiClient;
var arrayProduse = [];

var idComanda;


function selectDepartment(event) {

  $.get(urlCategorii + event.id, function (data, status) {

    console.log("Data: " + data + "\nStatus: " + status);
    
    $('#categoriesList').empty();
    for (var categorie of data['categories'])
      $('#categoriesList').append('<li style="list-style-type: none; margin:10px;"><button id='
        + categorie.ID + ' class="btn btn-primary" style="width:100%;" onclick="selectCategory(this)">'
        + categorie.name + '</button></li>');
  });

}

function selectCategory(event) {
  console.log(event.id);
  $.get(urlProduse + event.id, function (data, status) {

    arrayProduse = data;
    for (var produs of data['products']) {
      prod = produs;
      console.log("AICI");
      console.log(produs);
      console.log(prod.ID);
      $('#produse').append('<div class="card text-center" style="min-width:250px; min-height:250px; margin:15px; background: #eee;">' +
        '<img class="card-img-top card-img-bottom img-fluid img-thumbnail text-center" style="padding:10px; width:18rem; height:18rem; margin: 0 auto; object-fit:contain;" src=' 
        + produs.imageURL +
        ' alt="Card image cap"><div class="card-body"><h5 class="card-title">' + produs.name + '</h5>' +
        '<p class="card-text">Pret: <span style="margin-left: 10px;">' + produs.price + '</span> LEI</p>' +
        ' </div> <button id="' + produs.ID + '" value = ' + produs.toString() + ' class="btn btn-primary" style="width:100%;" onclick="addProduct(this);" data-dismiss="alert" aria-label="Close"> ADD </button> </div></br></br>');

      console.log(prod.ID);
    }
    $('.lista1').css("display", "none");
    $('#lista2').css("display", "block");
    $('#butonBack').css("display", "block");
    $('#butonShoppingCart').css("display", "block");
  });

}

function deleteOrder(event) {
  
  console.log(event.id);
  $('#tr-comanda-' + event.id).remove();

  $.get(urlStergeComenzi + event.id, function (data, status) {

  });


}

function deleteProduct(event) {
  console.log(event.id);
  $('#' + event.id).remove();
  console.log(event.value);
  totalPrice -= event.value;
  $('#total').remove();
  $('#tbody').append(`<tr id="total" >
<td></td>
<td></td>
<td></td>
<td><strong>Total</strong></td>
<td class="text-right"><strong>`+ totalPrice.toString() + ` lei</strong></td>
</tr>`);
}

function addProduct(value) {
  console.log(value.id);
  produse = arrayProduse['products'];
  console.log(produse);
  var item;
  item = produse.find(item => item.ID == value.id);
  console.log(item);
  console.log(value);

  totalPrice += item.price;
  pretAfisat = totalPrice.toString()
  
  $('#total').remove();
  $('#tbody').append(`<tr id="tr-produs-` + item.ID + `">
  <td><img style="max-width: 200px; max-height: 150px;" src="`+ item.imageURL + `" /> </td>
  <td>`+ item.name + `</td>
  <td><input id="idCantitate-`+ item.ID + `" class="form-control" type="number" value="1" /></td>
  <td class="text-right">`+ item.price + `</td>
  <td class="text-right"><button  value="`+ item.price + `" id="tr-produs-` + item.ID + `"class="btn btn-sm btn-danger" onclick="deleteProduct(this);"><i class="fa fa-trash"></i> </button> </td>
</tr> <tr id="total" >
<td></td>
<td></td>
<td></td>
<td><strong>Total</strong></td>
<td class="text-right"><strong>`+ pretAfisat + ` lei</strong></td>
</tr>`);
  $('.alert').css("display", "block");
  setTimeout(() => {
    $('.alert').alert('close');
    $('body').append(` <div class="alert alert-success alert-dismissible fade show col-sm-12  col-md-6 float " style="display:none; position: fixed; margin-bottom: 40px; left: 30%;" role="alert">
  <strong>Succes!</strong> Produs adaugat.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`);
  }, 2000);
  item['quantity'] = parseInt($('#idCantitate-' + item.ID).val());
  console.log(item);
  
  addedProducts.push(item);
}

function alerta() {
  $('.alert').alert()
}

$(document).ready(function () {

  $.get(urlDepartamente, function (data, status) {
    
    console.log(data);
    for (var departament of data['departments']) {
      var idD = departament.ID;
      $('#listaDepartamente').append('<li style="list-style-type: none; margin:10px;"><button id='
        + idD + ' class="btn btn-primary" style="width:100%;" onclick="selectDepartment(this)">'
        + departament.name + '</button></li>');
    }
  });

  $('#butonBack').click(function () {
    $('#lista2').css("display", "none");
    $('#butonBack').css("display", "none");
    $('#butonShoppingCart').css("display", "none");
    $('.lista1').css("display", "block");
    $('#produse').empty();
  });

  $('#butonShoppingCart').click(function () {
    $('#shoppingCart').css("display", "block");
  });

  $('#buttonNext').click(function () {
    $('#order1').css("display", "none");
    $('#order2').css("display", "block");
  })

  $('#buttonNext2').click(function () {
    order = JSON.parse(sessionStorage.order);
    $('#order2').css("display", "none");
    $('#order3').css("display", "block");
  })

  $('#buttonNext3').click(function () {

    detaliiClient = {
      "paymentMethod": $('input[name="gridRadios"]:checked').val(), "voucherCode": $('#inputVoucher').val(), "address": $('#adresa').val(),
      "city": $('#localitate').val(), "lastName": $('#nume').val(), "firstName": $('#prenume').val(),
      "phoneNumber": $('#telefon').val(), "email": $('#email').val(), "products": order
    };


    console.log(detaliiClient);

    $.post(urlComenzi, JSON.stringify(detaliiClient), function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      idComanda = data.orderID;
      console.log(idComanda);
    }, "json");


    console.log(detaliiClient);
    $('#order3').css("display", "none");
    $('#confirmationScreen').css("display", "block");
    $('#numeConfirmare').val(detaliiClient.lastName);
    $('#prenumeConfirmare').val(detaliiClient.firstName);
    $('#localitateConfirmare').val(detaliiClient.city);
    $('#adresaConfirmare').val(detaliiClient.address);
    $('#emailConfirmare').val(detaliiClient.email);
    $('#telefonConfirmare').val(detaliiClient.phoneNumber);
    $('#' + detaliiClient.paymentMethod).prop('checked', true);
    $('#inputVoucherConfirmare').val(detaliiClient.voucherCode);
  })

  $('#buttonSubmit').click(function () {
    console.log(idComanda);

    detaliiClient['orderID'] = idComanda;

    $.post(urlComenziUpdate, JSON.stringify(detaliiClient), function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
      idComanda = data.orderID;
      console.log(idComanda);
    }, "json");

    $('#confirmationScreen').css("display", "none");
    $('#titluPagina').text("Comanda a fost finalizata cu succes!");
    $('#divDescriere').css("display", "none");
    $('#comandaFinalizata').css("display", "block");
    $('#buttonInapoi').css("display", "block");
  })

  $('#buttonInapoi').click(function () {
    window.open('file:///C:/Users/ioana/OneDrive/Master%20BDSA/BDSA_AN2/Comert%20Electronic/Proiect/Smartket/productsList.html');
  })

  $('#checkout').click(function () {
    console.log(addedProducts);
    for (var i = 0; i < addedProducts.length; i++) {
      console.log(addedProducts[i].ID);
      console.log($('#idCantitate-' + addedProducts[i].ID).val());
      addedProducts[i].quantity = parseInt($('#idCantitate-' + addedProducts[i].ID).val());
    }
    console.log(addedProducts);
    sessionStorage.order = JSON.stringify(addedProducts);
    window.open('file:///C:/Users/ioana/OneDrive/Master%20BDSA/BDSA_AN2/Comert%20Electronic/Proiect/Smartket/Order1.html');
  })

  $('#butonHistory').click(function () {



    $('#tableOrdersHistory').css("display", "block");

    $.get(urlComenzi, function (data, status) {
      
      console.log(data);

      $('#tbodyHistory').empty();
      for (var i = 0; i < data['orders'].length; i++) {
        comanda = data['orders'][i];
        console.log(comanda);
        var produse = '';
        if (comanda['products'] != null)
          for (var j = 0; j < comanda['products'].length; j++) {
            
            produse += comanda['products'][j].productDetails['name'] + '; ';
          }

        $('#tbodyHistory').append(`<tr id="tr-comanda-` + comanda.ID + `">
        <td>`+ comanda.ID + `</td>
        <td>`+ comanda.timestamp + `</td>
        <td>`+ produse + `</td>
        <td>`+ comanda.value + `</td>
        <td>`+ comanda.status + `</td>
        <td class="text-right"><button id="`+ comanda.ID + `" class="btn btn-sm btn-danger" onclick="deleteOrder(this);"><i class="fa fa-trash"></i> </button> </td>`);
      }

    });


  });


});
