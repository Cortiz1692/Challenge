import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";


export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { initialUserForm, handlerAddUser, errors } = useContext(UserContext);

  const [userForm, setUserForm] = useState(initialUserForm);

  const { id, username, password, dni, nombre, email, cargo, pna,  admin, divDocumentacion, divDotacion, divRegistro, firmanteDivision } = userForm;
  console.log("userForm :", userForm);

  useEffect(() => {
    console.log("Componente montado con userSelected:", userSelected);
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUserForm({
      ...userForm,
      [name]: checked,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    handlerAddUser(userForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        type="number"
        placeholder="usuario: ingrese su DNI"
        name="username"
        value={username}
        onChange={onInputChange}
        onWheel={(e) => e.target.blur()}
      />
      <p className="text-danger">{errors?.username}</p>

      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <p className="text-danger">{errors?.password}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="N° dni"
        type="number"
        name="dni"
        value={dni}
        onChange={onInputChange}
        onWheel={(e) => e.target.blur()}
      />
      <p className="text-danger">{errors?.dni}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="nombre y apellido"
        type="text"
        name="nombre"
        value={nombre}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.nombre}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="email"
        type="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="cargo"
        type="text"
        name="cargo"
        value={cargo}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.cargo}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Prefectura división"
        type="text"
        name="pna"
        value={pna}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.pna}</p>

      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="admin"
          value={admin}
          checked={userForm.admin}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">Admin</label>
      </div>
      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="divDocumentacion"
          value={divDocumentacion}
          checked={userForm.divDocumentacion}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">División Documentación</label>
      </div>
      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="divDotacion"
          value={divDotacion}
          checked={userForm.divDotacion}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">División Navegación</label>
      </div>
      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="divRegistro"
          value={divRegistro}
          checked={userForm.divRegistro}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">División Control Gestión</label>
      </div>
      <div className="my-3 form-check">
        <input
          type="checkbox"
          name="firmanteDivision"
          value={firmanteDivision}
          checked={userForm.firmanteDivision}
          className="form-check-input"
          onChange={onCheckboxChange}
        />
        <label className="form-check-label">Firmante de División</label>
      </div>

      <input type="hidden" name="id" value={id} />

      <button className="btn btn-primary" type="submit">
        {id > 0 ? "Editar" : "Crear"}
      </button>

      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
