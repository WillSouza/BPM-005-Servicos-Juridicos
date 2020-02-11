var myLoading2  = FLUIGC.loading(window);
var carregaProg = FLUIGC.loading("#home");
var carregaConf = FLUIGC.loading("#menu1");

var controle = [];
var eztecForms = {
        params: {},
        initForm: function(params) {    
            this.params = params;
            var $this = this;   
            $(function () {
                if (params.formMode == "ADD" || params.formMode == "MOD") { 
                    $this.onEdit(params);
                } else {
                    $this.onView(params);
                }
            });
        },
        onView: function(params) { //Visualização do formulário sem a possibilidade de edição (consulta)

        },
        onEdit: function(params) {  //Edição do formulário
           
           var WKNumState = params.WKNumState;

           //alert("teste");
       
            
        }                           
};


function setSelectedZoomItem(selectedItem) {     

    console.log(selectedItem);

    if(selectedItem.inputName == 'papel'){
    	
    	$(".tag-text").css({'max-width': '100%'});
    	$("#codGrupo").val("Pool:Group:"+selectedItem.GROUP_CODE);
    }
   
}


