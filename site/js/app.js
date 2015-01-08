$(document).ready(function() {

    // initializing select components
    $.each(ApiRosettaCode.filters, function(index, value) {
        for (item in indexApiRosettaCode["index"][value]) {
            $("#" + value + "-filter").append('<option value="'+ item +'">'+ item +'</option>');
        }
    });
    $(".filter-select").chosen({allow_single_deselect: true}).change(function() {
        ApiRosettaCode.renderResult($("#filter-result"), ApiRosettaCode.runFilter());
    });

    ApiRosettaCode.renderResult($("#filter-result"), ApiRosettaCode.runFilter());

});

var ApiRosettaCode = {
    filters: ["usecase", "language", "library"],
    repositoryBaseUrl: "https://github.com/twitterdev/api-rosetta-code/tree/master/",

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

        var groupedResult = { "filter_result_count": 0 };

        var count = 0;
        for (var i = 0; i < result.length; i++) {
            var sample = result[i];
            if (groupedResult[sample["usecase_name"]] == undefined) {
                groupedResult[sample["usecase_name"]] = [];
            }
            groupedResult[sample["usecase_name"]].push(sample);
            count++;
        }

        groupedResult["filter_result_count"] = count;
        return groupedResult;
    },

    renderResult: function(container, result) {
        container.html("");

        if (result["filter_result_count"] > 0) {
            var html = "";
            for (usecase in result) {
                if (usecase == "filter_result_count") { continue; }

                html = html.concat('<h2><img src="site/img/use_black.png" class="inline" alt="Use case title">' + usecase);
                html = html.concat('<div class="code-options">');
                html = html.concat('<a href="'+ result[usecase][0]["usecase_readme_path"] +'" class="load-readme" title="Expand README"><img src="site/img/docs_blue.png" alt="Documentation icon"/></a>');
                html = html.concat('<a href="'+ ApiRosettaCode.repositoryBaseUrl + result[usecase][0]["usecase_path"] +'" target="_blank" title="See it on Github"><img src="site/img/github_blue.png" alt="Github icon"/></a>');
                html = html.concat('<a href="https://twitter.com/intent/tweet?' +
                        'via=TwitterDev&url='+ encodeURIComponent(ApiRosettaCode.repositoryBaseUrl + result[usecase][0]["usecase_path"]) +
                        '" class="share-sample" title="Share this"><img src="site/img/share_blue.png" alt="Share icon"/></a>');
                html = html.concat('</div><div class="readme-container"></div>');
                html = html.concat("</h2><ul>");

                for (var i = 0; i < result[usecase].length; i++) {
                    html = html.concat('<li>');
                    html = html.concat(result[usecase][i]["language"] + " using " + result[usecase][i]["library"]);
                    html = html.concat(ApiRosettaCode.renderOptions(result[usecase][i]));
                    html = html.concat('</li>');
                }

                html = html.concat('</ul>');
            }
            container.html(html);
            ApiRosettaCode.bindReadmeExpand();
        } else {
            container.html("<h3>There's no sample with that combination. Contribute!</h3>");
        }
    },

    bindReadmeExpand: function() {
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
    },

    renderOptions: function(sample) {
        var html = "";

        html = html.concat('<div class="code-options">');
        html = html.concat('<a href="'+ sample["readme"] +'" class="load-readme" title="Expand README"><img src="site/img/docs_blue.png" alt="Documentation icon"/></a>');
        html = html.concat('<a href="'+ ApiRosettaCode.repositoryBaseUrl + sample["path"] +'" target="_blank" title="See it on Github"><img src="site/img/github_blue.png" alt="Github icon"/></a>');
        html = html.concat('<a href="https://twitter.com/intent/tweet?' +
                'via=TwitterDev&url='+ encodeURIComponent(ApiRosettaCode.repositoryBaseUrl + sample["path"]) +
                '" class="share-sample" title="Share this"><img src="site/img/share_blue.png" alt="Share icon"/></a>');
        html = html.concat('</div><div class="readme-container"></div>');

        return html;
    }

};
