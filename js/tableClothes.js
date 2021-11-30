const get = 'http://152.70.213.228:8080/api/clothe/all'
const post = 'http://152.70.213.228:8080/api/clothe/new'
const put = 'http://152.70.213.228:8080/api/clothe/update'
const del =  'http://152.70.213.228:8080/api/clothe/'

//Obtnemos los datos desdel el modal
const modalClothe= new bootstrap.Modal(document.getElementById('modalClothe'));
const formArticulo = document.querySelector('#formClothe')
const referenceModal=document.getElementById('referenceClothe')
const categoryModal=document.getElementById('categoryClothe')
const sizeModal=document.getElementById('sizeClothe')
const descriptionModal=document.getElementById('descriptionClothe')
const priceModal=document.getElementById('priceClothe')
const quantityModal=document.getElementById('quantityClothe')
const photographyModal=document.getElementById('photographyClothe')
let opcion=''

btnCreate.addEventListener('click',()=>{
    
    referenceClothe.value=''
    categoryClothe.value=''
    sizeClothe.value=''
    descriptionClothe.value=''
    priceClothe.value=''
    quantityClothe.value=''
    photographyClothe.value=''
    modalClothe.show()    
    opcion='create'    
})  

//Pintamos los datos en el DOM 
$(document).ready(function () {
    fetch(get).then(function (response) {
        return response.json();
    }).then(function (data) {
        let body = '';
        data.forEach(element => {
            var availability = '';
            if (element.availability == true) {
                availability = 'Disponible';
            }else{
                availability = 'No disponible';
            }

            body += `<tr>
                    <td>${element.reference}</td>
                    <td>${element.category}</td>
                    <td>${element.size}</td>
                    <td>${element.description}</td>
                    <td>${availability}</td>                                    
                    <td>${element.price}</td>
                    <td>${element.quantity}</td>
                    <td>${element.photography}</td>
                    <td class="text-center"><a class="btnEditar btn btn-outline-success btn-sm">Editar</a> 
                                            <a class="btnBorrar btn btn-outline-danger btn-sm">Borrar</a></td>
                    </tr>`;
        });
        
        $('#dataClothes').append(body);        
    }).catch(function (error) {
        alertify.error('Error al cargar los datos');
    })
})
///////////////////////////////////////////

const on=(element,event,selector,handler)=>{
    element.addEventListener(event,e=>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
//Editar registro

on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode
    modalClothe.show()    
    referenceClothe.value=fila.children[0].innerText
    categoryClothe.value=fila.children[1].innerText
    sizeClothe.value=fila.children[2].innerText
    descriptionClothe.value=fila.children[3].innerText
    priceClothe.value=fila.children[5].innerText
    quantityClothe.value=fila.children[6].innerText
    photographyClothe.value=fila.children[7].innerText

    opcion='update'
})

//Borrar registro
on(document,'click','.btnBorrar',e=>{ 
    const fila=e.target.parentNode.parentNode
    const id=fila.firstElementChild.innerHTML
    alertify.confirm('Eliminar','¿Desea eliminar el registro?',
    function(){
        fetch(del+id,{method:'DELETE'})
            .then(function(response){
                console.log(response)
                if(response.ok){
                    alertify.alert('AltoTurmequeApp','Producto eliminado correctamente!!!', function(){ location.reload() });                   
                    
                }else{
                    alertify.error('Error al eliminar')
                }                  
                
            })
            .catch(error=>{
                alertify.error('Error: '+error)
            })   
    },
    function(){
        alertify.error('Registro no eliminado')
    });
})

formArticulo.addEventListener('submit',e=>{
    e.preventDefault()
    if(opcion=='create'){
         console.log(opcion)  
        fetch(post,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                reference:referenceClothe.value,
                category:categoryClothe.value,
                size:sizeClothe.value,
                description:descriptionClothe.value,
                price:priceClothe.value,
                quantity:quantityClothe.value,
                photography:photographyClothe.value
            })
        }).then(function(response){
            if(response.ok){
                modalClothe.hide()
                alertify.alert('AltoTurmequeApp','Producto creado correctamente', function(){ location.reload() });                    
                
            }else{
                alertify.error('Error al crear')
            }
        }).catch(error=>{
            alertify.error('Error: '+error)
        })        
    }

    if(opcion=='update'){
        fetch(put,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                reference:referenceClothe.value,
                category:categoryClothe.value,
                size:sizeClothe.value,
                description:descriptionClothe.value,
                price:priceClothe.value,
                quantity:quantityClothe.value,
                photography:photographyClothe.value
            })
        }).then(function(response){
            if(response.ok){
                modalClothe.hide()
                alertify.alert('AltoTurmequeApp','Producto editado correctamente!!!', function(){ location.reload() });                    
                
                
            }else{
                alertify.error('Error al editar')
            }
        }).catch(error=>{
            alertify.error('Error: '+error)
        })
    }

    modalClothe.hide()
})