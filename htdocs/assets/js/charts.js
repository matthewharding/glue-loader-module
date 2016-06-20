console.log('%c data module loaded ', 'background: #222; color: #bada55');
qg.glue.data.get = function (domain, sql, callbackFunc) {
        $.ajax({
            url: 'https://' + domain + '/api/action/datastore_search_sql',
            data: { sql: sql }
        }).done(callbackFunc);
};



//# sourceMappingURL=charts.js.map
