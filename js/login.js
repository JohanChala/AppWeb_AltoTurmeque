const get = 'http://152.70.213.228:8080/api/user/'
const emailUser= document.getElementById('emailUser')
const passwordUser= document.getElementById('passwordUser')

$(document).ready(function(){
    $("#btnEnviar").click(function(e){
        e.preventDefault()
        $.get(get+emailUser.value+'/'+passwordUser.value, function(data){            
            if(data.name != "NO DEFINIDO"){
                alert("Bienvenido "+data.name)
                window.location.href = "index.html"
            }else{
                alert("Cuenta asociada a la combinación email/contraseña no existe")
            }
        })
    });
});