function enableFields(form){

	var activity = getValue('WKNumState');
   
	if (activity == 21) {
        form.setEnabled('rdSolicOriginal', false);
        form.setEnabled('userOutro', false);
        
    }
	/*if (activity == 27 || activity == 9){
		
		form.setEnabled('rdSolicOriginal', false);
        form.setEnabled('userOutro', false);
        
        form.setEnabled('rdTipoPrazo', false);
        form.setEnabled('prazoDeterminado', false);
        
        form.setEnabled('rdMotivoPrazo', false);
        form.setEnabled('justificaPrazo', false);
        
        form.setEnabled('prioridade', false);
        
        form.setEnabled('empresa', false);
        form.setEnabled('outraParte', false);
        
        form.setEnabled('categoria', false);
        form.setEnabled('outraCategoria', false);
        form.setEnabled('assunto', false);
        form.setEnabled('outroAssunto', false);
        
	}*/
	
	if(activity == 27 || activity == 44){
		
		form.setEnabled('rdNecAjuste',false);
        form.setEnabled('rdSolicOriginal', false);
        form.setEnabled('rdTipoPrazo', false);
        form.setEnabled('rdMotivoPrazo', false);

	}

    if(activity == 9){
        
        form.setEnabled('rdSolicOriginal', false);
        form.setEnabled('rdTipoPrazo', false);
        form.setEnabled('rdMotivoPrazo', false);

    }
	
}