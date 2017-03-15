$(document).ready(function(){
    $("#download").click(function(){
        $("#content").hide();
        $("#loading").show();
        $("#download").prop("disabled", true);

        var dtype = $("input:radio[name='dtype']:checked").val();
        chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
            console.log(tabs);
            console.log(tabs[0].url);
            var url = tabs[0].url;
            var data = {
                type: dtype,
                url: url,
            };
            $.ajax({
                url: "http://localhost:8080",
                method: "POST",
                data: data,
                dataType: "text",
                error: function(xhr, status, err){
                    console.log(status);
                    console.log(err);
                    var errstring = "Unexpected error";
                    if(err !== undefined && err !== null && err !== ""){
                        errstring = "Error: "+err;
                    }
                    if(xhr.responseText !== undefined && xhr.responseText !== null){
                        errstring += " Reason: "+xhr.responseText;
                    }
                    $("#content").text(errstring);
                    $("#content").show();
                },
                success: function(data, status, xhr){
                    console.log(status);
                    console.log(data);
                    $("#content").text(data);
                    $("#content").show();
                },
                complete: function(xhr, status){
                    $("#loading").hide();
                    $("#download").prop("disabled", false);
                },
            });
        });
    });
})
