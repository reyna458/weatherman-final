$('#play').click(function() {
    $('#play').css("display", "none")
    $('#greeting').toggleClass('hidden')
    $('#suggestions').toggleClass('hidden')
    $('#triggercounter').addClass('counter')
    $('#time').toggleClass('hidden')
})

$(document).ready(function()
 {

    // PLAY AUDIOS ON KEY PRESs
      
    let count = 0; 
    let recordedElements = []; // Array for the sounds
    let timerInterval;
    let loopDuration;
    
    // Sound library
    const sounds = {
        t: new Audio('./sounds/thunder.mp3'),
        w: new Audio('./sounds/wind.mp3'),
        b: new Audio('./sounds/bird.mp3'),
        r: new Audio('./sounds/rainbow.mp3'),
        s: new Audio('.sounds/siren.mp3'),
        p: new Audio('./sounds/plane.mp3')
    };
    
    // Set individual sound volumes
    sounds.b.volume = 0.1;
    sounds.r.volume = 0.25;
    sounds.s.volume = 1;
    sounds.p.volume = .3;
    
    // 
    Object.values(sounds).forEach(sound => {
        sound.preload = "auto";
    });
    
    // Start the timer 
    function startTimer() {
        timerInterval = setInterval(() => {
            count++;
            $(".counter").html(count);
            let loopDuration = $('#loops').val()
    
            recordedElements.forEach(event => {
                if (event.time === count) {
                    let audioDupe = new Audio(event.audio.src); 
                    // this is the copied sound ^^^
                    audioDupe.volume = event.volume;
                    audioDupe.play();
                }
            });
    
            // Reset counter at 60 seconds
            if (count >= loopDuration) {
                count = 0;
            }
        }, 1000);
    }
    startTimer(); // Start the counter when the page loads
    
    // Keypress code
    $(document).keydown(function(event) {
        let key = event.key.toLowerCase();
        if (sounds[key]) { // If key has an associated sound
            let soundClone = new Audio(sounds[key].src);
            soundClone.volume = sounds[key].volume;
            soundClone.play();
            
            // Save the keypress event
            recordedElements.push({ time: count, audio: soundClone, volume: sounds[key].volume });
        }
    });

    let planeLocked = false;
    let windLocked = false;

$(document).keydown(function(event) {
    let key = event.key.toLowerCase();

    if (key === 'p' && !planeLocked) {
        planeLocked = true;

        $('#airplane').removeClass('hidden').addClass('moveit');

        // After 12 seconds, reset state
        setTimeout(function() {
            $('#airplane').addClass('hidden').removeClass('moveit');
            planeLocked = false;
        }, 12000); // 12 seconds in milliseconds
    } else if (key === 'w') {
        $('#wind').removeClass('hidden').addClass('moveit')
        $('#wind1').removeClass('hidden').addClass('moveit')
        setTimeout(function() {
            $('#wind').addClass('hidden').removeClass('moveit');
            $('#wind1').addClass('hidden').removeClass('moveit');
            windLocked = false;
        }, 7000); // 12 seconds in milliseconds
    }
});

})
