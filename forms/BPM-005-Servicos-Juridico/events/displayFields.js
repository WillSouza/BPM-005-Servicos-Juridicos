function displayFields(form,customHTML){
	eztecForms(form, customHTML); 
	setHistorico(form, customHTML);

	var ativAcoes = "21";
	
	var WKNumProces = getValue('WKNumProces');
	var numAtividade = getValue("WKNumState");
	
	//g.info("#### Inicio do DISPLAYFIELD tarefa :"+numAtividade);

	//log.info("$$$$ WKNumProces: "+WKNumProces);
	
	var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", getValue("WKUser"), getValue("WKUser"), ConstraintType.MUST);
	var constraints = new Array(c1);

	var colaborador = DatasetFactory.getDataset("colleague", null, constraints, null);

	form.setValue('userAtivo',colaborador.getValue(0,"colleagueName"));

	if(form.getValue('solicitante') == ""){
		form.setValue('solicitante',colaborador.getValue(0,"colleagueName"));
		form.setValue('emailSolicitante',colaborador.getValue(0,"mail"));
		form.setValue("codSolicitante",colaborador.getValue(0,"colleaguePK.colleagueId"));

		log.info("### CONSTRAINT ###");

		var c2 = DatasetFactory.createConstraint("email", colaborador.getValue(0,"mail"), colaborador.getValue(0,"mail"), ConstraintType.MUST);
		var arr = new Array(c2);
		var dataset = DatasetFactory.getDataset("consultaContatos", null, arr, null);

		for (var i = 0; i < dataset.rowsCount; i++) {
			form.setValue('depart', dataset.getValue(0, "DEPARTAMENTO"));
			form.setValue('ramal', dataset.getValue(0, "RAMAL"));
		}

		
	}

	if (form.getValue("dataSolic") == "") {
		var fullDate = new Date();
		var date = fullDate.getDate().toString();
	
		if(date.length == 1){
			date = 0+date;
		}
		var mes = (fullDate.getMonth()+1).toString();
	
		if(mes.length == 1){
			mes = 0+mes;
		}
		
		var data = date+"/"+mes+"/"+fullDate.getFullYear();
		form.setValue("dataSolic", data);
	}

	if(numAtividade == 27){
		form.setValue('userAtivoExecTarefa',colaborador.getValue(0,"colleaguePK.colleagueId"));
		form.setValue('codGrupo',colaborador.getValue(0,"colleaguePK.colleagueId"));
	}
	
	
	// Histórico

	form.setVisibleById("dv_historico", false);
	
	if (form.getValue("historico") == "") {
		form.setVisibleById("btn_view", false);
	}

	if (form.getFormMode() == "VIEW") {
		form.setVisibleById("div-obsHistorico", false);
		ocultaClasse('colunaDelete');
		ocultaClasse('btn-insert');
	}


	if (form.getValue("dataSolic") == "") {
		var fullDate = new Date();
		var date = fullDate.getDate().toString();
	
		if(date.length == 1){
			date = 0+date;
		}
		var mes = (fullDate.getMonth()+1).toString();
	
		if(mes.length == 1){
			mes = 0+mes;
		}
		
		var data = date+"/"+mes+"/"+fullDate.getFullYear();
		form.setValue("dataSolic", data);
	}


	if (form.getValue('solicitante') == "") {
      
        
        form.setValue("solicitante",colaborador.getValue(0,"colleagueName")); // Método que carrega no campo input o objeto "nome" carregado pela API do Fluig	
        form.setValue("codSolicitante",colaborador.getValue(0,"colleaguePK.colleagueId"));	
	}
	


	function ocultaClasse(classe) {
		customHTML.append('<script>');
		customHTML.append('$(\'.' + classe + '\').css("display", "none");');
		customHTML.append('</script>');
	}
	
}
function eztecForms(form,customHTML) { 
	 
	 customHTML.append("<script type='text/javascript'>");
	 customHTML.append("if (eztecForms && eztecForms.initForm) {");
	 customHTML.append("eztecForms.initForm({");
	 customHTML.append(" formMode:'" + form.getFormMode()+"',");
	 customHTML.append(" WKNumState:'" + getValue("WKNumState")+"',");
	 customHTML.append(" WKNumProces:'" + getValue("WKNumProces")+"',");
	 customHTML.append(" WKCurrentState:'" + getValue("WKCurrentState")+"',");
	 customHTML.append(" isMobile: " + (form.getMobile() != null && form.getMobile())+",");
	 customHTML.append("});");
	 customHTML.append("}</script>");   
}


function setHistorico(form, customHTML) {
	form.setVisibleById("dv_historico", false);
	if (form.getValue("ultimaAtualizacao") == "") {
		customHTML.append('<script>');
		customHTML.append('$(\'#dv_ultimaAtualizacao\').append(\'<div class="alert alert-info" role="alert">Ainda não há informações para serem exibidas.</div>\')');
		customHTML.append('</script>');
	}
	if ((form.getValue("historico")).trim() == "") {
		form.setVisibleById("btn_view", false);
	}
}