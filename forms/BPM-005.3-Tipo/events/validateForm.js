// ValidateForm
function validateForm(form){
	checkErrorJs(form);
	
	var numAtividade = getValue('WKNumState');
	
	var tipo = form.getValue('tipo');
	var assunto = form.getValue('assunto');

	if(tipo == ""){
		throw "Necessário preencher campo Tipo";
	}	

	if(assunto == ""){
		throw "Necessário preencher campo Assunto";
	}	

}
function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "O FORMULARIO POSSUI ERROS. FAVOR VERIFICAR OS CAMPOS NAO PREENCHIDOS.";
	}
}

