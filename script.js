/* ================================THEME================================= */

//cambiar theme
const botonDarkMode = document.getElementById("botonDarkMode")
const botonLightMode = document.getElementById("botonLightMode")
//chequeo el localStorage para ver si hay guardado el theme

let lightMode

localStorage.getItem("theme") ? (lightMode = localStorage.getItem("theme")) : (localStorage.setItem("theme", "dark"))

if (lightMode == "light") {
    document.body.classList.add("lightMode")
}

botonLightMode.addEventListener("click", () => {
    document.body.classList.add("lightMode")
    localStorage.setItem("theme", "light")
})

botonDarkMode.addEventListener("click", () => {
    document.body.classList.remove("lightMode")
    localStorage.setItem("theme", "dark")
})
//===========================================APIs===================================

//Declaro la funcion dividir
const dividir = (num1, num2) => num1 / num2
//creo las funciones para retornar las cotizaciones

//==========DOLARES
let valorDolar = 0
async function consultarDolar() {
    const cotizacion = await fetch("https://criptoya.com/api/dolar")
    const cotizacionParseada = await cotizacion.json()
    valorDolar = cotizacionParseada.blue
    return valorDolar
}

consultarDolar()

setInterval(() => {
    consultarDolar()
}, 30000)


//==========BITCOIN
let valorBitcoin = 0
async function consultarBitcoin() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/btc")
    const cotizacionParseada = await cotizacion.json()
    valorBitcoin = cotizacionParseada.ask
    return valorBitcoin
}

consultarBitcoin()

setInterval(() => {
    consultarBitcoin()
}, 30000)


//==========ETHEREUM
let valorEthereum = 0
async function consultarEthereum() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/eth")
    const cotizacionParseada = await cotizacion.json()
    valorEthereum = cotizacionParseada.ask
    return valorEthereum
}

consultarEthereum()

setInterval(() => {
    consultarEthereum()
}, 30000)

//==========USDC
let valorUSCD = 0
async function consultarUSDC() {
    const cotizacion = await fetch("https://criptoya.com/api/lemoncash/usdc")
    const cotizacionParseada = await cotizacion.json()
    valorUSCD = cotizacionParseada.ask
    return valorUSCD
}

consultarUSDC()

setInterval(() => {
    consultarUSDC()
}, 30000)

/* =================================Ingreso datos usuarios================== */


//creo la clase Usuario
class Usuario {
    constructor(nombre, apellido, email, monto) {
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.monto = monto
    }

}

//creo el array de objetos para los usuarios, vacio. Chequeando si ya existe en localStorage
const usuarios = JSON.parse(localStorage.getItem("usuarios")) ?? []

//Para tomar los datos del formulario, creo las variables que necesito
const idFormulario = document.getElementById("formulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const monto = document.getElementById("monto").value;


    //creo el objeto usuario
    const usuario = new Usuario(nombre, apellido, email, monto)

    //Agrego los datos del usuario al array
    usuarios.push(usuario)
    //Guardo los datos del usuario en LocalStorage
    localStorage.setItem("usuario", JSON.stringify(usuarios));
    //Ahora limpio el formulario
    idFormulario.reset();

    //Muestro el resultado creando una funcion
    realizarCambio(usuario);
})

btnForm.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Conversion realizada',
        showConfirmButton: false,
        timer: 1500,
    })
})

//Creo la funcion para mostrar el resultado
const resultado = document.getElementById("infoUsuarios");

const realizarCambio = (usuario) => {
    let aux = "";
    aux += `
    <h2 class="card-title">Hola ${usuario.nombre}</h2>
    <div class="card cardUsuarios" style="width: 18rem;">
        <div class="card-body">
            <h6 class="card-subtitle mb-2 ">Tus $${usuario.monto} equivalen a U$S ${dividir(usuario.monto, valorDolar)}</h6>
        </div>
    </div>
    
<div class="col-lg-6 col-md-12 d-flex justify-content-evenly">
                            <div class="row">
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 10rem;">
                                        <img src="img/index.jpg" class="card-img-top" alt="bitcoin">
                                        <div class="card-body">
                                            <h2>Bitcoin</h2>
                                            <p class="cardBtc">BTC ${dividir(usuario.monto, valorBitcoin)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 10rem;">
                                        <img src="img/ethereum.jpg" class="card-img-top" alt="etherum">
                                        <div class="card-body">
                                            <h2>Ethereum</h2>
                                            <p class="cardBtc">ETH ${dividir(usuario.monto, valorEthereum)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-auto">
                                    <div class="card cardUsuarios" style="width: 10rem;">
                                        <img src="img/usdc.jpg" class="card-img-top" alt="usdc">
                                        <div class="card-body">
                                            <h2>USDC</h2>
                                            <p class="cardBtc">USDC ${dividir(usuario.monto, valorUSCD)}</p>
                                        </div>
                                        <div>
                                        <button id="btnCompra" class="btn btn-light btn-sm">Comprar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        `

    resultado.innerHTML = aux;
}
