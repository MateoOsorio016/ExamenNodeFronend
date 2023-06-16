const url = 'http://localhost:8088/api/robos'
const listarrobos =async()=>{
    let body= document.getElementById('contenido');
    if(body){
        let mensaje=''

        fetch(url)
        .then(res=> res.json())
        .then(function(data){
            let listarrobos=data.robos
            listarrobos.map((robos)=>{
                mensaje+=
                `<td>${robos.Direccion}</td>`+
                `<td>${robos.Latitud}</td>`+
                `<td>${robos.Longitud}</td>`+
                `<td>${robos.Descripcion}</td>`+
                `<td>${robos.Fecha}</td>`+
                `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(robos)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${robos._id}")'>Eliminar</a>
                </td></tr>`
                body.innerHTML = mensaje
            }
            )
        })

        }
    }
listarrobos()
const registrarRobos = async() =>{
    let Direccion = document.getElementById('direccion').value
    let Latitud = document.getElementById('latitud').value
    let Longitud=document.getElementById('longitud').value
    let Descripcion = document.getElementById('descripcion').value

    let robo = {
        Direccion: Direccion,
        Latitud:Latitud,
        Longitud:Longitud,
        Descripcion:Descripcion
    }

    if(Latitud >= 6.13 && Latitud <= 6.217 || Longitud >= -75.34 && Longitud <=-75.567){
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body:JSON.stringify(robo),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('Los valores de longitud no son validos, recuerde que la latitud deben estar entre 6.217 y 6.13, y la longitud en -75.34 a -75.567 ')
    }
}
const editar = (robo) =>{
    let _id =document.getElementById('_id').value = ''
    let Direccion = document.getElementById('direccion').value=''
    let Latitud = document.getElementById('latitud').value=''
    let Longitud=document.getElementById('longitud').value=''
    let Descripcion = document.getElementById('descripcion').value=''

    document.getElementById('_id').value=robo._id
    document.getElementById('direccion').value=robo.Direccion
    document.getElementById('latitud').value=robo.Latitud
    document.getElementById('longitud').value=robo.Longitud
    document.getElementById('descripcion').value=proveedor.Descripcion
}
const actualizarRobo = async() =>{
    //Captura de valores de datos enviados desde el formulario
    let Direccion = document.getElementById('direccion').value
    let Latitud = document.getElementById('latitud').value
    let Longitud=document.getElementById('longitud').value
    let Descripcion = document.getElementById('descripcion').value

    let robo = {
        _id: document.getElementById('_id').value,
        Direccion: Direccion,
        Latitud:Latitud,
        Longitud:Longitud,
        Descripcion:Descripcion
        }

    if( Latitud >= 6.13 && Latitud <= 6.217 || Longitud >= -75.34 && Longitud <=-75.567){
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body:JSON.stringify(robo),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })
    }
    else{
        alert('Los valores de longitud no son correctos')
    }
}
const eliminar =(_id) => {
    if(confirm('¿Está seguro de realizar la eliminación?') == true){
            //Captura de valores de datos enviados desde el formulario
    let robos = {
        _id: _id
    }
    
    

       fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body:JSON.stringify(robos),
            headers: {"Content-type": "application/json; charset=UTF-8"}     
        })
        .then(response => response.json()) //La respuesta del método POST de la API
        .then(json => {
           alert(json.mensaje)
        })     
    }
}

if(document.querySelector('#btnRegistrar'))
{
    document.querySelector('#btnRegistrar')
    .addEventListener('click', registrarRobos)
}
if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
    .addEventListener('click', actualizarRobo)

}



