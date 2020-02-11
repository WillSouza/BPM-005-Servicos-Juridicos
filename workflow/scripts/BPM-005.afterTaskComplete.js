function afterTaskComplete(colleagueId,nextSequenceId,userList){

    var WKNumState = getValue("WKNumState");
    var completTask = getValue("WKCompletTask");
    var WKNextState = getValue('WKNextState');
    var WKNumProces = getValue("WKNumProces");

    // matricula do usuário remetente
    var remetente = hAPI.getCardValue('userAtivoExecTarefa');

    var server = "https://ezconnecthom.eztec.com.br";	


    if(completTask.equals("true")){

        if(WKNextState == 37 && hAPI.getCardValue('rdEncaminharSolic') == 'finalizar'){

            log.info('### BPM-005 email finalizar')
    
            try {
                var param = new java.util.HashMap();
                var dest = new java.util.ArrayList();
    
                var codSolicitante = hAPI.getCardValue('codSolicitante');
                var receiver = "";
    
                var c2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', codSolicitante, codSolicitante, ConstraintType.MUST);
                var dataset = DatasetFactory.getDataset("colleague", null, [c2], null);
    
                if (dataset.rowsCount > 0) {
                    for (var x = 0; x < dataset.rowsCount; x++) {
                        var emaildest = dataset.getValue(x, "mail");
                        receiver = dataset.getValue(x, "colleagueName");
                        dest.add(emaildest);
                    }
                } 
    
                log.info(dest);
    
                log.info("### justFinalizar: "+ hAPI.getCardValue('justFinalizar'));
                
                param.put("subject", "FINALIZAR SOLICITAÇÃO - SOLICITAÇÃO "+ WKNumProces);
                param.put("solicitacao", WKNumProces);
                param.put("justFinalizar", hAPI.getCardValue('justFinalizar'));
                param.put("solicitante", hAPI.getCardValue('solicitante'));
                param.put("categoria", hAPI.getCardValue('categoria'));
                param.put("assunto", hAPI.getCardValue('assunto'));
                param.put("userAtivo", hAPI.getCardValue('userAtivo'));
                param.put("depart", hAPI.getCardValue('depart'));
                param.put("ramal", hAPI.getCardValue('ramal'));
                param.put("SERVER_URL", server);
                param.put("TENANT_ID", getValue("WKCompany"));
                param.put("WDK_TaskNumber", WKNumProces);
                param.put("RECEIVER", receiver);
                param.put("LINK", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                param.put("WDK_TaskLink", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                //param.put("numRevisao", hAPI.getCardValue("numRevisao___"+indextabRevisao));
                //param.put("descSolic", hAPI.getCardValue("descSolic"));
                //param.put("parecer", hAPI.getCardValue("parecer")); 
    
    
                if (dest.size() > 0) {
                    log.info("*** notifier.notify");
                   // notifier.notify(remetente, "BPM-005-FinishSolic", param, dest, "text/html");
                    notifier.notify("18xn0l78namag6ah1497387832355", "BPM-005-FinishSolic", param, dest, "text/html");
                }       
    
            } catch (e) {
                log.error(">>>>> Erro Envio de email de customizado: " + e);
            }      
        }

        if(WKNextState == 9){

            log.info('### BPM-005 email Review 1')
    
            try {
                var param = new java.util.HashMap();
                var dest = new java.util.ArrayList();
    
                var codSolicitante = hAPI.getCardValue('codSolicitante');
                var receiver = "";
    
                var c2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', codSolicitante, codSolicitante, ConstraintType.MUST);
                var dataset = DatasetFactory.getDataset("colleague", null, [c2], null);
    
                if (dataset.rowsCount > 0) {
                    for (var x = 0; x < dataset.rowsCount; x++) {
                        var emaildest = dataset.getValue(x, "mail");
                        receiver = dataset.getValue(x, "colleagueName");
                        dest.add(emaildest);
                    }
                } 
    
                log.info(dest);
    
                log.info("### motivoRevisao: "+ hAPI.getCardValue('motivoRevisao'));
                
                param.put("subject", "REVISAR (1ª TENTATIVA) SOLICITAÇÃO "+ WKNumProces + " - SERVIÇO JURÍDICO");
                param.put("solicitacao", WKNumProces);
                param.put("motivoRevisao", hAPI.getCardValue('motivoRevisao'));
                param.put("solicitante", hAPI.getCardValue('solicitante'));
                param.put("categoria", hAPI.getCardValue('categoria'));
                param.put("assunto", hAPI.getCardValue('assunto'));
                param.put("userAtivo", hAPI.getCardValue('userAtivo'));
                param.put("depart", hAPI.getCardValue('depart'));
                param.put("ramal", hAPI.getCardValue('ramal'));
                param.put("SERVER_URL", server);
                param.put("TENANT_ID", getValue("WKCompany"));
                param.put("WDK_TaskNumber", WKNumProces);
                param.put("RECEIVER", receiver);
                param.put("LINK", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                param.put("WDK_TaskLink", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                //param.put("numRevisao", hAPI.getCardValue("numRevisao___"+indextabRevisao));
                //param.put("descSolic", hAPI.getCardValue("descSolic"));
                //param.put("parecer", hAPI.getCardValue("parecer")); 
    
    
                if (dest.size() > 0) {
                    log.info("*** notifier.notify");
                   // notifier.notify(remetente, "BPM-005-FinishSolic", param, dest, "text/html");
                    notifier.notify("18xn0l78namag6ah1497387832355", "BPM-005-Review1", param, dest, "text/html");
                }       
    
            } catch (e) {
                log.error(">>>>> Erro Envio de email de customizado: " + e);
            }      
        }

        if(WKNextState == 84){

            log.info('### BPM-005 email Review 1')
    
            try {
                var param = new java.util.HashMap();
                var dest = new java.util.ArrayList();
    
                var codSolicitante = hAPI.getCardValue('codSolicitante');
                var receiver = "";
    
                var c2 = DatasetFactory.createConstraint('colleaguePK.colleagueId', codSolicitante, codSolicitante, ConstraintType.MUST);
                var dataset = DatasetFactory.getDataset("colleague", null, [c2], null);
    
                if (dataset.rowsCount > 0) {
                    for (var x = 0; x < dataset.rowsCount; x++) {
                        var emaildest = dataset.getValue(x, "mail");
                        receiver = dataset.getValue(x, "colleagueName");
                        dest.add(emaildest);
                    }
                } 
    
                log.info(dest);
    
                log.info("### motivoRevisao: "+ hAPI.getCardValue('motivoRevisao'));
                
                param.put("subject", "REVISAR (2ª TENTATIVA) SOLICITAÇÃO "+ WKNumProces + " - SERVIÇO JURÍDICO");
                param.put("solicitacao", WKNumProces);
                param.put("motivoRevisao", hAPI.getCardValue('motivoRevisao'));
                param.put("solicitante", hAPI.getCardValue('solicitante'));
                param.put("categoria", hAPI.getCardValue('categoria'));
                param.put("assunto", hAPI.getCardValue('assunto'));
                param.put("userAtivo", hAPI.getCardValue('userAtivo'));
                param.put("depart", hAPI.getCardValue('depart'));
                param.put("ramal", hAPI.getCardValue('ramal'));
                param.put("SERVER_URL", server);
                param.put("TENANT_ID", getValue("WKCompany"));
                param.put("WDK_TaskNumber", WKNumProces);
                param.put("RECEIVER", receiver);
                param.put("LINK", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                param.put("WDK_TaskLink", server + '/portal/p/Eztec/pageworkflowview?app_ecm_workflowview_detailsProcessInstanceID=' + WKNumProces);
                //param.put("numRevisao", hAPI.getCardValue("numRevisao___"+indextabRevisao));
                //param.put("descSolic", hAPI.getCardValue("descSolic"));
                //param.put("parecer", hAPI.getCardValue("parecer")); 
    
    
                if (dest.size() > 0) {
                    log.info("*** notifier.notify");
                   // notifier.notify(remetente, "BPM-005-FinishSolic", param, dest, "text/html");
                    notifier.notify("18xn0l78namag6ah1497387832355", "BPM-005-Review2", param, dest, "text/html");
                }       
    
            } catch (e) {
                log.error(">>>>> Erro Envio de email de customizado: " + e);
            }      
        }
    }    

    
}