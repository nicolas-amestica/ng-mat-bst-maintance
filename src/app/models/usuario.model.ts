export class UsuarioModel {

    rut: string;
    email?: string;
    clave?: string;
    nombre?: string;
    apaterno?: string;
    amaterno?: string;
    foto?: string;
    telefono?: string;
    estado?: boolean;
    token?: string;
    isLogged: Boolean = false;

}