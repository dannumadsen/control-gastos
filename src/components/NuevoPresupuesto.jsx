import {useState} from 'react'
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({
  presupuesto, 
  setPresupuesto, 
  setIsValidPresupuesto
}) => {

  const [mensaje, setMensaje] = useState('');

  //Funcion para administrar presupuesto
  const handlePresupuesto = (e) =>{
      e.preventDefault();

      if(!presupuesto || presupuesto<0){
         setMensaje("No es un presupuesto valido")

         return
      }

      setMensaje("")
      setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'> {/*Cuando se aprete el boton se ejecuta la funcion handlePresupuesto*/}

          <div className='campo'>
            <label>Definir Presupuesto</label>

            <input 
            className='nuevo-presupuesto'
            type='number'
            placeholder='Añade tu presupuesto'
            value={presupuesto}
            onChange = { e => setPresupuesto(Number(e.target.value))} //Agregamos el .target.value para que lo que ingrese el uruario se vaya agregando en la variable de setPaciente.
            />
          </div>
          <input type="submit" value="Añadir" />

          {mensaje && <Mensaje tipo = "error">{mensaje}</Mensaje>} {/*Colocamos el componente del mensaje, le pasamos el mensaje y el tipo*/}

      </form>
    </div>
  )
}

export default NuevoPresupuesto
