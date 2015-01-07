$(document).ready(function() {

    // initializing select components
    $.each(ApiRosettaCode.filters, function(index, value) {
        for (item in indexApiRosettaCode["index"][value]) {
            $("#" + value + "-filter").append('<option value="'+ item +'">'+ item +'</option>');
        }
    });
    $(".filter-select").chosen({allow_single_deselect: true}).change(function() {
        ApiRosettaCode.renderResult($(""), ApiRosettaCode.runFilter());
    });

    ApiRosettaCode.renderResult(ApiRosettaCode.runFilter());


    $(".load-readme").click(function(event) {
        event.preventDefault();
        var readmeContainer = $(this).parent().next();
        if (readmeContainer.is(':visible')) {
            readmeContainer.hide();
        } else {
            if (readmeContainer.html().length == 0) {
                var href = $(this).attr("href");
                $.get(href, function(data) {
                    readmeContainer.html(marked(data));
                    readmeContainer.show();
                });
            } else {
                readmeContainer.show();            
            }
        }
    });

});

var ApiRosettaCode = {
    filters: ["usecase", "language", "library"],
    repositoryBaseUrl: "https://github.com/twitterdev/api-rosetta-code/tree/master",

    runFilter: function() {
        var values = [];
        var filteredSamples = [];
        var result = [];

        $.each(ApiRosettaCode.filters, function(index, value) {
            var selected = $("#" + value + "-filter").val();
            if (selected != "") {
                values.push([value, selected]);
            }
        });

        if (values.length == 0) {
            // no filter selected
            for (sample in indexApiRosettaCode["samples"]) {
                result.push(indexApiRosettaCode["samples"][sample]);
            }
        } else {
            // we got something selected
            $.each(values, function(index, value) {
                filteredSamples.push(indexApiRosettaCode["index"][value[0]][value[1]]);
            });
            var base = filteredSamples[0];
            var intersection = [];
            for (var i = 0; i < base.length; i++) {
                var flag = 0;
                for (var j = 1; j < filteredSamples.length; j++) {
                    if (filteredSamples[j].indexOf(base[i]) >= 0) { flag++; }
                }
                if (flag == filteredSamples.length - 1) { intersection.push(base[i]); }
            }
            for (var i = 0; i < intersection.length; i++) {
                result.push(indexApiRosettaCode["samples"][intersection[i]]);
            }
        }

        return result;
    },

    renderResult: function(container, result) {
    
    }

};
