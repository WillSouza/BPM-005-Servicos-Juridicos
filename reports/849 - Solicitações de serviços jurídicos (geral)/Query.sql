select       
            CASE
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_1'
                     THEN 'Grupo 01'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_2'
                     THEN 'Grupo 02'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_3'
                     THEN 'Grupo 03'       
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_4'
                     THEN 'Grupo 04'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_5'
                     THEN 'Grupo 05'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_6'
                     THEN 'Grupo 06'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_7'
                     THEN 'Grupo 07'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_8'
                     THEN 'Grupo 08'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_9'
                     THEN 'Grupo 09'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_10'
                     THEN 'Grupo 10'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_11'
                     THEN 'Grupo 11'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_12'
                     THEN 'Grupo 12'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_13'
                     THEN 'Grupo 13'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_14'
                     THEN 'Grupo 14'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_15'
                     THEN 'Grupo 15'                            
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_16'
                     THEN 'Grupo 16'  
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_17'
                     THEN 'Grupo 17'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_18'
                     THEN 'Grupo 18'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_19'
                     THEN 'Grupo 19'                            
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_20'
                     THEN 'Grupo 20'       
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_21'
                     THEN 'Grupo 21'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_22'
                     THEN 'Grupo 22'
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_23'
                     THEN 'Grupo 23'                            
                WHEN tp.cd_matricula = 'Pool:Role:JURI_grupo_24'
                     THEN 'Grupo 24'       
                ELSE  us.Full_Name
            END Matricula         
             ,   COUNT( CASE
            WHEN  tp.DAT_FIM_PRAZ IS NULL
              THEN 'Sem prazo definifo'
            WHEN tp.DAT_FIM_PRAZ > to_char(SYSDATE, 'DD-MM-YYYY')
              THEN '1'
          END )      AS  Prazo
          , COUNT( CASE
            WHEN tp.DAT_FIM_PRAZ < to_char(SYSDATE, 'DD-MM-YYYY')
              THEN '2'
          END )      AS  Atrasado
           

       FROM proces_workflow pw
       
       JOIN anexo_proces a
         ON pw.cod_empresa = a.cod_empresa
        AND pw.num_proces = a.num_proces
        AND pw.num_seq_anexo_princ = a.num_seq_anexo
        AND pw.log_ativ = 1
       
       JOIN V_BPM_000_Jurídico v
         ON v.documentid =a.nr_documento
        AND v.version = a.nr_versao
       
       LEFT  JOIN histor_proces hp
        ON  pw.cod_empresa = hp.COD_EMPRESA
        AND pw.num_proces = hp.NUM_PROCES 
        AND hp.log_ativ = 1
        
        JOIN tar_proces tp
         ON hp.cod_empresa = tp.cod_empresa
        AND hp.NUM_SEQ_MOVTO = tp.NUM_SEQ_MOVTO
        AND hp.NUM_PROCES = tp.NUM_PROCES
        AND tp.LOG_ATIV = 1
     
          
      JOIN fdn_usertenant ut
        ON pw.cod_matr_requisit = ut.user_code
       
      JOIN fdn_user us
        ON ut.user_id = us.user_id 
       
     WHERE  TO_DATE(tp.dat_inic_praz, 'dd/mm/yy') BETWEEN ? AND ?
             
      GROUP BY tp.cd_matricula ,  us.full_name      
        
       ORDER BY tp.cd_matricula   
   