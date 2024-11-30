import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { AuthContext } from "../../auth/context/AuthContext";

export const UserRow = ({ id, username,nombre , dni,cargo, pna, admin, divDocumentacion, divDotacion, divRegistro }) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useContext(UserContext);
    const { login } = useContext(AuthContext);
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{nombre}</td>
            <td>{dni}</td>
            <td>{cargo}</td>
            <td>{pna}</td>


            {!login.isAdmin ||
                <>
                    <td>
                       <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerUserSelectedForm({
                                id,
                                username,
                                nombre,
                                dni,
                                admin,
                                divDocumentacion, 
                                divDotacion, 
                                divRegistro
                            })}
                        >
                            update
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            remove
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}