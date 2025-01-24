let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let firstattempt = true;
let isActive = true;
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onstart = () => {
    voice.style.display = "block"; // Show the GIF when speaking starts
};

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    // content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};
function wishMe() {
    let hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning!");
    } else if (hour >= 12 && hour < 18) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
    speak("How may I assist you?");
}


btn.addEventListener("click", () => {
    if (isActive) {
        recognition.start();
        btn.style.display = "none";
        voice.style.display = "block";
    }
});


function takeCommand(message) {
    btn.style.display="flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey")) {
        if(firstattempt == true){
            firstattempt = false;
            wishMe();
            
            return;
        }
        else{
        speak("Hello, how may I help you?");}
    } 
    else if(message.includes("what is the time")|| message.includes("tell me the time")){
        let now = new Date();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hour >= 12 ? "PM" : "AM"; // AM or PM
        hour = hour % 12 || 12;
        speak(`The time is ${hour}:${minutes < 10 ? "0" + minutes : minutes} ${ampm}.`);
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube.");
        window.open("https://www.youtube.com");
    } else if (message.includes("open google")) {
        speak("Opening Google.");
        window.open("https://www.google.com");
    }
    else if(message.includes("open chatgpt")){
        speak("Opening chatgpt.");
        window.open("https://www.chatgpt.com");
    }
    else if (message.includes("exit") || message.includes("stop")) {
        speak("Goodbye! Have a great day!");
        isActive = false;
        recognition.stop(); 
        btn.style.display = "flex"; 
        voice.style.display = "none"; 
        return;
    }
    
    else{
        speak("searching.      This is what i found");
        window.open(`https://www.google.com/search?q=${message}`);
    }
}
