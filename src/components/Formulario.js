import React, {Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //Crear State de Cita
    const [cita, actualizarCita] = useState({
        id:'',
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
    const [error, actualizarError] = useState(false);
    
    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const handleChange = event =>{
        actualizarCita({
            ...cita,
            [event.target.name]: event.target.value
        })
    }
    //Extraer los valores (desestructuracion)
    const {mascota, propietario,fecha,hora,sintomas} = cita;
    
    //Enviar formulario
    const submitCita = event => {
        event.preventDefault();//para sacar la funcion del evento por defecto que trae event
        //Validar
        if(
            mascota.trim() === '' || //Trim elimina los espacios en blanco de un string.
            propietario.trim() === '' ||
            fecha.trim() === '' ||
            hora.trim() === '' ||
            sintomas.trim() === ''
        ){ 
            actualizarError(true);
            return;
        }
        //Eliminar mensaje previo
        actualizarError(false);

        //Crear la cita (colocarla en el state principal)
        crearCita(cita);

        //Reiniciar el form
        actualizarCita({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }

    //Asignar un id a la cita 
    const actualizarID = () =>{
        actualizarCita({
            ...cita,
            id:uuidv4()
        })
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>
            {error 
            ? <p className="alerta-error"> Todos los campos son obligatorios</p>   
            :null
            }
            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder= "Mascota"
                    onChange={handleChange}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder= "Nombre del dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />
                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                >
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onClick={actualizarID}
                >
                    Agregar Cita
                </button>
            </form>
        </Fragment>
    );
}

Formulario.propType ={
    crearcita: PropTypes.func.isRequired,
    
}
 
export default Formulario;