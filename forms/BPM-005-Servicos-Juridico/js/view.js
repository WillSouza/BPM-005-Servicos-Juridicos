function modeView(WKNumState){

    console.log("view.js");
    console.log("WKNumState: "+WKNumState);

    $("#ultimaAtualizacao").removeClass("fs-display-none");
    $("#historico").removeClass("fs-display-none");
    $("button#btn-historico").addClass('hide');


    // tarefa  Analisar solicitação
    if(WKNumState == 21){
        vBlockTab1();
       
    }
    
    if(WKNumState == 49){
        vBlockTab1();
        vBlockTab2();
       
    }

    if(WKNumState == 27){
        vBlockTab1();
        vBlockTab2();
       
    }

    if(WKNumState == 9 || WKNumState == 84){
        vBlockTab1();
        vBlockTab2();
        vBlockTab3();
       
    }

    if(WKNumState == 44){
        vBlockTab1();
        vBlockTab2();
        vBlockTab3();
       
    }

    if(WKNumState == 76){
        vBlockTab1();
        vBlockTab2();
        vBlockTab3();
       
    }


    
}

function vBlockTab1(){
    if($("input[name='rdTipoPrazo']:checked").val() == "Determinado"){
        $(".prazoDeterminado").css("display","block");
    }

    if($("input[name='rdTipoPrazo']:checked").val() == "Urgente"){
        $(".justMotiv").css("display","block");
    }

    if($("input[name='rdSolicOriginal']:checked").val() == "outro"){
        $(".userOutro").css("display","block");
    }

    if ($("#categoria").html() != 'Outra') {
        $(".assunto2").css('display','block');
    }

    if ($("#outraCategoria").html() != "&nbsp;") {
        $(".outraCategoria").css('display','block');
    }
    if ($("#outroAssunto").html() != "&nbsp;") {
        $(".outroAssunto").css("display","block");
    }

    if ($("#outraEmpresa").html() != "&nbsp;") {
        $(".outraEmpresa").css("display","block");
    }

    if($("#empresa").html() != "&nbsp;"){
        $("#empresa2").removeClass('hide');
        $(".empresaZoom").addClass('hide');
    }

    if($("#assunto").html() != "&nbsp;"){
        $("#assunto3").removeClass('hide');
        $(".assuntoZoom").addClass('hide');
    }

    if($("#tipo").html() != "&nbsp;"){
        $(".tipo").css("display","block");
    }
    
    if($("#categoria").html() != "&nbsp;"){
        $("#categoria2").removeClass('hide');
        $(".categoriaZoom").addClass('hide');
    }
}

function vBlockTab2(){

    $(".panelAnalisarSolic").css("display","block");

    if($("#descSolic2").html() != "&nbsp;"){
        $(".descSolic2").css("display","block");
    }

    if($("#esclarecer").html() != "&nbsp;"){
        $(".esclarecer").css("display","block");
    }
}

function vBlockTab3(){

    $(".panelExecutarTarefa").css("display","block");

    console.log("--- rdEncaminharSolic: " + $("input[name='rdEncaminharSolic']:checked").val());
    
    
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