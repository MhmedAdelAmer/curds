let title= document.getElementById("title");
let price= document.getElementById("price");
let taxes= document.getElementById("taxes");
let ads= document.getElementById("ads");
let discount= document.getElementById("discount");
let total= document.getElementById("total");
let count= document.getElementById("count");
let category= document.getElementById("category");
let submit= document.getElementById("submit");
let Search= document.getElementById("search");

let upp;
let mood ='create'  

let datapro = [];


// gettotal
function gettotal(){
    if(price.value !=''){   
        let result =(+ price.value + +taxes.value + +ads.value)-+discount.value
            total.innerHTML=result
            total.style.background='#050'
    }
    else{
        total.innerHTML='';
        total.style.background='#a00'
    }
} 

if (localStorage.product != null) {
            data = JSON.parse(localStorage.product);
        if (Array.isArray(data)) {
            datapro = data;
        } else {
            datapro = [];
        }}
                //submit create
submit.onclick =function(){
    let newpro ={
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
            if(title.value!='' 
                && price.value!=''
                && category.value!=''
                && newpro.count<101
                                ){
        if(mood==='create'){
            if(newpro.count>0){
                for(let i=0; i<newpro.count; i++){
                        datapro .push(newpro);
                }
            }

        }  else{
            datapro[upp]=newpro
            mood='create'
            submit.innerHTML='create'
            count.style.display='block'

        }
                clearInputs();
            }

    localStorage.setItem('product',  JSON.stringify(datapro)  );

    readData();
}



// clear inputs
function clearInputs(){
            title.value='';
            price.value='';
            taxes.value='',
            ads.value='';
            discount.value='';
            total.innerHTML='';
            count.value='';
            category.value='';
}


// read
    function readData(){
        gettotal()
        let table='';
        for( let i=0 ; i <datapro.length ; i++){
            table += 
            `<tr>
                <td>${i+1}</td>  
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td> 
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                <td><button onclick="deleteData( ${i} )"  id="Delete">Delete</button></td>
            </tr>`
                    
        }
        document.getElementById('tbody').innerHTML =table;
            let btnDelete = document.getElementById('deleteAll')
            if(datapro.length>0){

                btnDelete.innerHTML=`
                <button onclick = "deleteAll()"> Delete All (${datapro.length})</button>
                `
            }else{
                btnDelete.innerHTML='';
            }
    
    }
    readData()


// delete
// لازم function ياخد مني parmter لاني عايز اعرف هحذف انهي عنصر

function deleteData(i){
    datapro.splice(i,1)
    localStorage.product=JSON.stringify(datapro)
        readData() 
}

// delete all
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    readData();
}

// updateData
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    gettotal()
    count.style.display='none';
    category.value=datapro[i].category;
    submit.innerHTML='Update';
    // submit.setAttribute('onclick','updateProduct(${i})');
        mood='update';
        upp=i;
        scroll({
            top:0 ,
            behavior:'smooth'
        })
}

// search
let SearchMood='title'
function getSearchMood(id){
            if (id==='searchTitle') {

                SearchMood='title'
            }else{
                SearchMood='category'
            }
                Search.placeholder='Search By '+ SearchMood;
            Search.focus();
            Search.value='';
            readData();
}
// searchdata title or category

function searchData(value){

    let table='';
    for (let i =0 ;i<datapro.length ;i++) {
    if(SearchMood =='title'){
            if(datapro[i].title.includes(value.toLowerCase())){
                table += 
            `<tr>
                <td>${i+1}</td>  
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td> 
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                <td><button onclick="deleteData( ${i} )"  id="Delete">Delete</button></td>
            </tr>`
            }

        }

    else{
        {
            if(datapro[i].category.includes(value.toLowerCase())){
                table += 
            `<tr>
                <td>${i+1}</td>  
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td> 
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="Update">Update</button></td>
                <td><button onclick="deleteData( ${i} )"  id="Delete">Delete</button></td>
            </tr>`
            }
    }

} 
                document.getElementById('tbody').innerHTML =table; 
}}
