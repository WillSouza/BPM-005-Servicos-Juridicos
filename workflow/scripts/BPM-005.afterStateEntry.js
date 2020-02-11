function afterStateEntry(sequenceId){
	//CODIGO APENAS PARA SETAR NO FORMULARIO O NOME DA ATIVIDADE CORRENTE
	var c1 = DatasetFactory.createConstraint("processStatePK.processId", getValue("WKDef"), getValue("WKDef"), ConstraintType.MUST);
	var c2 = DatasetFactory.createConstraint("processStatePK.sequence", sequenceId, sequenceId, ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint("processStatePK.version", getValue("WKVersDef"), getValue("WKVersDef"), ConstraintType.MUST);
	var ds = DatasetFactory.getDataset("processState", null, [c1, c2, c3], null);
	var stateName = ds.getValue(0, "stateName");
	log.info('### BPM-011 - statename: ' + stateName);
	hAPI.setCardValue('atividadeCorrente', ds.getValue(0, "stateName"));
	log.info('### atividadeCorrente: ' + hAPI.getCardValue('atividadeCorrente'));  

}