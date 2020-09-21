export class UsuarioModel {

    ID: string;
    EMAIL?: string;
    CLAVE?: string;
    NOMBRE?: string;
    APATERNO?: string;
    AMATERNO?: string;
    FOTO?: string;
    TELEFONO?: string;
    ESTADO?: boolean;
    TOKEN?: string;
    ISLOGGED: Boolean = false;

}