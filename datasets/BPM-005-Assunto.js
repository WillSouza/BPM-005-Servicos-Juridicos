function createDataset(fields, constraints, sortFields) {
   
	
	var newDataset = DatasetBuilder.newDataset();
    
    //var myQuery = findConstraint('SQL', constraints);
    
	var categoria = findConstraint("categoria",constraints,"");
    var assunto = findConstraint("assunto",constraints,"");
    //var papel = "qualidade"; 
    log.info("**** Contraint SQL ASSUNTO : "+assunto);
    
    var myQuery = "SELECT * FROM V_BPM005_JUR_ASSUNTO v WHERE ativo = 'on' AND  " +
    		"  version = (SELECT MAX(version) FROM V_BPM005_JUR_ASSUNTO z WHERE  z.DOcumentId = v.DOCUMENTID)  AND categoria LIKE '%"+categoria+"%' AND assunto LIKE '%"+  assunto +"%' ORDER BY TO_NUMBER(sequencia) ASC ";

    log.info("##### My Query: "+myQuery);

    var dataSource = "/jdbc/FluigDS";
    var ic = new javax.naming.InitialContext();
    var ds = ic.lookup(dataSource);
    var created = false;
    
    try {
        var conn = ds.getConnection();
        var stmt = conn.createStatement();
        var rs = stmt.executeQuery(myQuery);
        var columnCount = rs.getMetaData().getColumnCount();
        while (rs.next()) {
            if (!created) {
                for (var i = 1; i <= columnCount; i++) {
                    newDataset.addColumn(rs.getMetaData().getColumnName(i));
                }
                created = true;
            }
            var Arr = new Array();
            for (var i = 1; i <= columnCount; i++) {
                var obj = rs.getObject(rs.getMetaData().getColumnName(i));
                if (null != obj) {
                    Arr[i - 1] = rs.getObject(rs.getMetaData().getColumnName(i)).toString();
                } else {
                    Arr[i - 1] = "null";
                }
            }
            newDataset.addRow(Arr);
        }
    } catch (e) {
    	newDataset.addColumn("ERRO");
    	newDataset.addRow([e.message]);
        log.error("ERRO==============> " + e.message);
    } finally {
        if (stmt != null) {
            stmt.close();
        }
        if (conn != null) {
            conn.close();
        }
    }
    return newDataset;
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