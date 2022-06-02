import React from 'react'

const Mensaje = ({children, tipo}) => { //De esta forma creo un componente que le puedo pasar diferentes tipos(si es un error o correcto) y le pasamos todo el mensaje con children
  return (
    <div className={`alerta ${tipo}`}>
      {children}
    </div>
  )
}

export default Mensaje
