let groups = []; // Stores multiple groups of ellipses
let tempEllipses = []; // Stores ellipses while drawing
let fadeCount;
let fadeDuration;
// 5 seconds in milliseconds
let cloudColor;
const minY = 30; // Minimum Y to prevent cutoff
console.log(currentSky)



function startWeather() {
  
  }

function setup() {
    createCanvas(2 * windowWidth, 2 * windowHeight);
    window.scrollTo(0, 0); // Ensure canvas starts at top
}

function windowResized() {
    resizeCanvas(2 * windowWidth, 2 * windowHeight); // Match original scale
    window.scrollTo(0, 0); // Keep canvas in view on resize
}

function draw() {
    let fadeCount = $('#times').val()


    let fadeDuration = fadeCount * 1000; 
    console.log(fadeCount)
    if (currentSky === 'purple-city-sky') {
        cloudColor = [243, 146, 249];
    } else if (currentSky === 'blue-mountain-sky') {
        cloudColor = [183, 230, 241];
    } else if (currentSky === 'orange-desert-sky') {
        cloudColor = [243, 194, 125];
    } else if (currentSky === 'pink-cherry-sky') {
        cloudColor = [255, 255, 255];
    } else if (currentSky === 'green-beach-sky') {
        cloudColor = [255, 255, 255];
    }

    clear();
    startWeather();
    let currentTime = millis(); // Get current time

    // Draw and update all stored groups
    for (let i = groups.length - 1; i >= 0; i--) {
        let group = groups[i];

        // Move the entire group (slower)
        if (group.moving) {
            group.x += group.speed * 0.5; // Reduce movement speed by half
        }

        // Calculate fading based on time elapsed
        let elapsedTime = currentTime - group.startTime;
        let fadeFactor = 1 - (elapsedTime / fadeDuration); // Reduce opacity over time
        fadeFactor = constrain(fadeFactor, 0, 1); // Keep within valid range

        // If fully transparent, remove the group
        if (fadeFactor <= 0) {
            groups.splice(i, 1);
            continue; // Skip rendering this group
        }

        // Draw all ellipses in the group relative to the group's position
        for (let e of group.ellipses) {
            let newOpacity = fadeFactor * 255; // Gradually fade to transparent
            fill(...cloudColor, newOpacity); // Apply fading
            noStroke();
            ellipse(e.x + group.x, e.y, e.size);
        }
    }

    // Draw the temporary ellipses while the mouse is held down
    for (let e of tempEllipses) {
        fill(...cloudColor, 255); // Fully visible while drawing
        noStroke();
        ellipse(e.x, e.y, e.size);
    }
}

// Create multiple ellipses while holding the mouse down
function mouseDragged() {
    tempEllipses.push({
        x: mouseX,
        y: max(minY, mouseY), // Ensure not too close to the top
        size: random(30, 80),
    });
}

// On release, store all drawn ellipses as one moving group
function mouseReleased() {
    if (tempEllipses.length > 0) {
        groups.push({
            ellipses: tempEllipses, // Store the whole shape
            x: 0, // Track horizontal movement
            speed: random(0.5, 1) * (random() > 0.5 ? 1 : -1), // Move left/right (half as fast)
            moving: true, // Start movement only after release
            startTime: millis(), // Save the time when movement starts
        });
    }
    tempEllipses = []; // Clear temp storage
}
