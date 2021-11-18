const post ='http://152.70.213.228:8080/api/user/new'
const emailUser= document.getElementById('emailUser')
const passwordUser= document.getElementById('passwordUser')
const nameUser= document.getElementById('nameUser')

$(document).ready(function(){
    $("#btnRegistrar").click(function(e){
        e.preventDefault()
        fetch(post, {
            method: 'POST',
            body: JSON.stringify(
                {  email: emailUser.value,
                   password: passwordUser.value,
                   name: nameUser.value    
                }),
            headers: {
                'Content-Type': 'application/json'
            }            
        }).then(function(response){
            if(response.status == 201){
                alert("Usuario creado correctamente")
                window.location.href = "index.html"
            }else{
                alert("Usuario ya existe")
            }
        })
    });	
})