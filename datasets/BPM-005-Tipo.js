function createDataset(fields, constraints, sortFields){

	log.info("### dataset BPM-005-TIPO ###");
	
	var ds = DatasetBuilder.newDataset();
	var assunto = findConstraint("assunto",constraints,"");
	//var assunto = 'Solicitação de execução extrajudicial';
	
	ds.addColumn("assunto");
	ds.addColumn("codGrupo");
	ds.addColumn("sequencia");
	ds.addColumn("tipo");
	
	log.info("### assunto: "+assunto);
	
	var c1 = DatasetFactory.createConstraint('assunto', assunto, assunto, ConstraintType.SHOULD);
	var c2 = DatasetFactory.createConstraint('metadata#active', '1', '1', ConstraintType.MUST);
	var c3 = DatasetFactory.createConstraint('ativo', 'on', 'on', ConstraintType.MUST);

	var dsPapeles = DatasetFactory.getDataset("BPM-005.3-Tipo", null, [c1,c2,c3], null);
	
	log.info("### dsPapeles.rowsCount: "+dsPapeles.rowsCount);

	for(var i=0; i<dsPapeles.rowsCount; i++){

		var colleagueId = dsPapeles.getValue(i, "assunto");
		var codGrupo = dsPapeles.getValue(i, "codGrupo");
		var sequencia = dsPapeles.getValue(i, "sequencia");
		var tipo = dsPapeles.getValue(i, "tipo");
		
		ds.addRow([colleagueId, codGrupo, sequencia, tipo]);
	}


	return ds;
}


function findConstraint(fieldName, constraints, defaultValue) {
	 if (constraints != null) {
	  
	  for (var i=0; i<constraints.length; i++){
	   log.info("***CONSTRAN : " + constraints[i].fieldName );
	   log.info("***CONSTRAN2 : " + constraints[i].initialValue);
	   if (constraints[i].fieldName == fieldName){
	    return constraints[i].initialValue;
	   }
	  }
	 }
	 return defaultValue;
	}