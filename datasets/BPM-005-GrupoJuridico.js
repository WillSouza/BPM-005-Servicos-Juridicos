function createDataset(fields, constraints, sortFields){

	var ds = DatasetBuilder.newDataset();
	ds.addColumn("codigo");
	ds.addColumn("nome");

	log.info("### dataset BPM-005-GrupoJuridico ###");
	var c1 = DatasetFactory.createConstraint('colleagueGroupPK.groupId', 'BPM-005-Juridico', 'BPM-005-Juridico', ConstraintType.MUST);

	
	var dsPapeles = DatasetFactory.getDataset("colleagueGroup", null, [c1], null);

	for(var i=0; i<dsPapeles.rowsCount; i++){

		var colleagueId = dsPapeles.getValue(i, "colleagueGroupPK.colleagueId");
		var c1 = DatasetFactory.createConstraint('colleaguePK.colleagueId', colleagueId, colleagueId, ConstraintType.MUST);

		var dsColleague = DatasetFactory.getDataset("colleague", null, [c1], null);
		var colleagueNome = dsColleague.getValue(0, "colleagueName");
		ds.addRow([colleagueId, colleagueNome]);
	}


	return ds;
}
