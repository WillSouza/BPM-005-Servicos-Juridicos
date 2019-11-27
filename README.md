# BPM-005-Servicos-Juridicos-prod


---------- Manual para instalação do processo Jurídico ----------------

1. Aterar linha 38 do script BPM-005-Jurídico.afterProcessFinish com o ID da pasta que receberá os anexos.

2. Alterar linha 4 do script BPM-005-Jurídico.afterProcessFinish com o nome do server atual

3. Exportar formulário BPM-005.1-Categoria

4. Exportar formulário BPM-005.2-Assunto

5. Criar view V_BPM005_JUR_ASSUNTO com base na tabela ML do formulário BPM-005.2-Assunto

6. Criar view V_BPM005_JUR_CATEGORIA com base na tabela ML do formulário BPM-005.1-Categoria

7. Exportar datasets
	- BPM-005-BD-MEGA-ViewEmpresa
	- BPM-005-Assunto
	- BPM-005-Categoria

8. Criar Grupos:
		Código						Descrição
		BPM-005-Adm					Administrador BPM-005
		BPM-005-Juridico			Jurídico global
		BPM-005-JURI_grupo_1 		Grupo 1 do Jurídico
		BPM-005-JURI_grupo_2 		Grupo 2 do Jurídico
		BPM-005-JURI_grupo_3 		Grupo 3 do Jurídico
		BPM-005-JURI_grupo_4 		Grupo 4 do Jurídico
		BPM-005-JURI_grupo_5 		Grupo 5 do Jurídico
		BPM-005-JURI_grupo_6 		Grupo 6 do Jurídico
		BPM-005-JURI_grupo_7 		Grupo 7 do Jurídico
		BPM-005-JURI_grupo_8 		Grupo 8 do Jurídico
		BPM-005-JURI_grupo_9 		Grupo 9 do Jurídico
		BPM-005-JURI_grupo_10 		Grupo 10 do Jurídico
		BPM-005-JURI_grupo_11 		Grupo 11 do Jurídico
		BPM-005-JURI_grupo_12 		Grupo 12 do Jurídico	
		BPM-005-JURI_grupo_13 		Grupo 13 do Jurídico
		BPM-005-JURI_grupo_14 		Grupo 14 do Jurídico
		BPM-005-JURI_grupo_15 		Grupo 15 do Jurídico
		BPM-005-JURI_grupo_16 		Grupo 16 do Jurídico
		BPM-005-JURI_grupo_17 		Grupo 17 do Jurídico
		BPM-005-JURI_grupo_18 		Grupo 18 do Jurídico
		BPM-005-JURI_grupo_19 		Grupo 19 do Jurídico
		BPM-005-JURI_grupo_20 		Grupo 20 do Jurídico
		BPM-005-JURI_grupo_21 		Grupo 21 do Jurídico
		BPM-005-JURI_grupo_22 		Grupo 22 do Jurídico
		
9. Exportar o formulário BPM-005-Servicos-Juridico		

10. Configurar workflow para receber o formulário BPM-005-Servicos-Juridico

11. Exportar Workflow BPM-005



