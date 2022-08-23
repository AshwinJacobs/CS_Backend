let users = [];
const uContainer = document.querySelector("#users");
fetch("http://localhost:6969/users")
  .then((res) => res.json())
  .then((data) => {
    users = data;
    console.log(data);
    showusers(users);
  });
function showusers(users) {
  uContainer.innerHTML = "";
  users.forEach((user) => {
    uContainer.innerHTML += `
    <table>
    
<tbody>
 <tr>   
<td>${user.email}</td>
<td>${user.password}</td>
<td>${user.full_name}</td>
<td>${user.billing_address}</td>
<td>${user.default_shipping_address}</td>
<td>${user.country}</td>
<td>${user.phone}</td>
<td>${user.user_type}</td>

</tr>
</tbody>
</table>
        `;
  });
}

let products = [];
const pContainer = document.querySelector("#products");
fetch("http://localhost:6969/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log(data);
    showproducts(products);
  });
function showproducts(products) {
  pContainer.innerHTML = "";
  products.forEach((product) => {
    pContainer.innerHTML += `
  <table>
    
<tbody>
 <tr> 
<td>${product.sku}</td>
<td>${product.name}</td>
<td>${product.price}</td>
<td>${product.weight}</td>
<td>${product.descriptions}</td>
<td>${product.thumbnail}</td>
<td>${product.image}</td>
<td>${product.category}</td>
<td>${product.create_date}</td> 
<td>${product.stock}</td>
  `;
  });
}
