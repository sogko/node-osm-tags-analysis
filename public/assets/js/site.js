$(document).ready(function() {

    // initial state
    adjustHeight();
    showMessage('Let\'s begin', 'Select an .osm file to start');

    // initialize tables
    $('#results-table').dynatable();
    $('#keys-table').dynatable({
        dataset: {
            perPageDefault: 5,
            perPageOptions: [5,10,50,100]
        }
    });

    // register onChange
    $('#inputfile').change(function(){
        showMessage('File ready', 'Click submit to start uploading. <br/>Optionally, you specify Osmosis options to filter the data.');
    });
    $('#appform').submit(function() {

        if (!$('#inputfile').val()){
            showMessage('No file selected', 'Select an .osm file before continuing');
            return false;
        }
        showMessage('Processing file ...', 'Osmosis will generate a filtered .osm data based on your options and a statistical analysis of the data will be performed');

        $(this).ajaxSubmit({

            error: function() {
                showMessage('Server error', 'Ensure that the server is running');
            },

            success: function(response) {
                if (response.error){
                    showMessage(response.error, response.description);
                    return
                }

                try {
                    var records = [];
                    var keys_table = [];
                    var values_table = [];

                    // transform data to fit dynatable
                    for (var type in response){
                        if (type !== 'nodes' && type !== 'relations'&& type !== 'ways') continue;
                        for (var key in response[type]) {
                            for (var value in response[type][key]) {
                                records.push({
                                    type: type,
                                    key: key,
                                    value: value,
                                    count: response[type][key][value]
                                });
                            }
                        }
                    }
                    for (var k in response.keys) keys_table.push({key: response.keys[k]});
                    for (var v in response.values) values_table.push({value: response.values[v]});

                    // update summary table
                    $('.nodes_count').text(response.count.nodes);
                    $('.relations_count').text(response.count.relations);
                    $('.ways_count').text(response.count.ways);
                    $('.keys_count').text(response.count.keys);
                    $('.value_count').text(response.count.values);

                    // update dynatable
                    updateDynatable($('#results-table'), records);
                    updateDynatable($('#keys-table'), keys_table);

                    // update download links
                    $('.osm-download-link')
                        .text(response.download_links.osm)
                        .attr('href', response.download_links.osm);
                    $('.json-download-link')
                        .text(response.download_links.json)
                        .attr('href', response.download_links.json);

                    showMessage('Completed', 'A download link will be generated for you, along with the tag analysis');
                    setTimeout(function(){
                        hideMessage();
                    }, 1000);

                } catch(e) {
                    showMessage('Client Error', 'Encountered an error displaying returned result :(');
                }
            }
        });
        return false;
    });

    function updateDynatable($table, records){
        var dynatable = $table.data('dynatable');
        dynatable.records.updateFromJson({records: records});
        dynatable.records.init();
        dynatable.process();
    }
    function showMessage(message, description) {
        if (!description) description = '';
        $('.message').finish().html(message).fadeIn();
        $('.description').finish().html(description).fadeIn();
        $('.message-container').fadeIn();
        $('.main-container').fadeOut();
        adjustHeight();
    }

    function hideMessage(ms){
        $('.message-container').fadeOut();
        $('.main-container').fadeIn(2000);
    }

    function adjustHeight() {
        var height = $(window).innerHeight();
        $('.left-container').height(height);
        $('.message-container').height(height);
        $('.message').css('top', (height/2) - $('p.message').height()+ 'px');
        $('.description').css('top', (height/2) + 'px');
    }
    $(window).resize(function() {
        adjustHeight();
    });
});