$(document).ready(function () {
    let method;
    $('#btnAddNewCar').click(function () {
        $('.titulomodal').html("Agregar nuevo auto");
        $('#frmAddandModCars').attr('action', '/Home/Store');
        method = 'POST';
        $("#frmAddandModCars input").each(function () {
            $(this).val("");
        });
    });
    $('#btnGuardarDatos').on('click', function () {
        $('#btnSave').click();
    });
    let timerMsj;
    $('#frmAddandModCars').on('submit', function (e) {
        e.preventDefault();
        let datos = [];
        $("#frmAddandModCars input").each(function () {
            var input = $(this);
            datos.push(input);
        });
        $.ajax({
            method: method,
            url: $("#frmAddandModCars").attr('action'),
            data: {
                'Id': datos[0].val(),
                'Marca': datos[1].val(),
                'Modelo': datos[2].val(),
                'Descrip': datos[3].val(),
                'Anio': datos[4].val(),
                'Km': datos[5].val(),
                'prec': datos[6].val()
            },
            success: function (data) {
                if ($("#frmAddandModCars").attr('action') === '/Home/Store') {
                    let descrip = data['descripcion'] === null ? "" : data['descripcion'];
                    $('#tbodycarros').append('<tr>' +
                        '<th scope="row">' + data['id'] + '</th>' +
                        '<td>' + data['marca'] + '</td>' +
                        '<td>' + data['modelo'] + '</td>' +
                        '<td>' + descrip + '</td>' +
                        '<td>' + data['anio'] + '</td>' +
                        '<td>' + data['kilometros'] + '</td>' +
                        '<td>' + data['precio'] + '</td>' +
                        '<td>' +
                        '<button data-id="' + data['id'] + '" data-toggle="modal" data-target="#addnewcar" class="btn btn-warning btnEditar">Editar</button>\n' +
                        '<button data-id="' + data['id'] + '" class= "btn btn-danger btnEliminar">Eliminar</button >' +
                        '</td > ' +
                        '</tr > ');
                    $('#msjUsuario').html("Se ha guardado exitosamente");
                } else {
                    if (data === 'S') {
                        //actualizar los valores en la interfaz
                        $('#tbodycarros').find('tr').each(function () {
                            if ($(this).find('th').html() === datos[0].val()) {
                                i = 1;
                                $(this).find('td').each(function () {
                                    if( i < 7)
                                        $(this).html(datos[i].val());
                                    i++;
                                });
                            }
                        });
                        $('#msjUsuario').html("Se ha modificado correctamente.");
                        $('#msjUsuario').removeClass('alert-danger');
                        $('#msjUsuario').addClass('alert-success');
                    } else {
                        $('#msjUsuario').html("No se pudo modificar el registro, ya que el ID no existe");
                        $('#msjUsuario').addClass('alert-danger');
                        $('#msjUsuario').removeClass('alert-success');
                    }
                }
                for (let i = 0; i < datos.length-1; i++) {
                    datos[i].val("");
                }
                $('#msjUsuario').removeClass('d-none');
                timerMsj = setInterval(ocultamsj, 3000);
                $('#btnCerrarModal').click();
            },
            error: function () {
                alert("Ha ocurrido un error al momento de almacenar los datos, por favor, intente de nuevo");
            }
        });
    });
    function ocultamsj() {
        $('#msjUsuario').addClass('d-none');
        clearInterval(timerMsj);
    }
    $('#tbodycarros').on('click','.btnEditar',function () {
        $('.titulomodal').html("Editar registro");
        $('#frmAddandModCars').attr('action', '/Home/Update');
        method = 'PUT';
        let idCar = $(this).data('id');
        let row = $(this).parent().parent();
        let i = 0, datos = [];
        row.find('td').each(function () {
            if (i < 6) {
                datos.push($(this).html());
            }
            i++;
        });
        i = -1;
        $("#frmAddandModCars input").each(function () {
            var input = $(this);
            if (i === -1) {
                input.val(idCar);
            } else {
                
                input.val(datos[i]);
            }
            i++;
        });
    });
    $('#tbodycarros').on('click', '.btnEliminar', function () {
        let row = $(this).parent().parent();
        let idCar = $(this).data('id');
        swal({
            title: "¿Estás seguro que deseas eliminar el registro?",
            text: "Una vez eliminado, no se puede deshacer.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    method: 'DELETE',
                    url: '/Home/Delete',
                    data: {
                        'Id': idCar
                    },
                    success: function (data) {
                        if (data === 'S') {
                            row.remove();
                            $('#msjUsuario').html("Se ha eliminado correctamente.");
                            $('#msjUsuario').removeClass('alert-danger');
                            $('#msjUsuario').addClass('alert-success');
                        } else {
                            $('#msjUsuario').html("No se pudo eliminar el registro, ya que el ID no existe");
                            $('#msjUsuario').addClass('alert-danger');
                            $('#msjUsuario').removeClass('alert-success');
                        }
                    },
                    error: function () {
                        alert("Ha ocurrido un error al eliminar el registro, intente nuevamente");
                    }
                });
                swal("El registro ha sido eliminado", {
                    icon: "success",
                });
            } else {
                swal("La acción ha sido cancelada");
            }
         });
    });
});