import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../../auth/context/AuthContext";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";

export const UsersPage = () => {
  const { page } = useParams();

  const { users, visibleForm, handlerOpenForm, getUsers, paginator } =
    useContext(UserContext);

    

  const { login } = useContext(AuthContext);

  useEffect(() => {
    getUsers(page);
  }, [, page]);

  return (
    <>
      {!visibleForm || <UserModalForm />}
      <div className="container my-4">
        <h2>Users App</h2>
        <div className="row">
          <div className="col">
            {visibleForm || !login.isAdmin || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>
            )}

            {users.length === 0 ? (
              <div className="alert alert-warning">
                No hay usuarios en el sistema!
              </div>
            ) : (
              <>
                <UsersList />
                <Paginator url="/users/page" paginator={paginator} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
