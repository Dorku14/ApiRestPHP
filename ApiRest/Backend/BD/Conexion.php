<?php
    class Conexion {
         private $servername = "localhost";
         private $database = "agenda";
         private $username = "root";
         private $password = "";
         private $conn ;

        //  function __constructor(){
        //  } 

         function abrirConexion(){
            $valid = false;
            $this->conn = mysqli_connect($this->servername, $this->username, $this->password, $this->database);
            if ($this->conn) {
                $valid = true;
               // die("Connection failed: " . mysqli_connect_error());
            }
            return $valid;
            //echo "Connected successfully";
         }
         function cerrarConexion(){
            mysqli_close($this->conn);
         }

         function consultaBD($Sentencia){
            $resultado =  $this->conn->query($Sentencia);
            $this->cerrarConexion();
            return $resultado->fetch_all(MYSQLI_ASSOC);
         }
      
         function sentenciaBD($Sentencia){
            $resultado = false;
            try {
                $this->conn->query($Sentencia);
                $this->cerrarConexion();
                $resultado = true;
                return $resultado;
            } catch (Exception  $th) {
                return $resultado;
            }
          
         }
    }
?>