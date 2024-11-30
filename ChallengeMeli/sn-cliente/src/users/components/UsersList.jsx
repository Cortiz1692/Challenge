import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { UserRow } from "./UserRow"
import { AuthContext } from "../../auth/context/AuthContext";

export const UsersList = () => {

    const { users } = useContext(UserContext);
    const { login } = useContext(AuthContext);

    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>nombre</th>
                    <th>dni</th>
                    <th>cargo</th>
                    <th>división</th>
                    {!login.isAdmin || <>
                        <th>update</th>
                        <th>remove</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    users.users.map(({ id, username, nombre , dni, cargo, pna, admin, divDocumentacion, divDotacion, divRegistro }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            nombre={nombre}
                            dni={dni}
                            cargo={cargo}
                            pna={pna}
                            admin={admin}
                            divDocumentacion={divDocumentacion}
                            divDotacion={divDotacion}
                            divRegistro={divRegistro}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}