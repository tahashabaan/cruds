// def variable keyup keypress keydown
let title=document.getElementById("title");
let price=document.getElementById("price");
let taxas=document.getElementById("taxos");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let showPrice=document.getElementById("show-price");
let count=document.getElementById("count");
let catagory=document.getElementById("catagory");
let btnCreat=document.getElementById("btn");
let search=document.getElementById("search");
let searchCat=document.getElementById("search-cat");
let searchTitle=document.getElementById("search-title");
  //data store
  let dataPro;
    if(localStorage.product!=null){
      dataPro=JSON.parse(localStorage.product);
    }
    else
    {
      dataPro=[];
    }

    let mode='creat';
    let modeSearch='title';
    let tempIn;
// if(lt!ocalStorage.produc=null){
//   dataPro=JSON.parse(localStorage.product);
// }
// else
//    dataPro=[];
// function get total
function getTotal(){
  if(price.value!="")
  {
    let result= +price.value + +taxos.value + +ads.value - discount.value;
    showPrice.style.background="green";
    showPrice.innerHTML=result;
  }
    else{
        showPrice.style.background="red";
        showPrice.innerHTML="";
    }
}
// function addPro
btnCreat.addEventListener("click",addPro);
function addPro(){
    let len=dataPro.length;
    let newId=dataPro.length?dataPro[len-1].id : 0;
    let newPro={
    id:++newId,
    title:title.value.toLowerCase(),
    price:price.value,
    taxas:taxas.value,
    ads:ads.value,
    discount:discount.value,
    catagory:catagory.value.toLowerCase(),
    total:showPrice.innerHTML
  };
  if(mode=='creat')
  {
    if( title.value!="" &&
        price.value!="" && 
        catagory.value!=""&&
        count.value>1)
  {
      for(let i=0; i<count.value;i++)
      {
        dataPro.push(newPro);
        localStorage.setItem('product',JSON.stringify(dataPro));
      } 
      clearIn();
  }
  else if(title.value!=="" && 
          price.value!=="" && 
          catagory.value!=="")
  {
     dataPro.push(newPro);
     localStorage.setItem('product',JSON.stringify(dataPro));
     clearIn();
  }
  // localStorage("key","array");
      else{
        alert("please enter title and price");
      }
  }
    else 
    {
      if(title.value!=="" && 
         price.value!=="" &&
         catagory.value!=="")
      {
         dataPro[tempIn]=newPro;
         localStorage.product=JSON.stringify(dataPro);
         btnCreat.innerHTML="creat";
         count.style.display="block";
         mode='creat';
      }
      else{
        alert("please enter title and price");
      }
    }
       showData(dataPro);
       deleAll();
}
//function showData
function showData(data){
  let tbody=document.getElementById("tbody");
  tbody.innerHTML=" ";
  data.forEach(val => {
    tbody.innerHTML+=`<tr>
    <td>    ${val.id}         </td>
    <td>    ${val.title}      </td>
    <td>    ${val.catagory}   </td>
    <td>    ${val.price}      </td>
    <td>    ${val.taxas}      </td>
    <td>    ${val.ads}        </td>
    <td>    ${val.discount}        </td>
    <td>    ${val.total}       </td>
    <td>
   <button class="btn" onclick="updataData(${val.id})">updata </button>
    </td>
    <td>
    <button class="btn" onclick="deleteItem(${val.id})">delete</button>
    </td> 
</tr>`
  });
}
showData(dataPro);
// function clear
function clearIn(){
  title.value="";
  price.value="";
  taxas.value="";
  ads.value="";
  discount.value="";
  catagory.value="";
  count.value="";
  getTotal();
}
function updataData(i){
  indItem=dataPro.map((val)=>
  {
     return val.id;  }).indexOf(i);

     title.value=dataPro[indItem].title;
     price.value=dataPro[indItem].price;
     taxas.value=dataPro[indItem].taxas;
     ads.value=dataPro[indItem].ads;
     discount.value=dataPro[indItem].discount;
     catagory.value=dataPro[indItem].catagory;
     btnCreat.innerHTML="updata";
     count.style.display='none';
     mode='updata';
     tempIn=indItem;
     getTotal();
     scroll({
       top:0,
       behavior:"smooth"
    });
    }

function deleteItem(id)
{
  let tempData=dataPro;
  let indexIt= dataPro.map((val)=>
  {
  return val.id;
                }).indexOf(id);
                console.log(indexIt);
  if(indexIt!=-1)
  {
    dataPro.splice(indexIt,1);
    localStorage.product=JSON.stringify(dataPro)
    showData(dataPro);
  } 
}
  function deleAll()
  {
        let len=dataPro.length;
        let btnDel=document.getElementById("btn-del");
        if(localStorage.product!=null)
        {
           btnDel.innerHTML=`<button class="btn">
           delete all  (${len})
           </button>`;
           btnDel.addEventListener("click",()=>{
           dataPro.splice(0,len);
           localStorage.removeItem("product");
           showData(dataPro);
             });
        }
        else
        {
          btnDel.innerHTML="";
        }
   }    
   deleAll();
   function getSearchMode(id)
   {
     if(id==="search-title")
     {
      modeSearch='title';
      search.placeholder="search by title";
     }
     else
     {
      search.placeholder="search by catagory";
      modeSearch='catagory';
     }
     search.focus();
   }
  function searchData(valSear)
  {
    let tabel='';
    if(modeSearch==='title')
    {
     dataPro.forEach((val)=>{
           if(val.title.includes(valSear.toLowerCase()))
           {
             
             tabel+=`<tr>
             <td>    ${val.id}      </td>
             <td>    ${val.title}   </td>
             <td>    ${val.catagory}</td>
             <td>    ${val.price}   </td>
             <td>    ${val.taxas}   </td>
             <td>    ${val.ads}     </td>
             <td>    ${val.discount}</td>
             <td>    ${val.total}</td>
             <td>
            <button class="btn" onclick="updataData(${val.id})">updata </button>
             </td>
             <td>
             <button class="btn" onclick="deleteItem(${val.id})">delete</button>
             </td> 
         </tr>`
           }
      });
        }
        else
        {
          dataPro.forEach((val)=>{
            if(val.catagory.includes(valSear))
            {
              tabel+=`<tr>
             <td>    ${val.id}      </td>
             <td>    ${val.title}   </td>
             <td>    ${val.price}   </td>
             <td>    ${val.taxas}   </td>
             <td>    ${val.ads}     </td>
             <td>    ${val.discount}</td>
             <td>    ${val.catagory}</td>
             <td>
            <button class="btn" onclick="updataData(${val.id})">updata </button>
             </td>
             <td>
             <button class="btn" onclick="deleteItem(${val.id})">delete</button>
             </td> 
         </tr>`
            }
          });
        }
        tbody.innerHTML=tabel;
      }   