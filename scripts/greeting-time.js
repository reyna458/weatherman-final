$(document).ready(function () {

var today = new Date()
var curHr = today.getHours()

if (curHr < 12) {
    $('#hello').html('Good Morning.')
    } else if (curHr < 18) {
    $('#hello').html('Good Afternoon.')
    } else {
    $('#hello').html('Good Evening.')
    }

    let messages = [
        "Press T for thunder.",
        "Press B for birds singing.",
        "Press W for wind.",
        "Press R for rainbow.",
        "Press S for a siren.",
        "Try drawing some clouds."
    ];
    
    // Update that text
    function updateText() {
        let randomIndex = Math.floor(Math.random() * messages.length); 
        $('.fill').text(messages[randomIndex]); 
    }
    
    updateText(); 
    setInterval(updateText, 15000); 


    $('#greeting-trigger').click(function() {
        $('#greeting').toggleClass('hidden')
        $('#greeting-trigger').toggleClass('selected')
    })

    
    $('#suggestions-trigger').click(function() {
        $('#suggestions').toggleClass('hidden')
        $('#suggestions-trigger').toggleClass('selected')
    })

    $('#movebg').click(function() {
        $('#movebg').toggleClass('selected')
    })

    $('#reset').click(function() {
        alert("Careful! This will reset the whole thing!")
        $('#reset-true').css("opacity", "1")
        $('#reset').css("display", "none")
    })

    $('#reset-true').click(function() {
        location.reload();
    })

    $('#showtimer').click(function() {
        $('#time').toggleClass('hidden')
        $(this).toggleClass('selected')
    })
})