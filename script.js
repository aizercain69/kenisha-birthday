// === APP CONFIGURATION ===
// This is where you customize everything for your friend!
const CONFIG = {
    friendName: "Kenisha",
    loginSecret: "pandi", // Change this to a secret word your friend would know

    gallery: [
        { type: 'image', src: "photo1.jpg", caption: "Chubby Harishmita ☺️" },
        { type: 'image', src: "photo2.jpg", caption: "Forced to stand there, lol" },
        { type: 'image', src: "photo3.jpg", caption: "why am I here?" },
        { type: 'image', src: "photo4.jpg", caption: "still immature back then 😜" },
        { type: 'image', src: "photo5.jpg", caption: "best MOM 🥰" },
        { type: 'image', src: "photo6.jpg", caption: "COOL family 😎" },
        { type: 'image', src: "photo7.jpg", caption: "sleepy faceee 🤔" },
        { type: 'image', src: "photo8.jpg", caption: "fake smiling for photo " },
        { type: 'image', src: "photo9.jpg", caption: "asal nen endhuku unnan ra babu annatu pettav mokham 😆" },
        { type: 'image', src: "photo10.jpg", caption: "eppud nidra mokham eskone untav 😪" },
        { type: 'image', src: "photo11.jpg", caption: "FEST ante matram bane ready avthav 😛" },
        { type: 'image', src: "photo12.jpg", caption: "best DAD 🥰" },
        { type: 'image', src: "photo13.jpg", caption: "kallu mooseyadam, chi chi so unproffesional 🫣" },
        { type: 'image', src: "photo14.jpg", caption: "Kothi mokham 🤪" },
        { type: 'image', src: "photo15.jpg", caption: "photo teskovadam kuda radhu, papam " },
        { type: 'image', src: "photo16.jpg", caption: "mugguriki mugguru saripoyaru 😂" },
        { type: 'image', src: "photo17.jpg", caption: "overaction cheyyamante first untav 🙄" },
        { type: 'image', src: "photo18.jpg", caption: "queen Elizabeth mari 😒" },
        { type: 'image', src: "photo19.jpg", caption: "best brother u can ask for 🥰" },
        { type: 'image', src: "photo20.jpg", caption: "final ga navvadam nerchukunnav 🤭" },
        { type: 'video', src: "video1.mp4", caption: "A little extra surprise!" },
        { type: 'video', src: "dance.mp4", caption: "And to finish... your amazing talent!(edho JENNIE la dance esinattu feel aipovadam 😝)" }
    ],

    finalNote: `Hiiiii PANDI!!!!!!\n\nJust wanted to write a quick note to say how amazing you are. Happy Birthday to the best little sister(even when you steal my snacks)! You're growing up way too fast, I still remember the whole day crying Harishmita >.<\n\nNext year you might go to a different city for college, so just a small reminder to spend as much time as u can with Dad, Mum and the whole family... since you might really start missing them later on, lol. \n\n Don't take too much stress for the Mains exam, but dont take it lighty as well since its an imporant one \n\nHope your day is full of cake, laughter, and zero chores! hehehehe\n\nHappy Birthday!`,
    credits: `Have a Special day, PANDI! And Thank You for being an incredible SISTER.`
};

// === GLOBAL VARIABLES ===
let currentGalleryIndex = 0;
let audioContext;
let confettiInterval = null;

// === PAGE NAVIGATION ===
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    
    if (confettiInterval) clearInterval(confettiInterval);

    // Stop all audio when changing pages
    document.getElementById('gallery-audio').pause();
    document.getElementById('birthday-audio').pause();
    document.getElementById('gallery-video').pause(); // *** THIS IS THE FIX ***
    
    document.getElementById('app-container').style.backgroundImage = '';
    document.getElementById('app-container').style.backgroundColor = '';
    document.getElementById('emoji-container').innerHTML = '';

    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.remove('hidden');
        
        if (pageId === 'gallery-page') setupGalleryPage();
        if (pageId === 'notepad-page') setupNotepadPage();
        if (pageId === 'birthday-page') setupBirthdayPage();
        if (pageId === 'credits-page') setupCreditsPage();
    }
}

// === HELPER FUNCTION FOR TYPING ANIMATION ===
function typeAnimation(element, text, callback) {
    let i = 0;
    element.innerHTML = '';
    const cursor = document.getElementById('cursor');
    if (cursor) cursor.style.display = 'inline-block';

    const typing = setInterval(() => {
        if (i < text.length) {
            if (text.substring(i, i + 1) === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += text.charAt(i);
            }
            i++;
        } else {
            clearInterval(typing);
            if (cursor) cursor.style.display = 'none';
            if (callback) callback();
        }
    }, 75);
}

// === PAGE SETUP FUNCTIONS ===

function setupGalleryPage() {
    const galleryAudio = document.getElementById('gallery-audio');
    galleryAudio.currentTime = 0;
    galleryAudio.play();
    updateGallery();
}

function updateGallery() {
    const item = CONFIG.gallery[currentGalleryIndex];
    const imgEl = document.getElementById('gallery-image');
    const videoEl = document.getElementById('gallery-video');
    const galleryAudio = document.getElementById('gallery-audio');
    const nextButton = document.getElementById('next-button');
    
    videoEl.pause();

    if (item.type === 'video') {
        galleryAudio.pause(); // Pause background music for videos
        imgEl.classList.add('hidden');
        videoEl.classList.remove('hidden');
        videoEl.src = item.src;
        videoEl.play();
    } else { // It's an image
        if (galleryAudio.paused) {
             galleryAudio.play(); // Resume background music for images
        }
        imgEl.classList.remove('hidden');
        videoEl.classList.add('hidden');
        imgEl.src = item.src;
    }

    document.getElementById('gallery-caption').textContent = item.caption;
    
    // Hide the "Next" button if it's the last item in the gallery
    if (currentGalleryIndex === CONFIG.gallery.length - 1) {
        nextButton.style.display = 'none';
    } else {
        nextButton.style.display = 'inline-block';
    }
}

function setupNotepadPage() {
    const textElement = document.getElementById('typed-text');
    const continueButton = document.getElementById('notepad-continue-button');
    const canvas = document.getElementById('confetti-canvas');
    
    document.getElementById('app-container').style.backgroundColor = 'transparent';

    const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    confettiInterval = setInterval(() => {
        myConfetti({
            particleCount: 3,
            startVelocity: 15,
            spread: 360,
            origin: { x: Math.random(), y: Math.random() },
            gravity: 0,
            drift: 0.5,
            ticks: 3000,
            scalar: 0.6
        });
    }, 200);

    typeAnimation(textElement, CONFIG.finalNote, () => {
        continueButton.classList.remove('opacity-0');
    });
}

function setupBirthdayPage() {
    const titleEl = document.getElementById('birthday-title');
    const continueBtn = document.getElementById('birthday-continue-btn');
    const audio = document.getElementById('birthday-audio');

    document.getElementById('app-container').style.backgroundImage = `url('https://images.unsplash.com/photo-1513151233558-d8g0c5398176?q=80&w=2070&auto=format&fit=crop')`;
    audio.currentTime = 0;
    audio.play();

    startEmojiAnimation();

    const fullText = `HAPPY BIRTHDAY ${CONFIG.friendName.toUpperCase()}!`;
    typeAnimation(titleEl, fullText, () => {
        setTimeout(() => continueBtn.classList.remove('opacity-0'), 500);
    });
}

function startEmojiAnimation() {
    const emojiContainer = document.getElementById('emoji-container');
    const emojis = ['🎉', '🎂', '🎈', '🥳', '🎁'];
    setInterval(() => {
        if (document.getElementById('birthday-page').classList.contains('hidden')) return;
        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        const xStart = Math.random() * 100;
        const xEnd = (Math.random() - 0.5) * 60;
        const duration = 5 + Math.random() * 5;

        emoji.style.left = `${xStart}vw`;
        emoji.style.animationDuration = `${duration}s`;
        emoji.style.setProperty('--x-end', `${xEnd}vw`);

        emojiContainer.appendChild(emoji);

        setTimeout(() => emoji.remove(), duration * 1000);
    }, 300);
}

function setupCreditsPage() {
    document.getElementById('credits-message').textContent = CONFIG.credits;
}

document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('login-title').textContent = `A Surprise for ${CONFIG.friendName}`;
    const secretInput = document.getElementById('secret-word-input');

    const handleLogin = () => {
        if (!audioContext) {
             try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
             } catch (e) { console.warn("Could not create AudioContext.", e); }
        }
        if (secretInput.value.toLowerCase() === CONFIG.loginSecret.toLowerCase()) {
            showPage('prompt-page');
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.classList.remove('hidden');
            setTimeout(() => errorMessage.classList.add('hidden'), 2000);
        }
    };
    
    document.getElementById('unlock-button').addEventListener('click', handleLogin);
    secretInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    document.getElementById('prev-button').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex - 1 + CONFIG.gallery.length) % CONFIG.gallery.length;
        updateGallery();
    });
    document.getElementById('next-button').addEventListener('click', () => {
        currentGalleryIndex = (currentGalleryIndex + 1) % CONFIG.gallery.length;
        updateGallery();
    });
    
    document.getElementById('close-gallery-btn').addEventListener('click', () => {
        showPage('notepad-page');
    });

    document.querySelectorAll('button[data-next]').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.getAttribute('data-next'));
        });
    });

});
