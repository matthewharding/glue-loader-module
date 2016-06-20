//global
var qg = qg || {};

// glue
qg.glue = qg.glue || {};
qg.glue.data = qg.glue.data || {};

qg.glue.loader = {
    init : function (callback) {
        if($(".qg-glue-charts").length > 0)  this.loadCharts(callback);
        else if($(".qg-glue-forms").length > 0)  this.loadForms(callback);
        else this.commonLibs(callback);
    },
    commonLibs : function (callback) {
        console.log('%c loader could not find any specific classes so just the common libraries has been loaded ', 'background: #222; color: #bada55');
        $.getScript("https://rawgit.com/qld-gov-au/glue-module-loader/master/htdocs/assets/js/common.js" , callback);
    },
    loadCharts : function (callback) {
        console.log('%c charts libraries has been loaded', 'background: #222; color: #bada55');
        $.getScript("https://rawgit.com/qld-gov-au/glue-module-loader/master/htdocs/assets/js/charts.js" , callback);
    },
    loadForms : function (callback) {
        console.log('%c forms libraries has been loaded', 'background: #222; color: #bada55');
        $.getScript("https://rawgit.com/qld-gov-au/glue-module-loader/master/htdocs/assets/js/forms.js" , callback);
    }
};




    
