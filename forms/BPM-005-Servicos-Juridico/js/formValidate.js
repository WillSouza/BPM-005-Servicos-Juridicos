var beforeSendValidate = function (WKNumstate, WKNextState) {


    console.log("--- beforeSendValidade ---");
    console.log("--- WKNumstate: " + WKNumstate);
    console.log("--- WKNextState: " + WKNextState);

    var block = false;
    var doc = $('html, body');

    // Tarefa Início
    if(WKNumstate == 0 || WKNumstate == 4){

        var rdTipoPrazo = $("input[name='rdTipoPrazo']:checked").val();
        var rdSolicOriginal = $("input[name='rdSolicOriginal']:checked").val();
        var prazoDeterminado = $("#prazoDeterminado").val();
        var justMotiv = $("#justMotiv").val();
        var userOutro = $("#userOutro").val();
        var empresa = $("#empresa").val();
        var outraEmpresa = $("#outraEmpresa").val();
        var outraParte = $("#outraParte").val();
        var categoria = $("#categoria").val();
        var assunto = $("#assunto").val();
        var outraCategoria = $("#outraCategoria").val();
        var outroAssunto = $("#outroAssunto").val();
        var descSolic = $("#descSolic").val();
        var tipo = $("#tipo").val();
        var showTipo = $("#showTipo").val();
        
        console.log("--- tipo: "+tipo);
        console.log("--- showTipo: "+showTipo);
        
        
        if (rdTipoPrazo == "" || rdTipoPrazo == undefined) {
            if (block == false) {
                scroll('rdTipoPrazo');
            }
            colorBorder('rdTipoPrazo');
            block = true;
        }

        if(rdTipoPrazo == 'Urgente'){
         
            if(justMotiv == ""){
                if (block == false) {
                    scroll('justMotiv');
                }
                colorBorder('justMotiv');
                block = true;
            }
        }

        if(rdTipoPrazo == 'Determinado'){
            
            if(prazoDeterminado == ""){
                if (block == false) {
                    scroll('prazoDeterminado');
                }
                colorBorder('prazoDeterminado');
                block = true;
            }

            
        }

        if(rdSolicOriginal == "" || rdSolicOriginal == undefined){
           
            if (block == false) {
                scroll('rdSolicOriginal');
            }
            colorBorder('rdSolicOriginal');
            block = true;
        }
        
        if(rdSolicOriginal == "outro" && userOutro == "" ){

            if (block == false) {
                scroll('userOutro');
            }
            colorBorder('userOutro');
            block = true;
        }
        
        if(empresa == "" || empresa == null){

            if (block == false) {
                scroll('empresa');
            }
            colorBorder('empresa');
            block = true;
        }

        if(empresa == "OUTRA"){

            if(outraEmpresa == ""){
                if (block == false) {
                    scroll('outraEmpresa');
                }
                colorBorder('outraEmpresa');
                block = true;
            }
        }

        if(outraParte == ""){

            if (block == false) {
                scroll('outraParte');
            }
            colorBorder('outraParte');
            block = true;
        }

        if(categoria == "" || categoria == null){

            if (block == false) {
                scroll('categoria');
            }
            colorBorder('categoria');
            block = true;
        }

        if(categoria != "Outra" && categoria != null){
            if( assunto == "" || assunto == null){
                if (block == false) {
                    scroll('assunto');
                }
                colorBorder('assunto');
                block = true;
            }

            if(assunto == "Outros" && outroAssunto ==""){
                if (block == false) {
                    scroll('outroAssunto');
                }
                colorBorder('outroAssunto');
                block = true;
            }

        }

        if(categoria == "Outra"){
            if(outraCategoria == ""){

                if (block == false) {
                    scroll('outraCategoria');
                }
                colorBorder('outraCategoria');
                block = true;
            }

            if(outroAssunto == ""){

                if (block == false) {
                    scroll('outroAssunto');
                }
                colorBorder('outroAssunto');
                block = true;
            }
        }

        if(showTipo == '1'){
            if(tipo == "" || tipo == null){
                if (block == false) {
                    scroll('tipo');
                }
                colorBorder('tipo');
                block = true;
            }
        }

        if(descSolic == ""){

            if (block == false) {
                scroll('descSolic');
            }
            colorBorder('descSolic');
            block = true;
        }

        if(block == false){

            if($("#showModal").val() == 0){
                var myModal = "";
                $("#showModal").val('1');
                throw myModal = FLUIGC.modal({
                    title: 'Atenção',
                    content: 'Verifique se a descrição é suficiente para atender sua solicitação.',
                    id: 'fluig-modal',
                    size: 'large ',
                    actions: [{
                        'label': 'Fechar',
                        'autoClose': true
                    }]
                }, function (err, data) {
                    if (err) {
                        // do error handling
                    } else {
                        // do something with data
                    }
                });

                

            }
            
        }

       

    }

    // Tarefa Analisar Solicitação
    if(WKNumstate == 21){

        var rdAnaliseSolic = $("input[name='rdAnaliseSolic']:checked").val();
        var descSolic2 = $("#descSolic2").val();
        var esclarecer = $("#esclarecer").val();
        var textFinalizar = $("#textFinalizar").val();
        

        if(rdAnaliseSolic == "" || rdAnaliseSolic == undefined){
            if (block == false) {
                scroll('rdAnaliseSolic');
            }
            colorBorder('rdAnaliseSolic');
            block = true;
        }

        /* if(rdAnaliseSolic == "executar" && descSolic2 == ""){
            if (block == false) {
                scroll('descSolic2');
            }
            colorBorder('descSolic2');
            block = true;
        } */

        if(rdAnaliseSolic == "esclarecer" && esclarecer == ""){
            if (block == false) {
                scroll('esclarecer');
            }
            colorBorder('esclarecer');
            block = true;
        }

        if(rdAnaliseSolic == "finalizar" && textFinalizar == ""){
            if (block == false) {
                scroll('textFinalizar');
            }
            colorBorder('textFinalizar');
            block = true;
        }

    }

    // Tarefa esclarecer solicitação
    if(WKNumstate == 49){

        var esclarecerSolic = $("#esclarecerSolic").val();

        if(esclarecerSolic == "" ){
            if (block == false) {
                scroll('esclarecerSolic');
            }
            colorBorder('esclarecerSolic');
            block = true;
        }
    }

    // Tarefa Executar tarefa
    if(WKNumstate == 27){

        var rdEncaminharSolic = $("input[name='rdEncaminharSolic']:checked").val();
        var justFinalizar = $("#justFinalizar").val();
        var motivoRevisao = $("#motivoRevisao").val();
        var apoio = $("#apoio").val();
        var apoio2 = $("#apoio2").val();
        var justApoio = $("#justApoio").val();

        if(rdEncaminharSolic == "" || rdEncaminharSolic == undefined){
            if (block == false) {
                scroll('rdEncaminharSolic');
            }
            colorBorder('rdEncaminharSolic');
            block = true;
        }

        if(rdEncaminharSolic == "finalizar" && justFinalizar == ""){
            if (block == false) {
                scroll('justFinalizar');
            }
            colorBorder('justFinalizar');
            block = true;
        }

        if(rdEncaminharSolic == "revisao" && motivoRevisao == ""){
            if (block == false) {
                scroll('motivoRevisao');
            }
            colorBorder('motivoRevisao');
            block = true;
        }

        if(rdEncaminharSolic == "transferir"){
            
            if( apoio == "" ||  apoio == null){
                if (block == false) {
                    scroll('zoomUsuario');
                }
                colorBorder('zoomUsuario');
                block = true;
            }
        
        }

        if(rdEncaminharSolic == "apoio"){
            if(apoio2 == "" || apoio2 == null){
                if (block == false) {
                    scroll('zoomApoio');
                }
                colorBorder('zoomApoio');
                block = true;
            }

            if(justApoio == "" ){
                if (block == false) {
                    scroll('justApoio');
                }
                colorBorder('justApoio');
                block = true;
            }
        }

    }

    // Tarefa Revisar
    if(WKNumstate == 9 || WKNumstate == 84){

        var rdNecAjuste = $("input[name='rdNecAjuste']:checked").val();
        var necAjuste = $("#necAjuste").val();


        if(rdNecAjuste == "" || rdNecAjuste == undefined){
            if (block == false) {
                scroll('rdNecAjuste');
            }
            colorBorder('rdNecAjuste');
            block = true;
        }

        if(rdNecAjuste == "sim" && necAjuste == ""){
            if (block == false) {
                scroll('necAjuste');
            }
            colorBorder('necAjuste');
            block = true;
        }

    }




    if (block == true) {
        throw "Necessário preencher todos os campos obrigatórios.";
    }


    function colorBorder(campo) {
        $('.' + campo).css("color", "rgb(255, 80, 80)");
        $('#' + campo).css("border-color", "rgb(255, 80, 80)");
    }

    function colorBorderPF(campo) {
      // $('#' + campo).css("color", "rgb(255, 80, 80)");
        $('#' + campo).css("border-color", "rgb(255, 80, 80)");
    } 

    function scroll(campo) {
        //campo = campo.charAt(0).toUpperCase() + campo.slice(1);
        //campo = campo.charAt(0).toUpperCase();
        console.log("--- campo: " + campo);

        var target_offset = $('.' + campo).offset();
        var target_top = target_offset.top;
        doc.animate({ scrollTop: target_top }, 1000);

    }

}