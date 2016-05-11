
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20

module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        reporters: ['spec' , 'html'],
        htmlReporter: {
            outputDir: './test/unit/result_html',
            templatePath: null,
            focusOnFailures: true,
            namedFiles: true,
            pageTitle: "Unit Test Result",
            urlFriendlyName: false,
            reportName: 'report'
        },
        browsers: ['PhantomJS'],
        files: [
            'test/unit/all.js',
            'test/unit/specs/*.js'
        ]
    });
};
