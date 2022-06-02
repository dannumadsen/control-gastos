import { useState, useEffect } from 'react'
import { generarId } from './helpers';
import Header from './components/Header'
import Filtro from './components/Filtro';
import IconoNuevoGasto from './img/nuevo-gasto.svg' //Importamos la imagen que queremos para el componente
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';


function App() {

  const [presupuesto, setPresupuesto] = useState(
    //lo almacenamos en presupuesto y si no existe, su valor inicial es 0
    Number(localStorage.getItem('presupuesto' ?? 0))
  );

  const [isValidPresupuesto, setIsValidPresupuesto] = useState (false)
  const [modal, setModal] = useState (false)
  const [animarModal, setAnimarModal] = useState (false)
  const [gastos, setGastos] = useState (
    //vamos a buscar por gastos, si existe entonces colocamos JSON.parse, lo que haya en LS lo voy a convertir de un string a un arreglo, caso contrario, inicia el state como un arreglo vacio
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) :[]
  )
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=>{
      localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(()=>{
    //con json.stringify convertimos el arreglo a string porque no podemos guardar arreglos en LS
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(()=>{
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect(()=>{
      if (filtro){
        const gastosFiltrados= gastos.filter(gasto => gasto.categoria === filtro)

        setGastosFiltrados(gastosFiltrados)
      }
  }, [filtro])

  //Con este useEffect verificamos si gastoEditar tiene algo y abrimos el modal otra vez para editarlo
  useEffect(()=>{
    if (Object.keys(gastoEditar).length > 0){
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  const handleNuevoGasto = () => {
    
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = gasto =>{
    if (gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      //Gastos.map nos va a retornar un nuevo arreglo en la variable de actualizados. Iteramos sobre el state de gasto y le vamos a decir que cuando el gasto.id sea igual al gasto que estamos editando que entonces retorne el gasto, caso contrario que retorne lo que este en el state
      setGastos(gastosActualizados)
    }else{
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now(); //Nos retorna la fecha en que se genera ese gasto
      setGastos([... gastos, gasto ]) //Colocamos la funcion setGastos, lo convertimos en un array, hacemos una copia de gastos "(...gastos)", y le agregamos el nuevo gasto que es el objeto que estamos tomando que viene desde el modal 
      setGastoEditar({})
    }
    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = id =>{
    //Como solamente va a tomar un id le pasamos la variable temporal de gasto (se va a traer todos los id diferentes al id que le estamos pasando)
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  return (
    //Cuando el modal este en true que agrege la clase fijar para que no muestre el modal a mitad de pantalla
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos ={gastos}
        setGastos ={setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <> {/*Retornamos un fragment y aqui es donde vamos a importar el listado de gastos(en el main) */}
          <main>
            <Filtro
              filtro= {filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos} //Le pasamos el arreglo de gastos para que conozca la extension de ese arreglo y pueda acceder a el
              setGastoEditar = {setGastoEditar}
              eliminarGasto = {eliminarGasto}
              filtro= {filtro}
              gastosFiltrados={gastosFiltrados}

            />
          </main>

          <div className='nuevo-gasto'>
              <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
              />
          </div>
        </>
      )}
      
      {modal && <Modal
                setModal = {setModal}
                animarModal = {animarModal}
                setAnimarModal = {setAnimarModal}
                guardarGasto = {guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
