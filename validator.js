
var submitBtn = document.querySelector('.btn-submit');
var nameElement = document.querySelector('#name');
var priceElement = document.querySelector('#price');
var detailElement = document.querySelector('#detail');
var colorElement = document.querySelector('#color');
var form = document.querySelector('form');
var editId = ' ';

class Product {
    constructor(id, name, price, detail, color) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.detail = detail;
        this.color = color;
    }
}

class App {
    renderProduct(products) {
        let productTableTbody = document.querySelector('#tbody');
        let htmls = '';
        products.forEach((product) => {
            htmls += `<tr id="row${product.id}">
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.detail}</td>
            <td>${product.color}</td>
            
            <td>
              <button class="btn btn-edit" data-id="${product.id}">Edit</button>
              <button class="btn btn-delete" data-id="${product.id}" >Delete</button>
            </td>
          </tr>`;
        });
        productTableTbody.innerHTML = htmls;
        initsEditHandle();
        initsDeleteHandle();
    }
}
function getValueInput() {
    let nameValue = nameElement.value;
    let priceValue = priceElement.value;
    let detailValue = detailElement.value;
    let colorValue = colorElement.value;
}
class ValidateInput {
    constructor(formData) {
      this.formData = formData;
      this.errors = [];
    }
  
    require(mess = 'khong duoc de trong') {
      for (const [key, value] of this.formData.entries()) {
        console.log(key, value);
        if (!Boolean(value)) {
          // true
          let errorMess = `${key} ${mess}`;
          this.errors.push([key, errorMess]);
        }
      }
      return this.errors;
    }
  }

var app = new App();
var products = [];
let productCreate = new Product(2, 'Banana', '2$', 'Glucozo', 'Yellow');
products.push(productCreate);
app.renderProduct(products);
submitBtn.onclick = function (e) {
    if (editId) {
        let productEditIndex = products.findIndex((item) => item.id == editId);
        let productEdit = products[productEditIndex];
        productEdit.name = nameElement.value;
        productEdit.price = priceElement.value;
        productEdit.detail = detailElement.value;
        productEdit.color = colorElement.value;
        app.renderProduct(products);
        resetForm();
    } else {
        // function checkEmptyError(listInput) {
        // //   let isEmptyError = false;
        // //   listInput.forEach((input) => {
        // //     input.value = input.value.trim();
        // //     if (!input.value) {
        // //       isEmptyError = true;
        // //       showError(input, 'Không được để trống');
        // //     } else {
        // let formData = new FormData(document.querySelector('#form-data'));
        // let errors = new ValidateInput(formData).require('đâu!!!!!');
        // resetError();
        // if (errors.length > 0) {
        //     for (let [key, mess] of errors) {
        //         document.querySelector(`.${key}-error`).innerHTML = mess;
        //     }
        //     return;
        // }
        // var parents = document.querySelectorAll('.form-control');
        // showSuccess();
        var id = parseInt(Math.random() * 100);
        let formData = new FormData(document.querySelector('#form-data'));
        let errors = new ValidateInput(formData).require('please input this');
        resetError();
        if (errors.length > 0) {
          for (let [key, mess] of errors) {
            document.querySelector(`.${key}-error`).innerHTML  = mess;
          }
          return;
        }
        var productCreate = new Product(
            id,
            nameElement.value,
            priceElement.value,
            detailElement.value,
            colorElement.value
        );
        products.push(productCreate);
        app.renderProduct(products);
        resetForm();
        //       }
        //     });
        //     return isEmptyError;
        //   }
        e.preventDefault();
        //   checkEmptyError([nameElement, priceElement, detailElement, colorElement]);
    }
};
function resetForm() {
    nameElement.value = '';
    detailElement.value = '';
    priceElement.value = '';
    colorElement.value = '';
}

function initsEditHandle() {
    var btnEdits = document.querySelectorAll('.btn-edit');
    btnEdits.forEach(function (btnEdit) {
        btnEdit.onclick = function () {
            editId = this.getAttribute('data-id');
            console.log(editId);
            let productEditIndex = products.findIndex((item) => item.id == editId);
            let productEdit = products[productEditIndex];
            nameElement.value = productEdit.name;
            priceElement.value = productEdit.price;
            detailElement.value = productEdit.detail;
            colorElement.value = productEdit.color;
            // console.log(productEditIndex)
        };
    });
}
function resetError() {
    document.querySelectorAll('.error').forEach((item) => (item.innerHTML = ''));
}
function initsDeleteHandle() {
    var btnDeletes = document.querySelectorAll('.btn-delete');
    btnDeletes.forEach(function (btnDelete) {
        btnDelete.onclick = function () {
            let isDelete = confirm('xac nhan xoa');
            if (isDelete) {
                let deleteId = btnDelete.getAttribute('data-id'); // lay id
                let productIndex = products.findIndex((item) => item.id == deleteId); //lấy ra sản phẩm có id trùng
                console.log(products);
                products.splice(productIndex, 1);
                console.log(products);
                // document.querySelector(`#row${id}`).remove();
                app.renderProduct(products);
            }
            resetForm();
        };
    });
    
}
// function resetError() {
//     document.querySelectorAll('.error').forEach((item) => (item.innerHTML = ''));
// }
// function showError(input, message) {
//   let parent = input.parentElement;
//   let small = parent.querySelector('small');
//   parent.classList.add('error');
//   small.innerText = message;
// }
// function checkEmptyError(listInput) {
//   let isEmptyError = false;
//   listInput.forEach((input) => {
//     input.value = input.value.trim();
//     if (!input.value) {
//       isEmptyError = true;
//       showError(input, 'Không được để trống');
//     } else {
//       showSuccess();
//     }
//   });
//   return isEmptyError;
// }
// function showSuccess(input,) {
//   let parent = input.parentElement;
//   let small = parent.querySelector('small');
//   parent.classList.remove('error');
//   small.innerText = '';
// }
