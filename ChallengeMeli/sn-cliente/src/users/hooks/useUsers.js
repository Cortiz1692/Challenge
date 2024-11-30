import { useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { usersReducer } from "../reducers/usersReducer";
import { findAllPages, remove, save, update } from "../services/userService";
import { AuthContext } from "../../auth/context/AuthContext";

const initialState = {
    users: [],
    paginator: {},

};

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    dni: '',
    nombre: '',
    email: '',
    cargo: '',
    pna: '',
    admin: false,
    divDocumentacion: false,
    divDotacion: false,
    divRegistro: false,
    firmanteDivision: false
}

const initialErrors = {
    username: '',
    password: '',
    email: '',
}

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialState);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);
    const [role, setRole] = useState('');
    const [paginator, setPaginator] = useState("");

    const [errors, setErrors] = useState(initialErrors)

    const navigate = useNavigate();

    const { login, handlerLogout } = useContext(AuthContext);

    const getUsers = async (page = 0) => {

        try {
            const result = await findAllPages(page);
            dispatch({
                type: 'loadingUsers',
                payload: result.data,
            });
            setPaginator(result.data);
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    }


    const handlerAddUser = async (user) => {


        if (!login.isAdmin) return;

        let response;
        try {
            if (user.id === 0) {
                response = await save(user);
                dispatch({
                    type: 'addUser',
                    payload: response.data,
                });
                Swal.fire(
                    'Usuario Creado',
                    'El usuario ha sido creado con éxito!',
                    'success'
                );
            } else {
                response = await update(user);
                dispatch({
                    type: 'updateUser',
                    payload: response.data,
                });
                Swal.fire(
                    'Usuario Actualizado',
                    'El usuario ha sido actualizado con éxito!',
                    'success'
                );
            }
            handlerCloseForm();
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Swal.fire(
                    'Usuario Existente',
                    'El usuario que desea agregar ya se encuentra registrado en el sistema!',
                    'warning'
                );
                setErrors({ username: 'El username ya existe!' });
            } else if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else if (error.response && error.response.status === 500 &&
                error.response.data?.message?.includes('constraint')) {

                if (error.response.data?.message?.includes('UK_email')) {
                    setErrors({ email: 'El email ya existe!' });
                }
                handlerLogout();
            } else {
                throw error;
            }
        }
    };

    const handlerRemoveUser = (id) => {

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await remove(id);
                    dispatch({
                        type: 'removeUser',
                        payload: id,
                    });
                    Swal.fire(
                        'Usuario Eliminado!',
                        'El usuario ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerUserSelectedForm = (user) => {
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({});
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
        paginator
    }
}