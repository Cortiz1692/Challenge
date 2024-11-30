import React, { useState, useContext } from "react";
import { EmailContext } from "../../context/EmailContext";
import { AuthContext } from "../../../auth/context/AuthContext";

export const EmailModalForm = ({ show, handleClose, document }) => {
    const [email, setEmail] = useState("");
    const { saveEmail, sendDocument } = useContext(EmailContext);

    const {login} = useContext(AuthContext);


    const username = login.user.username;

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSend = async () => {
        const payload = {
            id: document.idCertificado,
            type: document.idtipoDocumento,
            username: username, // Si necesitas obtener el nombre del usuario actual, agrégalo aquí
            email: email,
        };

        try {
            await saveEmail(payload); // Guardar en la base de datos
            await sendDocument(payload); // Enviar el documento a través de la API

            alert("Documento enviado exitosamente");
            handleClose();
        } catch (error) {
            console.error(error);
            alert("Hubo un error al enviar el documento");
        }
    };

    return (
        <div className={`modal ${show ? "d-block" : "d-none"}`} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enviar Documento</h5>
                        <button type="button" className="close" onClick={handleClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group my-2">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ingrese el email"
                                    value={email}
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSend}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
