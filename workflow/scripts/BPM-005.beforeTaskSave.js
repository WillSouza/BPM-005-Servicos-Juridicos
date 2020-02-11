function beforeTaskSave(colleagueId,nextSequenceId,userList){

    var WKNextState = getValue("WKNextState");
    var WKNumState = getValue("WKNumState");
    var folder = hAPI.getCardValue('folder');
    
    if(WKNumState == 27 && folder == ""){

        var empresa = hAPI.getCardValue('empresa');
        var outraEmpresa = hAPI.getCardValue('outraEmpresa');
        var outraParte = hAPI.getCardValue('outraParte');
        var categoria = hAPI.getCardValue('categoria');
        var outraCategoria = hAPI.getCardValue('outraCategoria');
        var assunto = hAPI.getCardValue('assunto');
        var outroAssunto = hAPI.getCardValue('outroAssunto');
        var solicitante = hAPI.getCardValue('solicitante');
        var outroSolic = hAPI.getCardValue('userOutro');

        if(empresa == "OUTRA"){
            empresa = outraEmpresa;
        }

        if(categoria == "Outra"){
            categoria = outraCategoria;
        }

        if(assunto == "Outros"){
            assunto = outroAssunto;
        }

        if(outroSolic != ""){
            solicitante = outroSolic;
        }


        log.info("*** CRIAÇÃO DE PASTA");
  
        // * Número da pasta principal que vai receber os arquivos
       //  --------------------------------------------------------- 
        var GEDparent = 286338; //adapte para a sua situação
       // var GEDparent = 17; //adapte para a sua situação
      
        
        // * Cria pasta dentro da pasta pai
        // ---------------------------------------------------- 
      
        var nome_pasta = getValue("WKNumProces")+" - "+ empresa +" - "+ outraParte +" - "+ categoria +" - " + assunto+ " - "+ solicitante; //adapte para sua situação
      
        var dto = docAPI.newDocumentDto();
        dto.setDocumentDescription(nome_pasta);
        dto.setDocumentType("1");
        dto.setParentDocumentId(GEDparent);
        dto.setDocumentTypeId("");
        /* dto.setColleagueId('servico_fluig');
        dto.setPublisherId('servico_fluig');  */
        dto.setColleagueId('oauth_admin_key');
        dto.setPublisherId('oauth_admin_key'); 
      
        var folder = docAPI.createFolder(dto, null, null);
      
        var gedNewParentId = folder.getDocumentId();
        hAPI.setCardValue('folder', folder.getDocumentId());

        log.info("**** PASTA CRIADA COM SUCESSO *****");
    }    

    if (WKNextState == 47 && hAPI.getCardValue('rdAnaliseSolic') == 'esclarecer'){

        var esclarecer = hAPI.getCardValue('esclarecer');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Solicitado esclarecimento por motivo de:\n" + esclarecer + "\n\n" + obsHistorico);
   
    }

    if (WKNextState == 47 && hAPI.getCardValue('rdAnaliseSolic') == 'finalizar'){

        var textFinalizar = hAPI.getCardValue('textFinalizar');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Finalizado solicitação por motivo de:\n" + textFinalizar + "\n\n" + obsHistorico);
   
    }

    if (WKNumState == 49 && WKNextState == 21){

        var esclarecerSolic = hAPI.getCardValue('esclarecerSolic');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Esclarecimento:\n" + esclarecerSolic + "\n\n" + obsHistorico);
   
    }

    if (WKNextState == 37 && hAPI.getCardValue('rdEncaminharSolic') == 'revisao'){

        var motivoRevisao = hAPI.getCardValue('motivoRevisao');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Solicitado revisão por motivo de:\n" + motivoRevisao + "\n\n" + obsHistorico);
   
    }

    if (WKNextState == 13 && hAPI.getCardValue('rdNecAjuste') == 'sim'){

        var necAjuste = hAPI.getCardValue('necAjuste');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Solicitado ajuste por motivo de:\n" + necAjuste + "\n\n" + obsHistorico);
   
    }
   
    if (WKNextState == 37 && hAPI.getCardValue('rdEncaminharSolic') == 'apoio'){

        var justApoio = hAPI.getCardValue('justApoio');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Solicitado apoio por motivo de:\n" + justApoio + "\n\n" + obsHistorico);
   
    }

    if (WKNumState == 37 && WKNextState == 27 ){

        
        var userAtivo = hAPI.getCardValue('userAtivo');
        var apoio = hAPI.getCardValue('apoio');
        var obsHistorico = hAPI.getCardValue('obsHistorico');

        hAPI.setCardValue('obsHistorico', "Solicitação transferida do usuário "+userAtivo+" para o usuário "+apoio+".");
   
    }
	
    atualizaHistorico("obsHistorico");

       var WKNextState = getValue("WKNextState");
       var WKNumState = getValue("WKNumState");
}

function atualizaHistorico(name) {
   if (name == "") { return; }
   var mensagem = hAPI.getCardValue(name);

   if (mensagem == null || mensagem == "") {
       return;
   }

   log.info('#### WKNumState: '+ getValue('WKNumState'));
   var WKNumState = getValue("WKNumState") ;
   var WKNextState = getValue("WKNextState") ;
   var atividadeCorrente =  hAPI.getCardValue("atividadeCorrente");
   var ultimaAtualizacao = hAPI.getCardValue("ultimaAtualizacao") == "" ? "" : hAPI.getCardValue("ultimaAtualizacao");
   var historico = hAPI.getCardValue("historico") == "" ? "" : hAPI.getCardValue("historico");

   if (WKNumState == '2'){
       log.info('### Dentro do if atividadeCorrente ###### ');	
       atividadeCorrente = 'Início';
   }

   log.info('### atividadeCorrente: ' + atividadeCorrente);

   var usuarioLogado = "";
   try {
       usuarioLogado = usuario();
   } catch (err) {
       usuarioLogado = "Erro ao buscar usuário";
   }

   var htmlHistoricoNovo = "Tarefa: " + atividadeCorrente +" - "+ dataHoraAtual() + " - " + usuarioLogado + " \r\n" + mensagem + "\r\n \r\n";

   hAPI.setCardValue("ultimaAtualizacao", htmlHistoricoNovo);

   hAPI.setCardValue("historico", ultimaAtualizacao + historico);
   hAPI.setCardValue(name, "");
}

function dataHoraAtual() {
   var dt = new Date();
   var txtData = (dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate()) + "/" + ((dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1)) + "/" + dt.getFullYear() + " - " + (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) + ":" + (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes());
   return txtData;
}

function usuario() {

   var usuario = getValue('WKReplacement') != "" && getValue('WKReplacement') != null ? getValue('WKReplacement') : getValue("WKUser");

   var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", usuario, usuario, ConstraintType.MUST);
   var dsUser = DatasetFactory.getDataset("colleague", ["colleagueName"], [c1], null);
   return dsUser.getValue(0, "colleagueName");
}
