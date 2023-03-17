<?php
include($_SERVER['DOCUMENT_ROOT'].'/ApiRest/Backend/BD/Conexion.php');
    class Contacto {
        private $Nombre;
        private $Direccion;
        private $Telefono;
        private $Email;
        
        function CrearNuevoContacto($Nombre,$Direccion,$Telefono,$Email){
            try {
                $conn = new Conexion();
                if($conn->abrirConexion()){ 
                    $query = "INSERT INTO contacto (Nombre,Direccion,Telefono,Email) VALUES ('".$Nombre."','".$Direccion."','".$Telefono."','".$Email."')";
                    $conn->sentenciaBD($query);
                    return array(
                        "Mensaje" => "Exito al crear el contacto",
                    );
                }else{
                    return 'Ocurrió un error al agregar el contactos'; //codigo 03
                }
            } catch (Exception $th) {
                return 'Ocurrió un error al agregar el contactos'; //codigo 02
            }
         
           
        }
         
        function dameContactos(){
            $conn = new Conexion();
            if($conn->abrirConexion()){ 
                $query = "SELECT * FROM contacto";
                return $conn->consultaBD($query);
            }else{
                return 'Ocurrió un error al obtener la lista de contactos';
            }
        }

        function dameContacto($id){
            $conn = new Conexion();
            if($conn->abrirConexion()){ 
                $query = "SELECT * FROM contacto where ID_Contacto = ".$id;
                return $conn->consultaBD($query);
            }else{
                return 'Ocurrió un error al obtener la lista de contactos';
            }
        }

        function actualizar($Nombre,$Direccion,$Telefono,$Email,$id){
            try {
                $conn = new Conexion();
                if($conn->abrirConexion()){ 
                    $query = "UPDATE contacto SET Nombre ='".$Nombre."', Direccion = '".$Direccion."', Telefono = '".$Telefono."', Email = '".$Email."'  WHERE ID_Contacto = ".$id;
                    $conn->sentenciaBD($query);
                    return array(
                        "Mensaje" => "Exito al actualizar contacto",
                    );
                }else{
                    return 'Ocurrió un error al actualizar el contactos'; //codigo 03
                }
            } catch (Exception $th) {
                return 'Ocurrió un error al actualizar el contactos'; //codigo 02
            }
           
        }

        function elimina($id){
            try {
                $conn = new Conexion();
                if($conn->abrirConexion()){ 
                    $query = "DELETE FROM contacto  WHERE ID_Contacto = ".$id;
                    $conn->sentenciaBD($query);
                    return array(
                        "Mensaje" => "Exito al eliminar contacto",
                    );
                }else{
                    return 'Ocurrió un error al eliminar el contactos'; //codigo 03
                }
            } catch (Exception $th) {
                return 'Ocurrió un error al eliminar el contactos'; //codigo 02
            }
        }

    }

?>