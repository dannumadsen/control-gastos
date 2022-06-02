import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'


const Modal = ({
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGasto, 
  gastoEditar,
  setGastoEditar
}) => {

  const [mensaje, setMensaje] = useState('') //Reutilizamos el state mensaje para los diferentes alertas
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState ('')
  const [categoria, setCategoria] = useState('')
  const [id, setId] = useState('')
  const [fecha, setFecha] = useState('')

  useEffect(()=>{
    //si gasto editar viene vacio estamos haciendo un gasto nuevo, si no ...
      if (Object.keys(gastoEditar).length > 0){
        setNombre(gastoEditar.nombre)
        setCantidad(gastoEditar.cantidad)
        setCategoria(gastoEditar.categoria)
        setId(gastoEditar.id)
        setFecha(gastoEditar.fecha)
      }
  }, []);
    
  const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
          setModal(false)
        }, 500);
  }

  const handleSubmite = e =>{
      e.preventDefault(); // usamos un prevent default para prevenir la accion por default, que es mandar el formulario
      
      if ([nombre, cantidad, categoria].includes("")){//.includes significa que si cualquiera de ese arreglo esta vacio falla la validacion del form
          setMensaje('Todos los campos son obligatorios')

          setTimeout(() => {
            setMensaje('')
          }, 1000);
        return
    }
    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img 
            src={CerrarBtn} 
            alt="cerrar modal" 
            onClick={ocultarModal}
        />
      </div>

      <form 
        onSubmit={handleSubmite}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
          <legend>{gastoEditar.nombre ? 'Editar gasto' : 'Nuevo gasto'}</legend>

          {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}{/*SE DICE QUE CUANDO MENSAJE TIENE ALGO, ENTONCES VAMOS A CARGAR EL COMPONENTE MENSAJE Y COMO TIENE ESE CHILDREN PODEMOS CERRAR EL COMPONENTE Y COLOCARLE EL MENSAJE DENTRO que pusimos en la funcion*/}
          
          <div className='campo'>
            <label htmlFor="nombre">Nombre</label>
            <input 
              id='nombre'
              type="text" 
              placeholder='Añade un nuevo gasto'
              value={nombre}
              onChange = {e => setNombre(e.target.value)}
            />
          </div>

          <div className='campo'>
            <label htmlFor="cantidad">Cantidad</label>

            <input 
              id='cantidad'
              type="number" 
              placeholder='Añade la cantidad de gasto'
              value={cantidad}
              onChange = {e => setCantidad(Number(e.target.value))}
            />
          </div>

          <div className='campo'>
            <label htmlFor="categoria">Categoria</label>

            <select 
              id="categoria"
              value={categoria}
              onChange ={ e=> setCategoria(e.target.value)}
              >
                <option value="">-- Seleccione --</option>
                <option value="ahorro">Ahorro</option>
                <option value="comida">Comida</option>
                <option value="casa">Casa</option>
                <option value="gastos">Gastos varios</option>
                <option value="oceo">Oceo</option>
                <option value="salud">Salud</option>
                <option value="suscripciones">Suscripciones</option>
            </select>
          </div>
      
        <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
      </form>
    </div>
  )
}

export default Modal
