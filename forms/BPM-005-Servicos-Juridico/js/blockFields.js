function blockFields(WKNumState){

    
    if(WKNumState == 21){

        //blockTab1();
        var rdTipoPrazo = $("input[name='rdTipoPrazo']:checked").val();
        var rdSolicOriginal = $("input[name='rdSolicOriginal']:checked").val();
        var empresa = $("#empresa").val();
        var tipo = $("#tipo").val();


        if(rdTipoPrazo == "Urgente"){
            $(".justMotiv").css("display","block");
            $("#justMotiv").attr("readonly","readonly");

        }

        if(rdTipoPrazo == "Determinado"){
            $(".prazoDeterminado").css("display","block");
            $("#prazoDeterminado").attr("readonly","readonly");
        }

        if(rdSolicOriginal == "outro"){
            $(".userOutro").css("display","block");
            $("#userOutro").attr("readonly","readonly");
        }

        if(empresa == "OUTRA"){
            $(".outraEmpresa").css("display","block");
        }

        if(tipo != ""){
            $(".tipo").css("display","block");
        }


        $("#descSolic").attr("readonly","readonly");

       
    }

    if(WKNumState == 49){
       // blockTab1();
        blockTab2();
    }

    if(WKNumState == 27){
        blockTab1();
        blockTab2();
    }

    if(WKNumState == 44){
        blockTab1();
        blockTab2();
        blockTab3();
    }

    if(WKNumState == 9 || WKNumState == 84){
        blockTab1();
        blockTab2();
        blockTab3();
    }


}

function blockTab1(){

    $(".rdTipoPrazo").attr("style", "pointer-events: none;");
    $(".rdSolicOriginal").attr("style", "pointer-events: none;");
    $("#prazoDeterminado").attr('readonly', 'readonly');
    $("#userOutro").attr('readonly', 'readonly');
    $("#justMotiv").attr('readonly', 'readonly');
    $("#outraParte").attr('readonly', 'readonly');
    $("#outraEmpresa").attr('readonly', 'readonly');
    $("#outraCategoria").attr('readonly', 'readonly');
    $("#outroAssunto").attr('readonly', 'readonly');
    $("#tipo").attr('readonly', 'readonly');



    if($("input[name='rdTipoPrazo']:checked").val() == "Determinado"){
        $(".prazoDeterminado").css("display","block");
    }

    if($("input[name='rdTipoPrazo']:checked").val() == "Urgente"){
        $(".justMotiv").css("display","block");
    }

    if($("input[name='rdSolicOriginal']:checked").val() == "outro"){
        $(".userOutro").css("display","block");
    }

    if ($("#categoria").val() != 'Outra') {
        $(".assunto2").css('display','block');
    }

    if ($("#outraCategoria").val() != "") {
        $(".outraCategoria").css('display','block');
    }
    if ($("#outroAssunto").val() != "") {
        $(".outroAssunto").css("display","block");
    }

    if ($("#outraEmpresa").val() != "") {
        $(".outraEmpresa").css("display","block");
    }

    if($("#empresa").val() != ""){
        $("#empresa2").removeClass('hide');
        $(".empresaZoom").addClass('hide');
    }

    if($("#assunto").val() != ""){
        $("#assunto3").removeClass('hide');
        $(".assuntoZoom").addClass('hide');
    }

    if($("#tipo").val() != ""){
        $(".tipo").css("display","block");
    }
    
    if($("#categoria").val() != ""){
        $("#categoria2").removeClass('hide');
        $(".categoriaZoom").addClass('hide');
    }


    $("#descSolic").attr('readonly', 'readonly');
}

function blockTab2(){

    $(".rdAnaliseSolic").attr("style", "pointer-events: none;");
    $("#descSolic2").attr('readonly', 'readonly');
    $("#esclarecer").attr('readonly', 'readonly');

    if($("#descSolic2").val() != ""){
        $(".descSolic2").css("display","block");
    }

    if($("#esclarecer").val() != ""){
        $(".esclarecer").css("display","block");
    }
}

function blockTab3(){

    $(".rdEncaminharSolic").attr("style", "pointer-events: none;");
    $("#justFinalizar").attr('readonly', 'readonly');
    $("#motivoRevisao").attr('readonly', 'readonly');
    $("#apoio").attr('readonly', 'readonly');
    $("#apoio2").attr('readonly', 'readonly');
    $("#justApoio").attr('readonly', 'readonly');

    if($("input[name='rdEncaminharSolic']:checked").val() == "finalizar"){
        $(".justFinalizar").css("display","block");
    }
   
    if($("input[name='rdEncaminharSolic']:checked").val() == "revisao"){
        $(".motivoRevisao").css("display","block");
    }
   
    if($("input[name='rdEncaminharSolic']:checked").val() == "transferir"){
        $(".zoomUsuario").css("display","block");
    }
   
    if($("input[name='rdEncaminharSolic']:checked").val() == "apoio"){
        $(".zoomApoio").css("display","block");
    }
   


}