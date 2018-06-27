function displayFields(form,customHTML){
	eztecForms(form, customHTML); 

	var WKNumProces = getValue('WKNumProces');
	var WKNumState = getValue('WKNumState');
	
	
	

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