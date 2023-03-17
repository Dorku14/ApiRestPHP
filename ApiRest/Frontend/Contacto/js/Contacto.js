$( document ).ready(function() {
  tablaContactos = listarContactos();
});
let modoFormulario = "";
let tablaContactos;
    function listarContactos(){
      let tabla = $('#myTable').DataTable( {
        ajax: {
          url:"http://localhost/ApiRest/Backend/API/ContactoAPI.php",
          type: 'GET',
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          dataSrc: function (json){
            return json;
          }
        },
        columns: [
          { data: 'ID_Contacto' },
          { data: 'Nombre' },
          { data: 'Direccion' },
          { data: 'Telefono' },
          { data: 'Email' },
          { data: 'Acciones' }
          ],
        columnDefs: [{
          "targets": [ 0 ],
          "visible": false,
          "searchable": false
      },{
          "defaultContent": "-",
          "targets": "_all",
           "className": 'dt-body-right',
           render: function ( data, type, columns,meta ) {
            //debugger
            
            if(!data && meta.col === 5){
              let field = "<button class=\"btn btn-danger\" onclick=\"eliminarRegistro("+columns.ID_Contacto+")\">Eliminar</button> <button class=\"btn btn-primary\" onclick=\"editaContacto("+columns.ID_Contacto+")\" >Editar</button>";
              return field;
            }
           return data
        }
           }]
           
        });
        return tabla;
      // $.ajax({
      //   url: "http://localhost/ApiRest/Backend/API/ContactoAPI.php",
      //   type: "GET",
      //   data: JSON.stringify({
      //       Direccion:"AlexisDorantes",
      //       Direccion: "calle 45 x 20 y 22",
      //       Telefono:"9999",
      //       Email:"alex@hotmail.com"
      //   }),
      //   dataType: "json",
      //   contentType: "application/json",
      // }).done((result) => {
      //   $('#myTable').DataTable( {
      //     columns: [
      //       { data: 'ID_Contacto' },
      //       { data: 'Nombre' },
      //       { data: 'Direccion' },
      //       { data: 'Telefono' },
      //       { data: 'Email' },
      //       { data: 'Acciones' }
      //       ],
      //     columnDefs: [{
      //       "defaultContent": "-",
      //       "targets": "_all",
      //        "className": 'dt-body-right',
      //        render: function ( data, type, columns,meta ) {
      //         //debugger
              
      //         if(!data && meta.col === 5){
      //           let field = "<button class=\"btn btn-danger\" onclick=\"eliminarRegistro("+columns.ID_Contacto+")\">Eliminar</button> <button class=\"btn btn-primary\" onclick=\"editaContacto("+columns.ID_Contacto+")\" >Editar</button>";
      //           return field;
      //         }
      //        return data
      //     }
      //        }],
      //        data: result
      //     });

      // }); 
    }

    function eliminarRegistro(ID_Contacto){
      let resupuesta = confirm("¿Desea eliminar el registro?");
      if(resupuesta){
        
        $.ajax({
          url: "http://localhost/ApiRest/Backend/API/ContactoAPI.php",
          type: "DELETE",
          data: JSON.stringify({
            id : ID_Contacto
        }),
          dataType: "json",
          contentType: "application/json",
        }).done((result) => {
            tablaContactos.ajax.reload();
        });
      }
    }

    function editaContacto(ID_Contacto){
         abreModal('E');
          $.ajax({
            url: "http://localhost/ApiRest/Backend/API/ContactoAPI.php",
            type: "POST",
            data: JSON.stringify({
              id : ID_Contacto
          }),
            dataType: "json",
            contentType: "application/json",
          }).done((result) => {
          detalleContacto(result[0],ID_Contacto);
          });
    }
    function abreModal(modo){
          modoFormulario = modo;
          $("#ID_Contacto").val("");
          $("#Nombre").val("");
          $("#Direccion").val("");
          $("#Telefono").val("");
          $("#Email").val("");
          limipiaTitulo();
          modo == 'A' ? $("#tituloNuevo").show() : $("#tituloEditar").show();
    }

    function limipiaTitulo(){
      $("#tituloEditar").hide();
      $("#tituloNuevo").hide();
    }

    function detalleContacto(data,id){
          $("#ID_Contacto").val(id);
          $("#Nombre").val(data.Nombre);
          $("#Direccion").val(data.Direccion);
          $("#Telefono").val(data.Telefono);
          $("#Email").val(data.Email);
          $("#exampleModalCenter").modal("show");
    }

    function guardar(){
          let Nombre = $("#Nombre").val();
          let Direccion  = $("#Direccion").val();
          let Telefono = $("#Telefono").val();
          let Email =  $("#Email").val();
          let id =  $("#ID_Contacto").val();
          limpiaValidaciones();
          if(validaCampos(Nombre, Direccion, Telefono,Email)){
              if(modoFormulario == "A"){
                CreaContacto(Nombre,Direccion,Telefono,Email);
              }else if(modoFormulario == "E"){
                ActualizaContacto(Nombre,Direccion,Telefono,Email,id);
              }
          }
    }
    function CreaContacto(PNombre,PDireccion,PTelefono,PEmail){
      $.ajax({
        url: "http://localhost/ApiRest/Backend/API/ContactoAPI.php",
        type: "POST",
        data: JSON.stringify({
            Nombre:PNombre,
            Direccion: PDireccion,
            Telefono: PTelefono,
            Email:PEmail
        }),
        dataType: "json",
        contentType: "application/json",
      }).done((result) => {
        
          $("#exampleModalCenter").modal("hide");
          tablaContactos.ajax.reload();
      });
    }

    function ActualizaContacto(PNombre,PDireccion,PTelefono,PEmail,Pid){
          $.ajax({
            url: "http://localhost/ApiRest/Backend/API/ContactoAPI.php",
            type: "PUT",
            data: JSON.stringify({
                id:Pid,
                Nombre:PNombre,
                Direccion: PDireccion,
                Telefono: PTelefono,
                Email:PEmail
            }),
            dataType: "json",
            contentType: "application/json",
          }).done((result) => {
              console.log("Actualiza");
              console.log(result);
              $("#exampleModalCenter").modal("hide");
              tablaContactos.ajax.reload();
          });
    }

    function limpiaValidaciones(){
          $("#errorNombre").hide();
          $("#errorDIreccion").hide();
          $("#errorTelefono").hide();
          $("#errorEmail").hide();
    }

    function validaCampos(Nombre, Direccion, Telefono,Email){
          let isValid = false;
          if(Nombre == ''){
            $("#errorNombre").show();
            return isValid;
          }
          if(Direccion == ''){
            $("#errorDIreccion").show();
            return isValid;
          }
          if(Telefono == ''){
            $("#errorTelefono").show();
            return isValid;
          }
          if(Telefono == ''){
            $("#errorTelefono").show();
            return isValid;
          }
          if(Email == ''){
            $("#errorEmail").text("*Campo Requerido");
            $("#errorEmail").show();
            return isValid;
          }
          if(Email == ''){
            $("#errorEmail").text("*Formato Incorrecto");
            $("#errorEmail").show();
            return isValid;
          }
          isValid = true;

          return isValid;

    }