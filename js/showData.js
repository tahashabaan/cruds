
function showData() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  dataPro.forEach((val) => {
    tbody.innerHTML +=
      `
       <td>  ${val.id}       </td>
       <td>  ${val.title}    </td>
       <td>  ${val.price}    </td>
       <td>  ${val.taxas}    </td>
       <td>  ${val.ads}      </td>
       <td>  ${val.discount} </td>
       <td>  ${val.catagory} </td>
       <td>
       <button class="btn" onclick="getData(${val.id})">updata</button>
       </td>
       <td>
       <button class="btn" onclick="deleteItem(${val.id})">delete</button>
       </td>`;
  });
  
  deleAll();
}
