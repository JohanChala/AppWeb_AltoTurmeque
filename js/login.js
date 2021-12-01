const get = 'http://152.70.213.228:8080/api/user/'
const emailUser= document.getElementById('emailUser')
const passwordUser= document.getElementById('passwordUser')

$(document).ready(function(){
    $("#btnEnviar").click(function(e){
        e.preventDefault()
        if(emailUser.value == '' || passwordUser.value == ''){
            alertify.error('Por favor llene todos los campos')
        }else{
            $.get(get+emailUser.value+'/'+passwordUser.value, function(data){            
                if(data.name != null){
                    alertify.alert('AltoTurmequeApp', 'Bienvenido '+data.name, function(){ window.location.href = "home.html" });
                    
                }else{
                    alertify.error("Cuenta asociada a la combinación email/contraseña no existe")
                }
            })
        }
    });
});