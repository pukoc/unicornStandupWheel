// Create new wheel object specifying the parameters at creation time.
let theWheel = new Winwheel({
    outerRadius: 212, // Set outer radius so wheel fits inside the background.
    innerRadius: 1, // Make wheel hollow so segments don't go all way to center.
    textFontSize: 25, // Set default font size for the segments.
    textOrientation: 'horizontal', // Make text vertial so goes down from the outside of wheel.
    textAlignment: 'outer', // Align text to outside of wheel.
    numSegments: 9, // Specify number of segments.
    // Define segments including colour and text.
    segments: [
        // font size and test colour overridden on backrupt segments.
        { fillStyle: '#F4C8BD', text: 'Torsten' },
        { fillStyle: '#E8BACB', text: 'Mahmoud' },
        { fillStyle: '#D0A9B1', text: 'Isabela' },
        { fillStyle: '#B599C0', text: 'Igor' },
        { fillStyle: '#97CCDC', text: 'Victoria' },
        { fillStyle: '#84C3B4', text: 'Jason' },
        { fillStyle: '#A9D193', text: 'Aliki' },
        { fillStyle: '#D5E3AC', text: 'Gabor' },
        { fillStyle: '#F4BE6A', text: 'Eugen' },
    ],
    // Specify the animation to use.
    animation: {
        type: 'spinToStop',
        duration: 10, // Duration in seconds.
        spins: 3, // Default number of complete spins.
        callbackFinished: alertPrize,
        callbackSound: playSound, // Function to call when the tick sound is to be triggered.
        soundTrigger: 'pin', // Specify pins are to trigger the sound, the other option is 'segment'.
    },
    // Turn pins on.
    pins: {
        number: 9,
        fillStyle: 'gold',
        outerRadius: 5,
    },
});
// Loads the tick audio sound in to an audio object.
let spinAudio = new Audio('tick.mp3');

// This function is called when the sound is to be played.
function playSound() {
    // Stop and rewind the sound if it already happens to be playing.
    spinAudio.pause();
    spinAudio.currentTime = 0;

    // Play the sound.
    spinAudio.play();
}

// Vars used by the code in this page to do power controls.
let wheelPower = 0;
let wheelSpinning = false;

// -------------------------------------------------------
// Function to handle the onClick on the power buttons.
// -------------------------------------------------------
function powerSelected(powerLevel) {
    // Ensure that power can't be changed while wheel is spinning.
    if (wheelSpinning == false) {
        // Reset all to grey incase this is not the first time the user has selected the power.
        document.getElementById('pw1').className = 'button';
        document.getElementById('pw2').className = 'button';
        document.getElementById('pw3').className = 'button';

        // Now light up all cells below-and-including the one selected by changing the class.
        if (powerLevel >= 1) {
            document.getElementById('pw2').className = 'button';
            document.getElementById('pw3').className = 'button';
            document.getElementById('pw1').className = 'button is-primary is-active';
        }

        if (powerLevel >= 2) {
            document.getElementById('pw1').className = 'button';
            document.getElementById('pw2').className = 'button is-primary is-active';
        }

        if (powerLevel >= 3) {
            document.getElementById('pw2').className = 'button';
            document.getElementById('pw3').className = 'button is-primary is-active';
        }

        // Set wheelPower var used when spin button is clicked.
        wheelPower = powerLevel;

        // Light up the spin button by changing it's source image and adding a clickable class to it.
        document.getElementById('spin_button').className =
            'button is-primary is-fullwidth ';
        document.getElementById('spin_button').disabled = false;
    }
}

// -------------------------------------------------------
// Click handler for spin button.
// -------------------------------------------------------
function startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if (wheelSpinning == false) {
        // Based on the power level selected adjust the number of spins for the wheel, the more times is has
        // to rotate with the duration of the animation the quicker the wheel spins.
        if (wheelPower == 1) {
            theWheel.animation.spins = 3;
        } else if (wheelPower == 2) {
            theWheel.animation.spins = 6;
        } else if (wheelPower == 3) {
            theWheel.animation.spins = 10;
        }

        // Disable the spin button so can't click again while wheel is spinning.
        document.getElementById('spin_button').disabled = true;
        document.getElementById('reset_button').className =
            'button is-primary is-outlined is-fullwidth  mt-4';
        // Begin the spin animation by calling startAnimation on the wheel object.
        theWheel.startAnimation();

        // Set to true so that power can't be changed and spin button re-enabled during
        // the current animation. The user will have to reset before spinning again.
        wheelSpinning = true;
    }
}

// -------------------------------------------------------
// Function for reset button.
// -------------------------------------------------------
function resetWheel() {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.

    document.getElementById('pw1').className = 'button'; // Remove all colours from the power level indicators.
    document.getElementById('pw2').className = 'button';
    document.getElementById('pw3').className = 'button';

    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
}

// -------------------------------------------------------
// Called when the spin animation has finished by the callback feature of the wheel because I specified callback in the parameters.
// -------------------------------------------------------
function alertPrize(indicatedSegment) {
    alert('You are on today ' + indicatedSegment.text);
}

let quotes = ["\"Dude, suckin' at something is the first step at being sorta good at something.\"<br>-  Jake <small><em>(Adventure Time)</em></small>", "\"Either I will find a way, or I will make one.\"<br> - Philip Sidney", "\"Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.\"<br>- Thomas A. Edison", "\"You are never too old to set another goal or to dream a new dream.\"<br>- C.S Lewis", "\"If you can dream it, you can do it.\"<br>- Walt Disney", "\"Never give up, for that is just the place and time that the tide will turn.\"<br>- Harriet Beecher Stowe", "\"I know where I'm going and I know the truth, and I don't have to be what you want me to be. I'm free to be what I want.\"<br>- Muhammad Ali", "\"If you always put limit on everything you do, physical or anything else. It will spread into your work and into your life. There are no limits. There are only plateaus, and you must not stay there, you must go beyond them.\"<br>- Bruce Lee",];

function genQuote() {
    var randNum = Math.floor(Math.random() * (quotes.length));
    document.getElementById('quote').innerHTML = quotes[randNum];
}
window.onload = (event) => {
    genQuote();
  };