<?php
include($_SERVER['DOCUMENT_ROOT'].'/ApiRest/Backend/Modelos/Contacto.php');


 $metodoHTTP = $_SERVER['REQUEST_METHOD'];
 $request = file_get_contents('php://input'); // leemos el flujo
 $requestArr = json_decode($request,true);
 //var_dump(json_encode($requestArr));
 switch ($metodoHTTP){
     case 'POST':
         //echo " Guardar "; 
         
         if(!isset($requestArr["id"])){
            echo json_encode(CreaNuevoContacto($requestArr), JSON_FORCE_OBJECT);
        }else{
            echo json_encode(detalleContactos($requestArr["id"]), JSON_PRETTY_PRINT);
        }
         break;
     case 'GET':
        header('Content-type: application/json');
        echo json_encode(listaContactos(), JSON_PRETTY_PRINT);

         //echo " Obtener ";
         break;
    case 'DELETE':
        header('Content-type: application/json');
        echo json_encode(eliminaContacto($requestArr), JSON_PRETTY_PRINT);
         //echo " Eliminar ";
         break;
    case 'PUT':
        echo json_encode(actualizaContacto($requestArr), JSON_FORCE_OBJECT);
         //echo " Actualizar ";
         break;
     default :
        echo " No se recibio nada ";
  }

    function CreaNuevoContacto($rqtArr){

        $Contacto = new Contacto();

        $resultado = $Contacto->CrearNuevoContacto($rqtArr["Nombre"],$rqtArr["Direccion"],$rqtArr["Telefono"],$rqtArr["Email"]);
        header('Content-type: application/json');
        return   $resultado;
    }

    function listaContactos(){
        $Contacto = new Contacto();
        //echo "Contactos \n";
        $lista = $Contacto->dameContactos();
        return  $lista;
    }

    
    function detalleContactos($id){
        $Contacto = new Contacto();
        //echo "Contactos \n";
        $lista = $Contacto->dameContacto($id);
        return  $lista;
    }

    function actualizaContacto($rqtArr){
        $Contacto = new Contacto();

        $resultado = $Contacto->actualizar($rqtArr["Nombre"],$rqtArr["Direccion"],$rqtArr["Telefono"],$rqtArr["Email"],$rqtArr["id"]);
        header('Content-type: application/json');
        return  $resultado;
    }

    function eliminaContacto($rqtArr){
        $Contacto = new Contacto($rqtArr);

        $resultado =  $Contacto->elimina($rqtArr["id"]);
        header('Content-type: application/json');
        return  $resultado;
    }
?>