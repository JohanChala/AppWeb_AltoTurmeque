const get = 'http://152.70.213.228:8080/api/user/all'
const post = 'http://152.70.213.228:8080/api/user/new'
const put = 'http://152.70.213.228:8080/api/user/update'
const del =  'http://152.70.213.228:8080/api/user/delete/'


//Obtnemos los datos desdel el modal
const modalUser= new bootstrap.Modal(document.getElementById('modalUser'));
const formArticulo = document.querySelector('#formUser')
const identificationModal=document.getElementById('identificationUser')
const nameModal=document.getElementById('nameUser')
const emailModal=document.getElementById('emailUser')
const addressModal=document.getElementById('addressUser')
const cellphoneModal=document.getElementById('cellphoneUser')
const zoneModal=document.getElementById('zoneUser')
const typeModal=document.getElementById('typeUser')
const passwordModal=document.getElementById('passwordUser')
let opcion=''

btnCreate.addEventListener('click',()=>{
    identificationUser.value=''
    nameUser.value=''
    emailUser.value=''
    addressUser.value=''
    cellphoneUser.value=''
    zoneUser.value=''
    typeUser.value=''
    passwordUser.value=''
    modalUser.show()
    opcion='create'
})  
///////////////////////////////////////////////////////////////


//Pintanmos la tabla en el DOM
$(document).ready(function () {

    fetch(get).then(function (response) {
        return response.json();
    }).then(function (data) {

        let body = '';
        data.forEach(element => {
            body += `<tr>
                    <td>${element.id}</td>
                    <td>${element.identification}</td>
                    <td>${element.name}</td>
                    <td>${element.address}</td>
                    <td>${element.cellPhone}</td>
                    <td>${element.email}</td>
                    <td>${element.zone}</td>
                    <td>${element.type}</td>
                    <td class="text-center"><a class="btnEditar btn btn-outline-success btn-sm">Editar</a> 
                                            <a class="btnBorrar btn btn-outline-danger btn-sm">Borrar</a></td>
                    </tr>`;
        });
        
        $('#dataUsers').append(body);        

    }).catch(function (error) {
        alertify.error('Error al obtener los datos');
        console.log(error);
    });
});
///////////////////////////////////////////////////////////////
const on=(element,event,selector,handler)=>{
    element.addEventListener(event,e=>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
//Editar registro
let idForm=0

on(document,'click','.btnEditar',e=>{
    const fila=e.target.parentNode.parentNode    
    modalUser.show()
    idForm=fila.children[0].innerText
    identificationUser.value=fila.children[1].innerText
    nameUser.value=fila.children[2].innerText
    emailUser.value=fila.children[5].innerText
    addressUser.value=fila.children[3].innerText
    cellphoneUser.value=fila.children[4].innerText
    zoneUser.value=fila.children[6].innerText
    typeUser.value=fila.children[7].innerText     
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
                    alertify.alert('AltoTurmequeApp','Usuario borrado correctamente!!!', function(){ location.reload() });                                                            
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

///Procedimiento Crear o Editar
formArticulo.addEventListener('submit',e=>{
    e.preventDefault()
    
    if(opcion=='create'){

        fetch(post,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                identification:identificationUser.value,
                name:nameUser.value,
                email:emailUser.value,
                address:addressUser.value,
                cellPhone:cellphoneUser.value,
                zone:zoneUser.value,
                type:typeUser.value,
                password:passwordUser.value
            })
        }).then(function(response){
            if(response.ok){                
                modalUser.hide()
                alertify.alert('AltoTurmequeApp','Usuario creado correctamente!!!', function(){ location.reload() });                    
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
                id:idForm,
                identification:identificationUser.value,
                name:nameUser.value,
                email:emailUser.value,
                address:addressUser.value,
                cellPhone:cellphoneUser.value,
                zone:zoneUser.value,
                type:typeUser.value,
                password:passwordUser.value
            })
        }).then(function(response){
            if(response.ok){
                
                modalUser.hide()
                alertify.alert('AltoTurmequeApp','Usuario editado correctamente!!!', function(){ location.reload() });                    
            }else{
                alertify.error('Error al editar')
            }
        }).catch(error=>{
            alertify.error('Error: '+error)
        })

    }

    modalUser.hide()
})


