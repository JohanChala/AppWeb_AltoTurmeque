const post ='http://152.70.213.228:8080/api/user/new'
const get ='http://152.70.213.228:8080/api/user/'
const emailUser= document.getElementById('emailUser')
const passwordUser= document.getElementById('passwordUser')
const passwordUserTwo= document.getElementById('passwordUserTwo') 
const nameUser= document.getElementById('nameUser')

$(document).ready(function(){
    $("#btnRegistrar").click(function(e){

        e.preventDefault()
        if(emailUser.value == '' || passwordUser.value == '' || passwordUserTwo.value == '' || nameUser.value == ''){
            alert('Por favor llene todos los campos')
        }else{
            if(passwordUser.value == passwordUserTwo.value){
                $.get(get+emailUser.value,function(data){
                    console.log(data)
                    if(data){
                        alert("Email ya existente!!") 
                    }else{                
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
                            alert("Cuenta creada de forma correcta")
                            window.location.href = "index.html"
                        }else{
                            alert("No fue posible crear la cuenta")
                        }
                        })
                    }
                })
            }else{
                alert("Las contraseñas no coinciden")
        
            }   
        }  
              
    });	
})