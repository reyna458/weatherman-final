let currentForeground;
let currentMidground;
let currentBackground;
let currentSky = 'purple-city-sky';
let currentWeather;
let uiColor;

function updateBackground() {
    const bgImages = 
      'url(../assets/' + currentWeather + '.gif), ' +
      'url(../assets/' + currentForeground + '.png), ' +
      'url(../assets/' + currentMidground + '.png), ' +
      'url(../assets/' + currentBackground + '.png), ' +
      'url(../assets/' + currentSky + '.png)';
  
    console.log("Setting background-image to:", bgImages);
  
    $('html').css('background-image', bgImages);

    if (currentSky === 'purple-city-sky') {
        uiColor = '#730079'
    } else if (currentSky === 'blue-mountain-sky') {
        uiColor = '#0B2D3D'
    } else if (currentSky === 'orange-desert-sky') {
        uiColor = '#784600'
    } else if (currentSky === 'pink-cherry-sky') {
        uiColor = '#BC6CC0'
    } else if (currentSky === 'green-beach-sky') {
        uiColor = '#162B1D'
    }

    $('.changeUI').css("background-color", uiColor)
  }

  

  

$(document).ready(function () {

  
// Define your sounds globally
const weatherSounds = {
  raineffect: new Audio('../sounds/rain.mp3'),
  sandstorm: new Audio('../sounds/desert.mp3'),
  snoweffect: new Audio('../sounds/snow.mp3'),
  cherryeffect: new Audio('../sounds/cherry.mp3')
};

// Optional: set loop and volume for all
for (let sound of Object.values(weatherSounds)) {
  sound.loop = true;
  sound.volume = 0.1;
}

let currentlyPlaying = null;

function startWeather() {
  const newSound = weatherSounds[currentWeather];

  // Stop currently playing sound
  if (currentlyPlaying && currentlyPlaying !== newSound) {
    currentlyPlaying.pause();
    currentlyPlaying.currentTime = 0;
    currentlyPlaying = null;
  }

  // Play the new sound only if it's defined
  if (newSound) {
    newSound.play();
    currentlyPlaying = newSound;
  }
}




    setInterval(function() {
        $('#hover').css("display", "none")
    }, 10000)
  // Default
  currentForeground = 'purple-city-foreground';
  currentMidground = 'purple-city-midground';
  currentBackground = 'purple-city-background';
  currentSky = 'purple-city-sky';
  currentWeather = '';

  updateBackground();



  // Generic handler
  $('.theme-button').click(function () {
    const type = $(this).data('type');     // foreground, midground, etc.
    const theme = $(this).data('theme');   // city, desert, mountain

    // Update the correct variable
    switch (type) {
      case 'foreground':
        currentForeground = getAssetName(theme, 'foreground');
        break;
      case 'midground':
        currentMidground = getAssetName(theme, 'midground');
        break;
      case 'background':
        currentBackground = getAssetName(theme, 'background');
        break;
      case 'sky':
        currentSky = getAssetName(theme, 'sky');
        break;
      case 'weather':
        currentWeather = getWeatherEffect(theme);
        break;
    }

    updateBackground();
    console.log("working")
    $(this).parent().find('.selected').removeClass('selected')
    $(this).addClass('selected')
    startWeather();
  });

  $('#movebg').click(function() {
    $('#html').toggleClass('move')
    $('#html').toggleClass("nomove")
  })

  $('#customize').click(function () {
    $('#customize-menu').toggleClass('show');
  });

  $('#settings').click(function () {
    $('#settings-menu').toggleClass('show');
  });

  $('#info-button').click(function () {
    $('#info-menu').toggleClass('show');
  });

  $('#city').click(function () {
    currentForeground = getAssetName('city', 'foreground');
    currentMidground = getAssetName('city', 'midground');
    currentBackground = getAssetName('city', 'background');
    currentSky = getAssetName('city', 'sky');
    currentWeather = ''
    updateBackground();
    startWeather();
    $('[data-theme]').removeClass("selected");
    $('[data-theme="city"]').addClass("selected");
  });
  
  $('#desert').click(function () {
    currentForeground = getAssetName('desert', 'foreground');
    currentMidground = getAssetName('desert', 'midground');
    currentBackground = getAssetName('desert', 'background');
    currentSky = getAssetName('desert', 'sky');
    currentWeather = getWeatherEffect('desert');
    updateBackground();
    startWeather();
    $('[data-theme]').removeClass("selected");
    $('[data-theme="desert"]').addClass("selected");
  });
  
  $('#mountains').click(function () {
    currentForeground = getAssetName('mountain', 'foreground');
    currentMidground = getAssetName('mountain', 'midground');
    currentBackground = getAssetName('mountain', 'background');
    currentSky = getAssetName('mountain', 'sky');
    currentWeather = getWeatherEffect('mountain');
    updateBackground();
    startWeather();
    $('[data-theme]').removeClass("selected");
    $('[data-theme="mountain"]').addClass("selected");
  });

  $('#cherry').click(function () {
    currentForeground = getAssetName('cherry', 'foreground');
    currentMidground = getAssetName('cherry', 'midground');
    currentBackground = getAssetName('cherry', 'background');
    currentSky = getAssetName('cherry', 'sky');
    currentWeather = getWeatherEffect('cherry');
    updateBackground();
    startWeather();
    $('[data-theme]').removeClass("selected");
    $('[data-theme="cherry"]').addClass("selected");
  });

  $('#beach').click(function () {
    currentForeground = getAssetName('beach', 'foreground');
    currentMidground = getAssetName('beach', 'midground');
    currentBackground = getAssetName('beach', 'background');
    currentSky = getAssetName('beach', 'sky');
    currentWeather = 'raineffect'
    updateBackground();
    startWeather();
    $('[data-theme]').removeClass("selected");
    $('[data-theme="beach"]').addClass("selected");
  });

  $('#none').click(function() {
    currentWeather = ''
    updateBackground()
    startWeather()
  })

  $(function() {
    $("#customize-menu").draggable();
});

$(function() {
    $("#settings-menu").draggable();
});

$(function() {
  $('#info-menu').draggable()
})

$('.x').click(function() {
    $(this).parent().parent().toggleClass('show')
})

  
});

// Helper to build image file names
function getAssetName(theme, layer) {
  let color = '';
  switch (theme) {
    case 'city': color = 'purple'; break;
    case 'desert': color = 'orange'; break;
    case 'mountain': color = 'blue'; break;
    case 'cherry': color = 'pink'; break;
    case 'beach': color = 'green'; break;
  }
  return `${color}-${theme}-${layer}`;
}

function getWeatherEffect(theme) {
  switch (theme) {
    case 'city': return '';
    case 'desert': return 'sandstorm';
    case 'mountain': return 'snoweffect';
    case 'cherry': return 'cherryeffect'
    case 'beach': return 'raineffect'
  }
}
