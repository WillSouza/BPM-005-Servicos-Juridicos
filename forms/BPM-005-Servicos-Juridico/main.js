var myLoading2  = FLUIGC.loading(window);
var carregaProg = FLUIGC.loading("#home");
var carregaConf = FLUIGC.loading("#menu1");

var controle = [];
var eztecForms = {
        params: {},
        initForm: function(params) {    
            this.params = params;
            var $this = this;   
            $(function () {
                if (params.formMode == "ADD" || params.formMode == "MOD") { 
                    $this.onEdit(params);
                } else {
                    $this.onView(params);
                }
            });
        },
        onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

        },
        onEdit: function(params) {  //Edição do formulário
           
           var WKNumState = params.WKNumState;
           var WKNumProces = params.WKNumProces;
           
           //alert("teste");
           console.log("### Tarefa : "+WKNumState);
              	
           var now = new Date();
            var dateTime =  FLUIGC.calendar('#prazoRevisao', {
                pickDate: true,
                pickTime: true,
                sideBySide: true,
                daysOfWeekDisabled: [0,6],
                minDate: now
            
            });

            

           // Validação de campos Obrigatórios


            $("input[name='rdSolicOriginal']").change(function(e){

                if($(this).val() === 'userSolic'){

                    $("#solicOriginalValid").val('1');
                    $("#userOutro").addClass("hide");
                    $("#userOutro").val("");

                    $(".solicOriginal").removeClass('has-error');


                } else if($(this).val() === 'outro'){

                    $("#solicOriginalValid").val('0');
                    $("#userOutro").removeClass("hide");
                    $(".solicOriginal").removeClass('has-error');
                }
            });

            $("#prioridade").change(function(e){

                console.log("--- Change ---");

                if($(this).val() === '1'){

                    $("#prioridade2").val("Importante e urgente");
                
                }else if($(this).val() == '2'){

                    $("#prioridade2").val("Importante");    
                
                }else if($(this).val() == '3'){

                    $("#prioridade2").val("Urgente");    
                
                }else if($(this).val() == '4'){

                    $("#prioridade2").val("Normal");    
                
                }else if($(this).val() == '0'){

                    $("#prioridade2").val("");    
                }

            });

            $("input[name='rdTipoPrazo']").change(function(e){

                console.log("___ prazo: "+$(this).val());
                if($(this).val() === 'prazoPadrao'){

                    $("#tipoPrazoValid").val('1');
                    $("#prazoDeterminado").addClass("hide");
                    $("#prazoDeterminado").val("");
                    $(".tipoPrazo").removeClass('has-error');
                    $(".motivoPrazoDet").addClass("hide");

                } else if($(this).val() === 'determinado'){

                    $("#tipoPrazoValid").val('0');
                    $("#prazoDeterminado").removeClass("hide");
                    $(".tipoPrazo").removeClass('has-error');
                    $(".motivoPrazoDet").removeClass("hide");

                }
            });


            $("input[name='rdMotivoPrazo']").change(function(e){


                if($(this).val() === 'outro'){

                    $("#rdMotivoPrazoValid").val('1');
                    $("#justificaPrazo").removeClass("hide");

                } else {

                    $("#rdMotivoPrazoValid").val('0');
                    $("#justificaPrazo").addClass("hide");
                    $("#justificaPrazo").val("");
                }

                 console.log("___ motivo: "+$(this).val());
                console.log("___ index:"+ $("#rdMotivoPrazoValid").val());
                
            });



            // Tarefa Inicial
            if(WKNumState == "4" || WKNumState == "0" ){

                console.log("ENTROU NO IF Tarefa Inicial");

                $("#userOutro").addClass('hide');
                
            
            }
            
            // Tarefa Analisar Solicitação
            if(WKNumState == '21'){

                $(".anotJuridico").removeClass('hide');
                $("#descSolic").attr('readonly','readonly');

                if($("#outraEmpresa").val() != ""){
                    $("#outraEmpresa").removeClass("hide");
                }

                if ($("#userOutro").val() == ''){
                    
                    $("#_userOutro").addClass('hide');
                }

                 if($("input[name='rdTipoPrazo']").val() === 'prazoPadrao'){

                  
                    $("#prazoDeterminado").addClass("hide");
                    $(".motivoPrazoDet").addClass("hide");

                } else if($("input[name='rdTipoPrazo']").val() === 'determinado'){

                  
                    $("#prazoDeterminado").removeClass("hide");
                    $(".motivoPrazoDet").removeClass("hide");

                }



                if($("#categoria").val() != 'Outra'){
                    $(".assunto2").removeClass('hide');
                }

                if($("#outraCategoria").val() != ""){
                    $(".outraCategoria").removeClass('hide');
                }
                if($("#outroAssunto").val() != ""){
                    $(".outroAssunto").removeClass('hide');
                }

                if($("#tipoPrazoValid").val() == "0"){
                    $("#prazoDeterminado").removeClass("hide");
                    $(".motivoPrazoDet").removeClass("hide");

                    if($("#rdMotivoPrazoValid").val() == "1"){

                        $("#justificaPrazo").removeClass('hide');
                    }
                }

            }


            // Tarefa Executar tarefa
            if(WKNumState == '27'){

                // Show Hide
                $("#userOutro").attr("readonly","readonly");
                $("#prazoDeterminado").attr("readonly","readonly");
                $("#justificaPrazo").attr("readonly","readonly");
                $("#prioridade").attr("readonly","prioridade");
                $("#outraParte").attr("readonly","readonly");
                
                if($("#outraEmpresa").val() != ""){
                    $("#outraEmpresa").removeClass("hide");
                }

                $(".anotJuridico").removeClass('hide');
                $("#descSolic").attr('readonly','readonly');

                if ($("#userOutro").val() == ''){
                    
                    $("#_userOutro").addClass('hide');
                }

                if($("#categoria").val() != 'Outra'){
                    $(".assunto2").removeClass('hide');
                }

                if($("#outraCategoria").val() != ""){
                    $(".outraCategoria").removeClass('hide');
                }
                if($("#outroAssunto").val() != ""){
                    $(".outroAssunto").removeClass('hide');
                }

                if($("#tipoPrazoValid").val() == "0"){

                    console.log("## tipo valido 0");

                    $("#prazoDeterminado").removeClass("hide");
                    $(".motivoPrazoDet").removeClass("hide");

                    if($("#rdMotivoPrazoValid").val() == "1"){

                        console.log("## tipo motivo 1");
                        $("#justificaPrazo").removeClass('hide');
                    }
                }

                $(".saldoHoras").removeClass('hide');
                $(".prazoRevisao").removeClass('hide');
                $(".tempoDisp").removeClass('hide');

                /*if($("#necAjusteValid").val() != ""){

                    $(".necAjuste").removeClass('hide');

                    if($("#necAjusteValid").val() == "1"){

                        $("#necAjuste").removeClass("hide");
                        $("#necAjuste").attr('readonly','readonly');
                    }
                }*/

                $("#prioridade").addClass('hide');
                $("#prioridade2").removeClass('hide');

                $(".empresa").addClass("hide");
                $("#empresa2").removeClass("hide");

                $(".categoria").addClass("hide");
                $("#categoria2").removeClass("hide");

                $(".assunto").addClass("hide");
                $("#assunto3").removeClass("hide");

                $("#outroAssunto").attr("readonly","readonly");
                $("#outraCategoria").attr("readonly","readonly");

                if($("#outraCategoria").val() != ""){
                    $("#outraCategoria").removeClass("hide");
                }

                if($("#outroAssunto").val() != ""){
                    $("#outroAssunto").removeClass("hide");
                }

                $(".saldoHoras").removeClass('hide');
                $(".prazoRevisao").removeClass('hide');
                $(".tempoDisp").removeClass('hide');

                $("#prazoRevisao").val("");


                // trazer hora atual para campo 
                var fullDate = new Date();
                var date = fullDate.getDate().toString();
                
                if(date.length == 1){
                    date = 0+date;
                }
                var mes = (fullDate.getMonth()+1).toString();
            
                if(mes.length == 1){
                    mes = 0+mes;
                }

                var hora = fullDate.getHours().toString();
                var minuto = fullDate.getMinutes().toString();
                
                if(hora.length == 1){
                    hora = 0+hora;
                }

                if(minuto.length == 1){
                    minuto = 0+minuto;
                }

                var dataHora = date+"/"+mes+"/"+fullDate.getFullYear() +" "+hora+ ":"+minuto;
 
                $("#horaAtual").val(dataHora);

                // Pegar prazo da tarefa
                if($("#prazoFluig").val() == ""){
                    var c1 = DatasetFactory.createConstraint("processTaskPK.processInstanceId", WKNumProces, WKNumProces, ConstraintType.MUST);
                    var d1 = DatasetFactory.createConstraint("active", true, true, ConstraintType.MUST);

                    var dataset= DatasetFactory.getDataset("processTask", null, [c1,d1], null);

                    if(dataset.values.length > 0 ){
                        for(var i = 0; i < dataset.values.length; i++) {
                            
                            var deadlineDate = dataset.values[i]["deadlineDate"];
                            var deadlineHour = dataset.values[i]["deadlineHour"];
                            
                            // Data
                            var dateSplit = deadlineDate.split("-");

                            var anoDead = dateSplit[0];
                            var mesDead = dateSplit[1];
                            var diaDead = dateSplit[2];


                            // Horas
                            var horaDeadline = duas_casas(Math.round(deadlineHour/3600));
                            var minutoDeadline = duas_casas(Math.floor((deadlineHour%3600)/60));
                            var horaMinutoDeadline = horaDeadline+":"+minutoDeadline;
                            
                            console.log("### horaMinutoDeadline: "+horaMinutoDeadline);     

                            var dataHoraDead = diaDead+"/"+mesDead+"/"+anoDead +" "+horaMinutoDeadline; 

                            $("#prazoFluig").val(dataHoraDead);
                            
                        }
                    }    
                } 

                  
            }

            // Tarefa Revisar
            if(WKNumState == '9'){

                console.log("teste tarefa 9");

                $("#userOutro").attr("readonly","readonly");
                $("#prazoDeterminado").attr("readonly","readonly");
                $("#justificaPrazo").attr("readonly","readonly");
                $("#outraParte").attr("readonly","readonly");

                $("input[name='rdNecAjuste']").removeAttr("checked");
                $("#necAjuste").val("");
                $("#necAjusteValid").val("");
                
                $("#descSolic").attr("readonly","readonly");
                
                $("#prioridade").addClass('hide');
                $("#prioridade2").removeClass('hide');

                $(".empresa").addClass("hide");
                $("#empresa2").removeClass("hide");

                $(".categoria").addClass("hide");
                $("#categoria2").removeClass("hide");

                $(".assunto").addClass("hide");
                $("#assunto3").removeClass("hide");

                $("#outroAssunto").attr("readonly","readonly");
                $("#outraCategoria").attr("readonly","readonly");

                if($("#outraCategoria").val() != ""){
                    $("#outraCategoria").removeClass("hide");
                }

                if($("#outroAssunto").val() != ""){
                    $("#outroAssunto").removeClass("hide");
                }
            
                $(".necAjuste").removeClass('hide');

                if( $("input[name='rdNecAjuste']").val() == 'sim'){
                    $("#necAjuste").removeClass("hide");
                }

                if($("#outraEmpresa").val() != ""){
                    $("#outraEmpresa").removeClass("hide");
                }

                $("input[name='rdNecAjuste']").change(function(e){

                    if($(this).val() === 'nao'){

                        $("#necAjusteValid").val('0');
                        $("#necAjuste").addClass("hide");
                        $("#necAjuste").val("");

                    } else if($(this).val() === 'sim'){

                        $("#necAjusteValid").val('1');
                        $("#necAjuste").removeClass("hide");
                    }
                });

                if($("#necAjusteValid").val() == "1"){
                    $("#necAjuste").removeClass('hide');
                }

                if($("#tipoPrazoValid").val() == "0"){
                    $("#prazoDeterminado").removeClass("hide");
                    $(".motivoPrazoDet").removeClass("hide");

                    if($("#rdMotivoPrazoValid").val() == "1"){

                        $("#justificaPrazo").removeClass('hide');
                    }
                }

                // regra para adicionar campo Nec ajuste na tabela pai-filho

                 respbtn2()

            }

            setTimeout(function(){
                $(".tag-text").css({'max-width': '100%'});
            }, 1000);

            //Regra de bloqueio de tabela pai-filho

            var tabIndex = $("#indextab").val();

            for( var z = 1; z <= tabIndex; z++){
                $("#tab_obs___"+z).attr("readonly","readonly");    
            }

            var now = new Date();

            var calendario = FLUIGC.calendar("#prazoDeterminado",{
                minDate: now
            });

             
        }                           
};


function setSelectedZoomItem(selectedItem) {     

    console.log(selectedItem);

    if(selectedItem.inputName == "empresa"){
        $(".tag-text").css({'max-width': '100%'});
        $("#empresa2").val(selectedItem.ORG_ST_NOME);

        if(selectedItem.ORG_ST_NOME == "OUTRA"){
            $(".outraEmpresa").removeClass("hide");
        }else{
            $(".outraEmpresa").addClass("hide");
        }
    }

    if(selectedItem.inputName == "categoria"){

        $(".tag-text").css({'max-width': '100%'});
        var categoria = $("#categoria").val();

        $("#categoria2").val(selectedItem.categoria);


        if(selectedItem.categoria == "Outra"){
            $(".outraCategoria").removeClass('hide');
            $(".outroAssunto").removeClass('hide');
            $("#assunto").val('');
            $("#codGrupo").val('Pool:Group:BPM-005-JURI_grupo_18');
            $(".assunto2").addClass('hide');
            $("#outroAssunto").val('');
        }else{
            $("#assunto").removeAttr('disabled','disabled');
            $("#outraCategoria").val('');
            $(".outraCategoria").addClass('hide');
            $(".outroAssunto").addClass('hide');
            $(".assunto2").removeClass('hide');
            $("#codGrupo").val('');
        }

        $("#assunto").val('');

      
        reloadZoomFilterValues('assunto', 'categoria,' +categoria );
        //console.log("--- categoria : "+ categoria[0]);
    }

    if(selectedItem.inputName == "assunto"){

        $(".tag-text").css({'max-width': '100%'});
        $("#codGrupo").val(selectedItem.CODGRUPO);
        $("#assunto3").val(selectedItem.assunto);

        if(selectedItem.assunto == "Outros"){
            $(".outroAssunto").removeClass('hide');
        }else{
            $("#outroAssunto").val('');
            $(".outroAssunto").addClass('hide');
        }
    }
   
}

function duas_casas(numero){
    if (numero <= 9){
        numero = "0"+numero;
    }
    return numero;
}

function blurFunction(){

    //console.log("--- blurFunction ---");

    var prazoFluig = $("#prazoFluig").val();
    var prazoRevisao = $("#prazoRevisao").val();

    var prazoFluig = prazoFluig.split(" ");
    var prazoRevisao = prazoRevisao.split(" ");

    var data1 = new Date(prazoFluig[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3'));
    var data2 = new Date(prazoRevisao[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/,'$2/$1/$3'));

    if(data2 > data1){
       
        $(".alert").removeClass('hide');
    }else{

        $(".alert").addClass('hide');
    }
}

function blurFunction2(){

    //console.log("--- blurFunction ---");

    if($("#btnObs").is(':disabled')){
        console.log("---- if blur ---");
        var indexblur = $("#indextab").val();
        indexblur--;

        $("#tab_obs___"+indexblur).val("Ajuste solicitado: "+$("#necAjuste").val());
    
    }else{

        console.log("---- else blur ---");
        $("#tab_obs___"+$("#indextab").val()).val("Ajuste solicitado: "+$("#necAjuste").val());
    }

}

function focusFunction(){
    
    if($("#btnObs").is(':disabled')){

        console.log("---- if focus ---");

         var indexfocus = $("#indextab").val();
        indexfocus--;

        $("#tab_obs___"+indexfocus).val("");
    }else{
        console.log("---- else focus ---");
        $("#tab_obs___"+$("#indextab").val()).val("");
    }    
}


// Função para criar linhas na tabela 
function respbtn(){

    wdkAddChild('tabObs');

     var index = $("#indextab").val();

    index++;

    $("#indextab").val(index);

    $("#btnObs").attr("disabled",'disabled');


    var now = new Date();
    // console.log("FRE..." + now.getDay());
    
    var nowDate     = now.getDate();
    var nowMonth = now.getMonth() + 1;
    var nowYear     = now.getFullYear();
    
    if(nowMonth < 10){
        nowMonth = "0"+nowMonth;
    }
    
    if(nowDate < 10){
        nowDate = "0"+nowDate;
    }

    var hora = now.getHours().toString();
    var minuto = now.getMinutes().toString();
    
    if(hora.length == 1){
        hora = 0+hora;
    }

    if(minuto.length == 1){
        minuto = 0+minuto;
    }

  //  var dataHora = date+"/"+mes+"/"+fullDate.getFullYear() +" "+hora+ ":"+minuto;

    //console.log("--- index :"+ index);
    $("#tab_data___"+index).val(nowDate+"/"+nowMonth+"/"+nowYear+" "+hora+":"+minuto);
    $("#tab_autor___"+index).val($("#userAtivo").val());
    
    //console.log("#### validaData - Dia: "+ nowDate + " Mês: "+nowMonth + " Ano: "+nowYear);

}

function respbtn2(){

    wdkAddChild('tabObs');

     var index = $("#indextab").val();

    index++;

    $("#indextab").val(index);

   // $("#btnObs").attr("disabled",'disabled');


    var now = new Date();
    // console.log("FRE..." + now.getDay());
    
    var nowDate     = now.getDate();
    var nowMonth = now.getMonth() + 1;
    var nowYear     = now.getFullYear();
    
    if(nowMonth < 10){
        nowMonth = "0"+nowMonth;
    }
    
    if(nowDate < 10){
        nowDate = "0"+nowDate;
    }

    var hora = now.getHours().toString();
    var minuto = now.getMinutes().toString();
    
    if(hora.length == 1){
        hora = 0+hora;
    }

    if(minuto.length == 1){
        minuto = 0+minuto;
    }

  //  var dataHora = date+"/"+mes+"/"+fullDate.getFullYear() +" "+hora+ ":"+minuto;

    //console.log("--- index :"+ index);
    $("#tab_data___"+index).val(nowDate+"/"+nowMonth+"/"+nowYear+" "+hora+":"+minuto);
    $("#tab_autor___"+index).val($("#userAtivo").val());


    $("#tab_obs___"+index).addClass("hide");
    $("#tab_data___"+index).addClass("hide");
    $("#tab_autor___"+index).addClass("hide");
    

    //console.log("#### validaData - Dia: "+ nowDate + " Mês: "+nowMonth + " Ano: "+nowYear);

}