$(document).ready(function(){

    // global
    var check = "load"

    // reset UI
    $("#inputA").focus()
    $("#inputB").hide()

    function menuState(rol){
        console.log(rol)
        check=rol
        if (rol=="load"){
            $("#inputA").attr("placeholder","Tracking Number")
            $("#inputB").hide()
        }

        if (rol=="enroll"){
            $("#inputA").attr("placeholder","TAN")
            $("#inputB").hide()
        }

        if (rol=="claims"){
            $("#inputB").show()
            $("#inputA").attr("placeholder","TAN")
            $("#inputB").attr("placeholder","Submitter ID")
        }

        if (rol=="remit"){
            $("#inputB").show()
            $("#inputA").attr("placeholder","TAN")
            $("#inputB").attr("placeholder","Receiver/Submitter ID")
        }
    }

    // navigation
    $(".nav-link").click(function(){
        $(".nav-link").removeClass("active")
        $(this).addClass("active")
        let rol = $(this).attr("role")
        $("#inputA").val("")
        $("#inputB").val("")
        $("#inputA").focus()
        menuState(rol)
    })

    // capture enter key for approp button
    document.addEventListener("keyup", function(event) {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
             $(".performLookup").click()
        }
    });

    // submission
    $(".performLookup").click(function(){
    
        // reset UI
        $(".alert-danger").hide()
        $(".alert-primary").hide()

        // searching for
        console.log("check",check)
    
        // validation
        if ($("#inputA").val() == ""){
            $(".alert-danger").show()
            return false
        }

        // perform lookup
        $.get("/tracking?id=" + $("#inputA").val(),function(results){
            if (results !== null && results.error == false) {
                $(".alert-primary").fadeIn()
                let finalResults = "<ul style='list-style-type:none'>"
                finalResults += "<li>Tracking Number: " + results.tracking + "</li>"
                finalResults += "<li>Received: " + results.received + "</li>"
                finalResults += "<li>Completed: " + results.completed + "</li>"
                finalResults += "<li>Status: " + results.status + "</li>"
                finalResults += "</ul>"
                $(".alert-primary").html(finalResults)
                
            } else {
                $(".alert-danger").fadeIn()
            }
        }).done(function(){
            $("#" + check + "PTAN").val("")
            $("#" + check + "PTAN").focus()          
        })
    })
})



