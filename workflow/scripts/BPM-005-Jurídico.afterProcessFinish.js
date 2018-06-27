function afterProcessFinish(processId){
	
	log.info("### afterProcessFinish");
     var server = "http://fluigdev.eztec.com.br";
	
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

     // TESTE DE CRIAÇÂO DE PASTA

     log.info("*** TESTE CRIAÇÃO DE PASTA");
     
     // * Número da pasta principal que vai receber os arquivos
    //  --------------------------------------------------------- 
     var GEDparent = 57; //adapte para a sua situação

     
     // * Cria pasta dentro da pasta pai
     // ---------------------------------------------------- 

     var nome_pasta = getValue("WKNumProces")+" - "+ empresa +" - "+ outraParte +" - "+ categoria +" - " + assunto+ " - "+ solicitante; //adapte para sua situação

     var dto = docAPI.newDocumentDto();
     dto.setDocumentDescription(nome_pasta);
     dto.setDocumentType("1");
     dto.setParentDocumentId(GEDparent);
     dto.setDocumentTypeId("");

     var folder = docAPI.createFolder(dto, null, null);

     var gedNewParentId = folder.getDocumentId();


     
     // * Armazena no GED
     // ---------------------------------------------------------------- 
     var calendar = java.util.Calendar.getInstance().getTime();
     var docs = hAPI.listAttachments(); //Pega os anexos do processo
     var anexos = new java.util.ArrayList();

     log.info("### docs.size(): "+docs.size());

     for(var i=0;i<docs.size();i++)
     {
        var doc = docs.get(i);
        var anexo = new java.util.HashMap();
        if (doc.getDocumentType() != "7")
           continue;

       log.info("### LINK ANEXO: "+server + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + doc.getDocumentId());
        
       //  * Array que vai receber os anexos
      //   -------------------------------------------------- 

        anexo.put("link", server + "/portal/p/1/ecmnavigation?app_ecm_navigation_doc=" + doc.getDocumentId());
        anexo.put("description", doc.getDocumentDescription());
        anexos.add(anexo);

        doc.setParentDocumentId(gedNewParentId);
        doc.setVersionDescription("Processo: " + getValue("WKNumProces"));
        doc.setExpires(false);
        doc.setCreateDate(calendar);
        doc.setInheritSecurity(true);
        doc.setTopicId(1);
        doc.setUserNotify(false);
        doc.setValidationStartDate(calendar);
        doc.setVersionOption("0");
        doc.setUpdateIsoProperties(true);

        hAPI.publishWorkflowAttachment(doc);
     }
}