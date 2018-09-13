// ValidateForm
function validateForm(form){
	checkErrorJs(form);
	
	var numAtividade = getValue('WKNumState');
	
	var categoria = form.getValue('categoria');
	var assunto = form.getValue('assunto');

	if(categoria == ""){
		throw "Necessário preencher campo Categoria";
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

