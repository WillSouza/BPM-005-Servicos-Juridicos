// ValidateForm
function validateForm(form){
	checkErrorJs(form);
	
	var WKNumState = getValue('WKNumState');
	var WKNextState = getValue('WKNextState');

/* 
	var solicOriginalValid = form.getValue("solicOriginalValid");
	var userOutro = form.getValue("userOutro");
	var tipoPrazoValid = form.getValue("tipoPrazoValid");
	var prazoDeterminado = form.getValue("prazoDeterminado");
	var rdMotivoPrazoValid = form.getValue("rdMotivoPrazoValid");
	var justificaPrazo = form.getValue("justificaPrazo");
	var prioridade = form.getValue("prioridade");
	var empresa = form.getValue("empresa");
	var outraParte = form.getValue("outraParte");
	var categoria = form.getValue("categoria");
	var outraCategoria = form.getValue("outraCategoria");
	var assunto = form.getValue("assunto");
	var outroAssunto = form.getValue("outroAssunto");
	var necAjusteValid = form.getValue("necAjusteValid");
	var descSolic = form.getValue("descSolic");
	var necAjuste = form.getValue("necAjuste");	
	var prazoRevisao = form.getValue("prazoRevisao");


	if(WKNumState == 4 || WKNumState == 0 ){

		if(solicOriginalValid == ""){
			throw ("Necessário informar usuário solicitante.");
		}

		if(solicOriginalValid == "0" && userOutro == ""){
			throw ("Necessário informar usuário solicitante.");
		}

		if(tipoPrazoValid == ""){
			throw ("Necessário informar tipo de prazo.");
		}

		if(tipoPrazoValid == "0" && prazoDeterminado == ""){
			throw ("Necessário informar data do prazo determinado.");
		}

		if(rdMotivoPrazoValid == "" && tipoPrazoValid == "0"){
			throw ("Se prazo determinado, necessário informar motivo.");
		}	

		if(rdMotivoPrazoValid == "1" && justificaPrazo == ""){
			 throw ("Necessário informar motivo de prazo determinado.");
		}

		if(prioridade == "0"){
			throw ("Necessário informar prioridade.");
		}


		if(outraParte == ""){
			throw ("Necessário informar outra parte.");
		}

		if(categoria == ""){
			throw ("Necessário informar a categoria.");
		}

        if(categoria == "Outra" && outraCategoria == "" && outroAssunto == "" ){
            throw ("Necessário informar outra categoria e outro assunto.");
        }

        if(categoria != "Outra" && assunto == ""){
            throw ("Necessário informar assunto.");
         }

         if(categoria != "Outra" && assunto == "Outros" && outroAssunto == ""){
            throw ("Necessário informar outro assunto.");
         }

          if(descSolic == ""){
            throw ("Necessário informar descrição da solicitação.");
        }
	}

	if(WKNumState == 9){


		if(necAjusteValid == ""){
			throw ("Nessario informar se exite necessidadede ajuste.");
		}

		if(necAjusteValid == "1" && necAjuste == ""){
			throw ("Necessário informar necessidade de ajuste.");
		}
	}

	if(WKNextState == 9){

		if(prazoRevisao == ""){
			throw ("Nessario informar prazo para revisão.");	
		}
	} */

}
function checkErrorJs(form) {
	if (form.getValue("__error") == "1") {
		throw "O FORMULARIO POSSUI ERROS. FAVOR VERIFICAR OS CAMPOS NAO PREENCHIDOS.";
	}
}


