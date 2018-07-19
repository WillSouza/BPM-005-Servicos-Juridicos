function afterTaskCreate(colleagueId){

    var atividade = getValue('WKCurrentState');
    var WKNextState = getValue("WKNextState");
    var WKNumState = getValue("WKNumState");

    // Atividade de sequência 5 é a da tarefa criada e que vou alterar o prazo de conclusão
    
    log.info("&&& WKNextState: "+ WKNextState);
  
    if (atividade == 21 || atividade == 27) {

        log.info("### afterTaskCreate");


        var assunto = hAPI.getCardValue('assunto');
        var outroAssunto = hAPI.getCardValue('outroAssunto');

        if(outroAssunto == ""){
            hAPI.setCardValue("ident", assunto );
        }else if(outroAssunto != "" ){
            hAPI.setCardValue("ident", assunto+" - "+ outroAssunto);
        }

        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('prazoDeterminado');
        if (prazoFormulario != undefined && prazoFormulario != '') {
           


            var prazoFormularioData = prazoFormulario.split(" ");



            log.info("### entrou no if");    

            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
             
            /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
               mudando assim as posições das informações dentro do array */
             
            /* Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript */
            var arrayPrazoConclusao = prazoFormularioData[0].split("/");
            var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
            var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
            var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
             

            var dataDoPrazo = new Date();
            dataDoPrazo.setDate(dia);
            dataDoPrazo.setMonth(mes);
            dataDoPrazo.setFullYear(ano);
           
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, 64800);

             log.info("### depois do setDueDate");
        }else{
            
        }
    } 

    if(WKNextState == 21){


        log.info("### Next WKNextState 21 ");
        var assunto = hAPI.getCardValue('assunto');
        var outroAssunto = hAPI.getCardValue('outroAssunto');

        if(outroAssunto == ""){
            hAPI.setCardValue("ident", assunto );
        }else if(outroAssunto != "" ){
            hAPI.setCardValue("ident", assunto+" - "+ outroAssunto);
        }

        log.info("### assunto :"+ assunto);
        log.info("### outroAssunto :"+ outroAssunto);
         
    }

    if (atividade == 9) {

        log.info("### afterTaskCreate");
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('prazoRevisao');
        if (prazoFormulario != undefined && prazoFormulario != '') {
           
            var prazoFormularioData = prazoFormulario.split(" ");

            log.info("### entrou no if");    

            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
             
            /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
               mudando assim as posições das informações dentro do array */
             
            /* Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript */
            var arrayPrazoConclusao = prazoFormularioData[0].split("/");
            var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
            var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
            var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
             

             log.info("### data : "+ dia+"/"+(mes+1)+"/"+ano);

            var arrayHora = prazoFormularioData[1].split(":");

            var hora = arrayHora[0];
            var minuto = arrayHora[1];

            log.info("### hora : "+hora+':'+minuto);

            var minutoDoPrazo = (minuto / 60);

            var horaMinuto = parseFloat(hora) + parseFloat(minutoDoPrazo);

            log.info("### Hora c minuto: "+ horaMinuto);
            var horaDoPrazo = (horaMinuto*60*60) ; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja, 
            o prazo de conclusão vai ser até o último segundo do dia informado no formulário */


            log.info("### horaDoPrazo: "+horaDoPrazo);
            // Cria a data no Javascript
            var dataDoPrazo = new Date();
            dataDoPrazo.setDate(dia);
            dataDoPrazo.setMonth(mes);
            dataDoPrazo.setFullYear(ano);
             
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
        }
    }  

    if(WKNumState == 13 && WKNextState == 27){

        log.info("### afterTaskCreate");
        // Recuperando a data informada no campo do formulário
        var prazoFormulario = hAPI.getCardValue('prazoFluig');
        if (prazoFormulario != undefined && prazoFormulario != '') {
           
            var prazoFormularioData = prazoFormulario.split(" ");

            log.info("### entrou no if");    

            var numeroDaSolicitacao = getValue('WKNumProces');
            var threadDaSolicitacao = 0; // Normalmente 0, quando não for atividade paralela
            var responsavelPelaTarefa = colleagueId;
             
            /* Nesse caso o formato da data salva pelo formulário no exemplo é DD/MM/AAAA, mas isso pode variar de acordo com a formatação utilizada, 
               mudando assim as posições das informações dentro do array */
             
            /* Extrai os dados da data do formulário para um array, para posteriormente transformar em data do Javascript */
            var arrayPrazoConclusao = prazoFormularioData[0].split("/");
            var dia = arrayPrazoConclusao[0]; // Posição 0 do array é o dia
            var mes = arrayPrazoConclusao[1] - 1; // Posição 1 do array é o mês (Subtraímos 1 porque na data do Javascript o mês vai de 0 a 11)
            var ano = arrayPrazoConclusao[2]; // Posição 2 do array é o ano
             

             log.info("### data : "+ dia+"/"+(mes+1)+"/"+ano);

            var arrayHora = prazoFormularioData[1].split(":");

            var hora = arrayHora[0];
            var minuto = arrayHora[1];

            log.info("### hora : "+hora+':'+minuto);

            var minutoDoPrazo = (minuto / 60);

            var horaMinuto = parseFloat(hora) + parseFloat(minutoDoPrazo);

            log.info("### Hora c minuto: "+ horaMinuto);
            var horaDoPrazo = (horaMinuto*60*60) ; /* A hora é em milisegundos, e esse cálculo tem resultado de 23:59:59, ou seja, 
            o prazo de conclusão vai ser até o último segundo do dia informado no formulário */


            log.info("### horaDoPrazo: "+horaDoPrazo);
            // Cria a data no Javascript
            var dataDoPrazo = new Date();
            dataDoPrazo.setDate(dia);
            dataDoPrazo.setMonth(mes);
            dataDoPrazo.setFullYear(ano);
             
            // Altera o prazo de conclusão
            hAPI.setDueDate(numeroDaSolicitacao, threadDaSolicitacao, responsavelPelaTarefa, dataDoPrazo, horaDoPrazo);
        }

    }	
}
