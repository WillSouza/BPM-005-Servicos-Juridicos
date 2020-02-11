
var controle = [];
var mode;
var eztecForms = {
    params: {},
    initForm: function (params) {
        this.params = params;
        var $this = this;
        mode = params.formMode;
        $(function () {
            if (params.formMode == "ADD" || params.formMode == "MOD") {
                $this.onEdit(params);
            } else {
                $this.onView(params);
            }
        });
    },
    onView: function (params) { //Visualização do formulário sem a possibilidade de edição (consulta)

        setTimeout(function () {
            $("#printBtView").css({ 'display': 'none' });
            $("#printBt").css({ 'display': 'none' });
        }, 1000);

        modeView(params.WKNumState);

    },
    onEdit: function (params) {  //Edição do formulário

        var WKNumState = params.WKNumState;
        var WKNumProces = params.WKNumProces;
        var prazoPadrao = 10;

        setHistorico(); 

        setTimeout(function () {
            $("#printBtView").css({ 'display': 'none' });
            $("#printBt").css({ 'display': 'none' });
        }, 1000);

        //alert("teste");
        console.log("### Tarefa : " + WKNumState);

        var now = new Date();
        var dateTime = FLUIGC.calendar('#prazoRevisao', {
            pickDate: true,
            pickTime: true,
            sideBySide: true,
            daysOfWeekDisabled: [0, 6],
            minDate: now

        });



        // Validação de campos Obrigatórios


        $("input[name='rdSolicOriginal']").change(function (e) {

            if ($(this).val() === 'userSolic') {

                $("#solicOriginalValid").val('1');
                $("#userOutro").val("");
                $(".solicOriginal").removeClass('has-error');

                $(".userOutro").slideUp("slow");


            } else if ($(this).val() === 'outro') {

                $("#solicOriginalValid").val('0');
                $(".solicOriginal").removeClass('has-error');

                $(".userOutro").slideDown('slow');
            }
        });       

        $("input[name='rdTipoPrazo']").change(function (e) {

            $(".alerta1").slideDown('slow');

            console.log("--- $(this).val(): "+$(this).val());
            
            if ($(this).val() != 'Determinado') {

                if($(this).val() == "Normal"){
                    prazoPadrao = 10;
                    $(".justMotiv").slideUp('slow');
                    $("#justMotiv").val('');
                }else if($(this).val() == "Importante"){
                    prazoPadrao = 5;
                    $(".justMotiv").slideUp('slow');
                    $("#justMotiv").val('');
                }else if($(this).val() == "Urgente"){
                    prazoPadrao = 3;
                    $(".justMotiv").slideDown('slow');
                    $("#justMotiv").val('');
                }

                $("#tipoPrazoValid").val('1');
                $(".tipoPrazo").removeClass('has-error');
                $(".motivoPrazoDet").addClass("hide");

                $(".prazoDeterminado").slideUp("slow");

                //$("#prazoDeterminado").val("");
                somarDiasUteis(prazoPadrao);
               


            } else if ($(this).val() === 'Determinado') {

                $("#tipoPrazoValid").val('0');
                $(".tipoPrazo").removeClass('has-error');
                $(".motivoPrazoDet").removeClass("hide");

                $(".prazoDeterminado").slideDown("slow");
                $(".justMotiv").slideUp('slow');
                $("#justMotiv").val('');

                if(WKNumState == 21){
                    console.log("--- prazo determinado tarefa 27");
                    
                    $("#prazoDeterminado").val($("#prazoDeterminado2").val());
                }

            }
        });


        $("input[name='rdMotivoPrazo']").change(function (e) {


            if ($(this).val() === 'outro') {

                $("#rdMotivoPrazoValid").val('1');
                $("#justificaPrazo").removeClass("hide");

            } else {

                $("#rdMotivoPrazoValid").val('0');
                $("#justificaPrazo").addClass("hide");
                $("#justificaPrazo").val("");
            }

            console.log("___ motivo: " + $(this).val());
            console.log("___ index:" + $("#rdMotivoPrazoValid").val());

        });

        $("input[name='rdAnaliseSolic']").change(function (e){
            console.log("--- rdAnaliseSolic: "+ $("input[name='rdAnaliseSolic']:checked").val());

            if($("input[name='rdAnaliseSolic']:checked").val() == "executar"){
                
                $(".esclarecer").slideUp('slow');
                $("#esclarecer").val('');
                $(".textFinalizar").slideUp('slow');
                $("#textFinalizar").val('');

                setTimeout(function () {
                    $(".descSolic2").slideDown('slow');
                }, 500);

            }else if($("input[name='rdAnaliseSolic']:checked").val() == "esclarecer"){
                
                $(".descSolic2").slideUp('slow');
                $("#descSolic2").val('');
                $(".textFinalizar").slideUp('slow');
                $("#textFinalizar").val('');

                setTimeout(function () {
                    $(".esclarecer").slideDown('slow');
                }, 500);
            }else{

                $(".esclarecer").slideUp('slow');
                $("#esclarecer").val('');
                $(".descSolic2").slideUp('slow');
                $("#descSolic2").val('');

                setTimeout(function () {
                    $(".textFinalizar").slideDown('slow');
                }, 500);


            }

        });

        $("#descSolic").blur(function (e){

            /* var myModal = FLUIGC.modal({
                title: 'Atenção',
                content: 'Verifique se a descrição é o suficiente para atender sua solicitação.',
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
            }); */
        });

        //Show/hide 
        $(".rdEnvRevisao").css('display', 'none');
        $(".zoomUsuario").css('display', 'none');
        $(".prazo").css('display', 'none');
        $(".zoomApoio").css('display', 'none');

        blockFields(WKNumState);


        // Tarefa Inicial
        if (WKNumState == "4" || WKNumState == "0") {

            var rdTipoPrazo = $("input[name='rdTipoPrazo']:checked").val();

            $("#showTipo").val('0');
            
           /*  if (rdTipoPrazo == undefined || rdTipoPrazo == 'prazoPadrao'){
                console.log("--- entrou no if prazoPadrao");
                somarDiasUteis(prazoPadrao);
            } */

            somarDiasUteis(prazoPadrao);
            validaGrupo();

        }

        // Tarefa Analisar Solicitação
        if (WKNumState == '21') {

            $(".panelAnalisarSolic").css("display","block");
            $("#prazoDeterminado2").val($("#prazoDeterminado").val());

           

           // var $("#panelEsclarecerSolic").val()

            console.log("--- #esclarecerSolic: "+  $("#esclarecerSolic").val());

            if( $("#esclarecerSolic").val() != "" ){
                 console.log("--- dentro do if ---");
                 
                $(".panelEsclarecerSolic").css("display","block");
                $("#esclarecerSolic").attr("readonly","readonly");
            }

            
            
            
            setTimeout(function() {
                scroll('panelAnalisarSolic');
            }, 1000); 
           

            if ($("#categoria").val() != 'Outra') {
                $(".assunto2").css('display','block');
            }

            if ($("#outraCategoria").val() != "") {
                $(".outraCategoria").css('display','block');
            }
            if ($("#outroAssunto").val() != "") {
                $(".outroAssunto").css("display","block");
            }


           

            $("input[name='rdAnaliseSolic']").removeAttr("checked");
            $("#descSolic2").val('');
            $("#esclarecer").val('');
            $("#textFinalizar").val('');


        }


        // Tarefa Executar tarefa
        if (WKNumState == '27') {
            
            setTimeout(function() {
                scroll('panelExecutarTarefa');
            }, 1000); 

            // Show Hide
           $(".panelAnalisarSolic").css("display","block");
           $(".panelExecutarTarefa").css("display","block");

            $("input[name='rdEncaminharSolic']").removeAttr("checked");
            $("#codApoio").val($("#codGrupo").val());
            
            if ($("#userOutro").val() == '') {

                $("#_userOutro").addClass('hide');
            }

            $("#motivoRevisao").val('');
            $("#codApoio").val('');
            $("#codApoio2").val('');
           // $("#apoio").val() != "" ? window['apoio'].clear() : $("#apoio").val();
           // $("#apoio2").val() != "" ? window['apoio2'].clear() : $("#apoio2").val();
            

          /*   if ($("#tipoPrazoValid").val() == "0") {

                console.log("## tipo valido 0");

                $("#prazoDeterminado").removeClass("hide");
                $(".motivoPrazoDet").removeClass("hide");

                if ($("#rdMotivoPrazoValid").val() == "1") {

                    console.log("## tipo motivo 1");
                    $("#justificaPrazo").removeClass('hide');
                }
            }
 */
            
            /* $(".saldoHoras").removeClass('hide');
            $(".prazoRevisao").removeClass('hide');
            $(".tempoDisp").removeClass('hide'); */

            //$("#prazoRevisao").val("");


            // trazer hora atual para campo 
            /* var fullDate = new Date();
            var date = fullDate.getDate().toString();

            if (date.length == 1) {
                date = 0 + date;
            }
            var mes = (fullDate.getMonth() + 1).toString();

            if (mes.length == 1) {
                mes = 0 + mes;
            }

            var hora = fullDate.getHours().toString();
            var minuto = fullDate.getMinutes().toString();

            if (hora.length == 1) {
                hora = 0 + hora;
            }

            if (minuto.length == 1) {
                minuto = 0 + minuto;
            }

            var dataHora = date + "/" + mes + "/" + fullDate.getFullYear() + " " + hora + ":" + minuto;

            $("#horaAtual").val(dataHora); */

            // Pegar prazo da tarefa
           /*  if ($("#prazoFluig").val() == "") {
                var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", WKNumProces, WKNumProces, ConstraintType.MUST);
                var d1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);

                var dataset = DatasetFactory.getDataset("processTask", null, [c1, d1], null);

                if (dataset.values.length > 0) {
                    for (var i = 0; i < dataset.values.length; i++) {

                        var deadlineDate = dataset.values[i]["deadlineDate"];
                        var deadlineHour = dataset.values[i]["deadlineHour"];

                        // Data
                        var d = new Date(deadlineDate);
                        
                        var anoDead = d.getFullYear().toString();
                        var mesDead = (d.getMonth() + 1).toString();
                        var diaDead = d.getDate().toString();


                        if (diaDead <= 9) {
                            diaDead = 0 + diaDead;
                        }

                        if (mesDead <= 9) {
                            mesDead = 0 + mesDead;
                        }
                        console.log(diaDead + "/" + mesDead + "/" + anoDead);
                        
                        /*
                        var dateSplit = deadlineDate.split("-");

                        var anoDead = dateSplit[0];
                        var mesDead = dateSplit[1];
                        var diaDead = dateSplit[2];
                        

                        // Horas
                        var horaDeadline = duas_casas(Math.round(deadlineHour / 3600));
                        var minutoDeadline = duas_casas(Math.floor((deadlineHour % 3600) / 60));
                        var horaMinutoDeadline = horaDeadline + ":" + minutoDeadline;

                        console.log("### horaMinutoDeadline: " + horaMinutoDeadline);

                        var dataHoraDead = diaDead + "/" + mesDead + "/" + anoDead + " " + horaMinutoDeadline;

                        $("#prazoFluig").val(dataHoraDead);

                    }
                }
            } */

           

            $("input[name='rdEncaminharSolic']").change(function (e) {

                console.log("--- rdEncaminharSolic : " + $("input[name='rdEncaminharSolic']:checked").val());

                if ($("input[name='rdEncaminharSolic']:checked").val() == 'transferir') {
                    $(".zoomUsuario").slideDown('slow');
                    $(".motivoRevisao").slideUp('slow');
                    $(".zoomApoio").slideUp('slow');
                    $(".justFinalizar").slideUp('slow');

                    $("#apoio").val() != "" ? window['apoio'].clear() : $("#apoio").val();
                    $("#apoio2").val() != "" ? window['apoio2'].clear() : $("#apoio2").val();
                    $("#codApoio").val('');
                    $("#codApoio2").val('');
                } else if ($("input[name='rdEncaminharSolic']:checked").val() == 'revisao') {
                    $(".motivoRevisao").slideDown('slow');
                    $(".zoomUsuario").slideUp('slow');
                    $(".zoomApoio").slideUp('slow');
                    $(".justFinalizar").slideUp('slow');

                    $("#apoio").val() != "" ? window['apoio'].clear() : $("#apoio").val();
                    $("#apoio2").val() != "" ? window['apoio2'].clear() : $("#apoio2").val();
                    $("#codApoio").val('');
                    $("#codApoio2").val('');
                } else if ($("input[name='rdEncaminharSolic']:checked").val() == 'apoio') {
                    $(".zoomApoio").slideDown('slow');
                    $(".zoomUsuario").slideUp('slow');
                    $(".motivoRevisao").slideUp('slow');
                    $(".justFinalizar").slideUp('slow');

                    $("#apoio2").val() != "" ? window['apoio2'].clear() : $("#apoio2").val();
                    $("#codApoio2").val('');
                } else {
                    $(".zoomUsuario").slideUp('slow');
                    $(".zoomApoio").slideUp('slow');
                    $(".motivoRevisao").slideUp('slow');
                    $(".justFinalizar").slideDown('slow');

                    $("#apoio").val() != "" ? window['apoio'].clear() : $("#apoio").val();
                    $("#codApoio").val('');
                    
                }

            });

        }

        if(WKNumState == 49){
            $(".panelAnalisarSolic").css("display","block");
            $(".panelEsclarecerSolic").css("display","block");

            setTimeout(function() {
                scroll('panelEsclarecerSolic');
            }, 1000); 

            if($("input[name='rdAnaliseSolic']:checked").val() == 'esclarecer'){

                $(".esclarecer").css('display','block');
            }

            if($("input[name='rdAnaliseSolic']:checked").val() == 'executar'){
                $(".descSolic2").css('display','block');
            }

            if($("#assunto").val() != ""){
                $(".assunto2").css("display","block");
            }

            if($("#outraCategoria").val() != ""){
                $(".outraCategoria ").css("display","block");
            }

            if($("#outroAssunto").val() != ""){
                $(".outroAssunto").css("display","block");
            }
        }

        // Tarefa Revisar
        if (WKNumState == '9' || WKNumState == '84') {
           
            setTimeout(function() {
                scroll('panelRevisar');
            }, 1000); 

            $(".panelAnalisarSolic").css("display","block");
            $(".panelExecutarTarefa").css("display","block");
            $(".panelRevisar").css("display","block");
           

            $("input[name='rdNecAjuste']").change(function (e) {

                if ($(this).val() === 'nao') {

                    $("#necAjusteValid").val('0');
                    $(".necAjuste").slideUp("slow");
                    $("#necAjuste").val("");

                } else if ($(this).val() === 'sim') {

                    $("#necAjusteValid").val('1');
                    $(".necAjuste").slideDown("slow");
                }
            });

           /*  if ($("#necAjusteValid").val() == "1") {
                $("#necAjuste").removeClass('hide');
            } */

            
           
            // regra para adicionar campo Nec ajuste na tabela pai-filho

           

            // Regra para inserir valor do prazo caso não estipulado em atividade anterior
          /*   if ($("#prazoRevisao").val() == "") {
                var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", WKNumProces, WKNumProces, ConstraintType.MUST);
                var d1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);

                var dataset = DatasetFactory.getDataset("processTask", null, [c1, d1], null);

                if (dataset.values.length > 0) {
                    for (var i = 0; i < dataset.values.length; i++) {

                        var deadlineDate = dataset.values[i]["deadlineDate"];
                        var deadlineHour = dataset.values[i]["deadlineHour"];

                        // Data
                        var d = new Date(deadlineDate);
                        //console.log(deadlineDate);
                        
                        // Data
                        //var dateSplit = deadlineDate.split("-");
                        
                        //var anoDead = dateSplit[0];
                        //var mesDead = dateSplit[1];
                        //var diaDead = dateSplit[2];

                        var anoDead = d.getFullYear().toString();
                        var mesDead = (d.getMonth() +1).toString();
                        var diaDead = d.getDate().toString();


                        // Horas
                        var horaDeadline = duas_casas(Math.round(deadlineHour / 3600));
                        var minutoDeadline = duas_casas(Math.floor((deadlineHour % 3600) / 60));
                        var horaMinutoDeadline = horaDeadline + ":" + minutoDeadline;

                        console.log("### horaMinutoDeadline: " + horaMinutoDeadline);

                        var dataHoraDead = diaDead + "/" + mesDead + "/" + anoDead + " " + horaMinutoDeadline;

                        $("#prazoRevisao").val(dataHoraDead);

                    }
                }
            }

            if ($("#codApoio").val() != "") {
                $("#userAtivoExecTarefa").val($("#codApoio").val());
                $("#codGrupo").val($("#codApoio").val());
            }
             */
        }

        if (WKNumState == 44) {
            
            $(".panelAnalisarSolic").css("display","block");
            $(".panelExecutarTarefa").css("display","block");

          // $("input[name='rdEncaminharSolic']").removeAttr("checked");
            $("#codApoio").val($("#codGrupo").val());
            
            var arrayApoio = $("#arrayApoio").val().split(',');

            arrayApoio.shift();

            console.log("--- Arrayapoio.length: "+ arrayApoio.length);
            
            arrayApoio.push($("#apoio2").val());

            console.log(arrayApoio);

            $("#arrayApoio").val(arrayApoio);
        }

        setTimeout(function () {
            $(".tag-text").css({ 'max-width': '100%' });
        }, 1000);

        //Regra de bloqueio de tabela pai-filho

        var tabIndex = $("#indextab").val();

        for (var z = 1; z <= tabIndex; z++) {
            $("#tab_obs___" + z).attr("readonly", "readonly");
        }

        var now = new Date();

        if (WKNumState == 0 || WKNumState == 4 || WKNumState == 49){
            var calendario = FLUIGC.calendar("#prazoDeterminado", {
                minDate: now
            });
        }   


        // Alterar cor campos

            // tab1
        $("input[name='rdTipoPrazo']").change(function(e){
            colorBorder('rdTipoPrazo');
        });

        $("#prazoDeterminado").focus(function(e){
            colorBorder('prazoDeterminado');
        });

        $("#justMotiv").focus(function(e){
            colorBorder('justMotiv');
        });

        $("input[name='rdSolicOriginal']").change(function(e){
            colorBorder('rdSolicOriginal');
        });
 
        $("#userOutro").focus(function(e){
            colorBorder('userOutro');
        });

        $("#outraParte").focus(function(e){
            colorBorder('outraParte');
        });
 
        $("#outraCategoria").focus(function(e){
            colorBorder('outraCategoria');
        });
 
        $("#outroAssunto").focus(function(e){
            colorBorder('outroAssunto');
        });
 
        $("#descSolic").focus(function(e){
            colorBorder('descSolic');
        });

        $("#outraEmpresa").focus(function(e){
            colorBorder('outraEmpresa');
        });
 
            // tab2

        $("input[name='rdAnaliseSolic']").change(function(e){
            colorBorder('rdAnaliseSolic');
        });

        $("#esclarecer").focus(function(e){
            colorBorder('esclarecer');
        });

        $("#descSolic2").focus(function(e){
            colorBorder('descSolic2');
        });
        
        $("#textFinalizar").focus(function(e){
            colorBorder('textFinalizar');
        });

            // Tab 3

        $("#esclarecerSolic").focus(function(e){
            colorBorder('esclarecerSolic');
        });

            // Tab 4
        
        $("input[name='rdEncaminharSolic']").change(function(e){
            colorBorder('rdEncaminharSolic');
        });

        $("#justFinalizar").focus(function(e){
            colorBorder('justFinalizar');
        });

        $("#motivoRevisao").focus(function(e){
            colorBorder('motivoRevisao');
        });
       
        $("#justApoio").focus(function(e){
            colorBorder('justApoio');
        });

            // Tab 5

        $("input[name='rdNecAjuste']").change(function(e){
            colorBorder('rdNecAjuste');
        });

        $("#necAjuste").focus(function(e){
            colorBorder('necAjuste');
        });
    }
};


function setSelectedZoomItem(selectedItem) {

    console.log(selectedItem);

    if (selectedItem.inputName == "empresa") {
        $(".tag-text").css({ 'max-width': '100%' });
        $("#empresa2").val(selectedItem.ORG_ST_NOME);

        colorBorder('empresa');

        if (selectedItem.ORG_ST_NOME == "OUTRA") {
            $(".outraEmpresa").slideDown('slow');
        } else {
            $(".outraEmpresa").slideUp("slow");
        }
    }

    if (selectedItem.inputName == "categoria") {

        $(".tag-text").css({ 'max-width': '100%' });
        var categoria = $("#categoria").val();

        colorBorder('categoria');

        $("#categoria2").val(selectedItem.categoria);


        if (selectedItem.categoria == "Outra") {
            $(".outraCategoria").slideDown('slow');
            $(".outroAssunto").slideDown('slow');
            $("#assunto").val('');
            $("#codGrupo").val('Pool:Group:BPM-005-Outros');
            $(".assunto2").slideUp('slow');
            $("#outroAssunto").val('');
        } else {
            $("#assunto").removeAttr('disabled', 'disabled');
            $("#outraCategoria").val('');
            $(".outraCategoria").slideUp('slow');
            $(".outroAssunto").slideUp('slow');
            $(".assunto2").slideDown('slow');
            $("#codGrupo").val('');
        }

        $("#assunto").val('');

        window["tipo"].clear();
        $(".tipo").slideUp('slow');
        $("#showTipo").val("0");


        reloadZoomFilterValues('assunto', 'categoria,' + categoria);
        //console.log("--- categoria : "+ categoria[0]);
    }

    if (selectedItem.inputName == "assunto") {

        $(".tag-text").css({ 'max-width': '100%' });
        $("#codGrupo").val(selectedItem.CODGRUPO);
        $("#assunto3").val(selectedItem.assunto);
        var assunto = selectedItem.assunto;

        colorBorder('assunto');


        if (selectedItem.assunto == "Outros") {
            $(".outroAssunto").slideDown('slow');
        } else {
            $("#outroAssunto").val('');
            $(".outroAssunto").slideUp('slow');
        }

        reloadZoomFilterValues('tipo', 'assunto,' + assunto);

        showTipo(selectedItem.assunto);
    }

    if(selectedItem.inputName == "tipo"){

        colorBorder('tipo');
        $("#codGrupo").val(selectedItem.codGrupo);
    }

    if (selectedItem.inputName == 'apoio') {
        console.log("-- selectedItem.codigo: " + selectedItem.codigo);
        // $("#codGrupo").val(selectedItem.codigo);
        var cod = selectedItem.codigo;
        $("#codGrupo").val(cod);
        $("#userAtivoExecTarefa").val(cod);

        colorBorder('zoomUsuario');        
    }

    if (selectedItem.inputName == 'apoio2') {
        var cod2 = selectedItem.codigo;
        $("#codApoio2").val(cod2);

        colorBorder('zoomApoio');
    }

}

function setZoomData(instance, value) {
    window[instance].setValue(value);
}

function duas_casas(numero) {
    if (numero <= 9) {
        numero = "0" + numero;
    }
    return numero;
}

function blurFunction() {

    //console.log("--- blurFunction ---");

    var prazoFluig = $("#prazoFluig").val();
    var prazoRevisao = $("#prazoRevisao").val();

    var prazoFluig = prazoFluig.split(" ");
    var prazoRevisao = prazoRevisao.split(" ");

    var data1 = new Date(prazoFluig[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));
    var data2 = new Date(prazoRevisao[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3'));

    if (data2 > data1) {

        $(".alert").removeClass('hide');
    } else {

        $(".alert").addClass('hide');
    }
}

function blurFunction2() {

    //console.log("--- blurFunction ---");

    if ($("#btnObs").is(':disabled')) {
        console.log("---- if blur ---");
        var indexblur = $("#indextab").val();
        indexblur--;

        $("#tab_obs___" + indexblur).val("Ajuste solicitado: " + $("#necAjuste").val() + "\nPrazo para revisão: " + $("#prazoRevisao").val());

    } else {

        console.log("---- else blur ---");
        $("#tab_obs___" + $("#indextab").val()).val("Ajuste solicitado: " + $("#necAjuste").val() + "\nPrazo para revisão: " + $("#prazoRevisao").val());
    }

}

function focusFunction() {

    if ($("#btnObs").is(':disabled')) {

        console.log("---- if focus ---");

        var indexfocus = $("#indextab").val();
        indexfocus--;

        $("#tab_obs___" + indexfocus).val("");
    } else {
        console.log("---- else focus ---");
        $("#tab_obs___" + $("#indextab").val()).val("");
    }
}

function somarDiasUteis(prazoPadrao){
    
    var now = new Date();

    for(var x = 1; x <= prazoPadrao; x++){
        
        if (now.getDay() == 6 || now.getDay() == 0){
            now.setDate(now.getDate() + 1);
            x--;
        }else{
            now.setDate(now.getDate() + 1);            
        }
    }

    if (now.getDay() == 6 ){
        now.setDate(now.getDate() + 2);
    } else if (now.getDay() == 0){
        now.setDate(now.getDate() + 1);
    }

    var dia = duas_casas(now.getDate());
    var mes = duas_casas(now.getMonth()+1);
    var ano = now.getFullYear();
    
    $("#prazoDeterminado").val(dia + "/" + mes + "/" + ano);
    console.log("--- prazoDeterminado: " + $("#prazoDeterminado").val());
    
}

function showTipo(assunto){

    let c1 = DatasetFactory.createConstraint('assunto', assunto, assunto, ConstraintType.MUST);
    let dataset = DatasetFactory.getDataset("BPM-005-Tipo", null, [c1], null);

    if (dataset.values.length > 0) {

        $("#showTipo").val("1");
        
        for(let i = 0; i<dataset.values.length; i++){

            let dsAssunto = dataset.values[i]["assunto"];
           
            if(assunto == dsAssunto){
                $(".tipo").slideDown('slow');

            }
        }
    }else{
        $(".tipo").slideUp('slow');
        $("#showTipo").val("0");
        window['tipo'].clear();
    }
}

function validaGrupo(){

    var codSolic = $("#codSolicitante").val();
    var codGrupo = "BPM-005-Juridico";

    var c1 = DatasetFactory.createConstraint("colleagueGroupPK.groupId", codGrupo, codGrupo, ConstraintType.MUST);

    var dataset = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

    //console.log(" -- Dataset length: "+ dataset.values.length);

    for(var i=0;i < dataset.values.length;i++){

        if( dataset.values[i]["colleagueGroupPK.colleagueId"] == codSolic){
            console.log("--- Usuário participa do grupo-- ");
           
        }
    }
}

function setHistorico() {
    // console.log("SETHISTORICO()");
    // console.log("-- Mode: " + mode);

    let ultimaAtt = mode == "VIEW" ? $("span#ultimaAtualizacao").html() : $("textarea#ultimaAtualizacao").val();
    let historico = mode == "VIEW" ? $("span#historico").html() : $("textarea#historico").val();

    // console.log("-- ultimaAtt: " + ultimaAtt);
    // console.log("-- historico: " + historico);

    if (ultimaAtt != "") {
        //  console.log('setHistorico 1º if');
        ultimaAtt = ultimaAtt.replace(/(?:\r\n|\r|\n)/g, '<br>');
        $("#dv_ultimaAtualizacao").html(ultimaAtt);
    }
    if (historico != "") {
        //    console.log('setHistorico 2º if');
        historico = historico.replace(/(?:\r\n|\r|\n)/g, '<br>');
        $("#dv_historico").html(historico);
    }
    $("button#btn-historico").click(function () {
        let $dvHist = $("#dv_historico");
        if ($dvHist.is(":visible")) {
            $(this).html("Ver Mais");
            $dvHist.slideUp("slow");
        } else {
            $(this).html("Ocultar");
            $dvHist.slideDown("slow");
        }
    });
}

function scroll(campo) {
    var doc = $('html, body');

    console.log("--- scroll ---");
    

    //campo = campo.charAt(0).toUpperCase() + campo.slice(1);
   
    var target_offset = $('.' + campo).offset();
    var target_top = target_offset.top;
    doc.animate({ scrollTop: target_top }, 1000);

}

function colorBorder(campo) {
    //reloadCSS();
    $('.' + campo).css("color", "");
    $('#' + campo).css("border-color", "");
}

function colorBorderPF(campo) {
    $('#' + campo.id).css("border-color", "");
    $('#lb' + campo.id).css("color", "");
}