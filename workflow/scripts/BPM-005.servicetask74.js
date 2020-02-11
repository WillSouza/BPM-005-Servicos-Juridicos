function servicetask74(attempt, message) {
   var WKNumState = getValue("WKNumState");

 try {
	 var Service = ServiceManager.getService('ECMCardService');
	 var serviceHelper = Service.getBean();
  //var serviceLocator = serviceHelper.instantiate('classe.locator');

  var server = "https://ezconnecthom.eztec.com.br";
	
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

 
  
  // * Número da pasta principal que vai receber os arquivos
 //  --------------------------------------------------------- 
  var GEDparent = 286338; //adapte para a sua situação
  //var GEDparent = 17; //adapte para a sua situação

  
  // * Cria pasta dentro da pasta pai
  // ---------------------------------------------------- 

  if(hAPI.getCardValue('folder') == ""){
  var nome_pasta = getValue("WKNumProces")+" - "+ empresa +" - "+ outraParte +" - "+ categoria +" - " + assunto+ " - "+ solicitante; //adapte para sua situação

  var dto = docAPI.newDocumentDto();
  dto.setColleagueId('oauth_admin_key');
  dto.setPublisherId('oauth_admin_key'); 
  /* dto.setColleagueId('servico_fluig');
  dto.setPublisherId('servico_fluig');  */
  dto.setDocumentDescription(nome_pasta);
  dto.setDocumentType("1");
  dto.setParentDocumentId(GEDparent);
  dto.setDocumentTypeId("");
  

  var folder = docAPI.createFolder(dto, null, null); 

  var folderId = folder.getDocumentId()

  }


  if(folderId == "" || folderId == undefined){
   folderId = hAPI.getCardValue('folder');
  }
  

  log.info("##### folderId #####");
  log.info(folderId);

   var gedNewParentId =  parseInt(folderId); 
  //var gedNewParentId =  folder ;  */
  
  // * Armazena no GED
  // ---------------------------------------------------------------- 
  
  log.info("###### gedNewParentId: "+ gedNewParentId);

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

	log.info("#### doc.getColleagueId: "+ doc.getColleagueId())	;
	log.info("#### doc.getPublisherId: "+ doc.getPublisherId())	;
	log.info("### LINK ANEXO: "+server + "/portal/p/ecmnavigation?app_ecm_navigation_doc=" + doc.getDocumentId());
	 
	//  * Array que vai receber os anexos
   //   -------------------------------------------------- 

	 anexo.put("link", server + "/portal/p/ecmnavigation?app_ecm_navigation_doc=" + doc.getDocumentId());
	 anexo.put("description", doc.getDocumentDescription());
	 anexos.add(anexo);

	 doc.setParentDocumentId(parseInt(gedNewParentId));
	 doc.setVersionDescription("Processo: " + getValue("WKNumProces"));
	 doc.setExpires(false);
	 doc.setCreateDate(calendar);
	 doc.setInheritSecurity(true);
	 doc.setTopicId(1);
	 doc.setUserNotify(false);
	 doc.setValidationStartDate(calendar);
	 doc.setVersionOption("0");
	 doc.setUpdateIsoProperties(true);
	 doc.setColleagueId('oauth_admin_key');
	 doc.setPublisherId('oauth_admin_key'); 
	 /* doc.setColleagueId('servico_fluig');
	 doc.setPublisherId('servico_fluig');  */

	 log.info("#### doc.getColleagueId after: "+ doc.getColleagueId())	;
	 log.info("#### doc.getPublisherId after: "+ doc.getPublisherId())	;

	 hAPI.publishWorkflowAttachment(doc);
  }
 } catch(error) { 
	log.error(error);
	throw error;
 }
}