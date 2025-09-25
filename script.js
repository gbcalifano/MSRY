document.addEventListener('DOMContentLoaded', () => {
    // --- Setup Jukebox ---
    const playButton = document.getElementById('play-button');
    const songTitleElem = document.getElementById('song-title');
    const songDescriptionElem = document.getElementById('song-description');
    const miseryLevelSpan = document.getElementById('misery-level');
    const miseryBar = document.getElementById('misery-bar');
    const playerContainer = document.getElementById('player-container');

    const songs = [
        { title: "AVARO DI LAVORO", description: "EFFETTO: LAVORI MA RESTI COMUNQUE SOTTO LA SOGLIA DI POVERTA'.", misery: 87, url: "Avaro di lavoro.wav" },
        { title: "IMMAGINA", description: "EFFETTO: RIMOZIONE DEI RICORDI FELICI.", misery: 74, url: "Immagina (Sinigallia).wav" },
        { title: "LASCIAMI CADERE", description: "EFFETTO: CADUTA FUOR DI METAFORA, LETTERALE.", misery: 42, url: "Lasciami Cadere.wav" },
        { title: "FUORI TEMPO", description: "EFFETTO: RIPETIZIONE OSSESSIVA DEGLI STESSI ERRORI.", misery: 56, url: "Fuori tempo.wav" },
        { title: "I PIEDI PER TERRA", description: "EFFETTO: PROBABILMENTE UNA MALATTIA.", misery: 79, url: "I piedi per terra - 11/02/19, 11.06.wav" },
        { title: "SE NON TROVI PACE", description: "EFFETTO: NIENTE, NON LA TROVI.", misery: 23, url: "Se non trovi pace (Alternate) - 08/01/22, 12.13.wav" },
        { title: "ALLUCINAZIONE", description: "EFFETTO: VEDI LA POLVERE ACCUMULARSI IN TEMPO REALE.", misery: 61, url: "Allucinazione - 16/03/19, 12.55.wav" },
        { title: "QUANDO ARRIVA IL BUIO", description: "EFFETTO: PARALISI DEL SONNO. IL DEMONE DELLA PARALISI TI ELENCA LE FORMAZIONI DEL NAPOLI DEGLI ULTIMI 13 ANNI.", misery: 90, url: "3 Quando arriva il buio.mp3" },
        { title: "A VOLTE", description: "EFFETTO: MOMENTANEA SENSAZIONE DI CONTENTEZZA.", misery: 2, url: "A VOLTE.wav" },
        { title: "COME UN GATTO NERO", description: "EFFETTO: SONNO SENZA SOGNI. ANDARE A DORMIRE SOLO PER PREGUSTARE IL NULLA ETERNO.", misery: 88, url: "2 COME UN GATTO NERO.mp3" },
        { title: "CI VEDIAMO DOMANI", description: "EFFETTO: MAL DI GOLA, VOCE GLITCHATA.", misery: 25, url: "3 CI VEDIAMO DOMANI.mp3" },
        { title: "ANDIAMO A DORMIRE", description: "EFFETTO: SENSAZIONE PROLUNGATA DI CADERE NEL VUOTO.", misery: 92, url: "4 Andiamo a dormire.mp3" },
        { title: "ANCORA UN ALTRO AUTUNNO", description: "EFFETTO: RIPETIZIONE OSSESSIVA DEGLI STESSI ERRORI.", misery: 33, url: "Ancora un altro autunno (Demo).wav" },
        { title: "LA SOLITUDINE DEI MOSTRI", description: "EFFETTO: ANSIA, MAL DI TESTA, MALUMORE, PAURA DEL BUIO.", misery: 86, url: "La solitudine dei mostri.wav" },
        { title: "SE VUOI TOCCARMI DAVVERO", description: "EFFETTO: BISOGNO IMPELLENTE DI FINIRE SOTTO A UN TRENO.", misery: 99, url: "Master 6 - Se vuoi toccarmi davvero.wav" }
    ];

    playButton.addEventListener('click', selectRandomSong);

    function selectRandomSong() {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const selectedSong = songs[randomIndex];
        updateUI(selectedSong);
    }

    function updateUI(song) {
        songTitleElem.textContent = song.title;
        songDescriptionElem.textContent = song.description;
        miseryLevelSpan.textContent = song.misery + '%';
        miseryBar.style.width = `${song.misery}%`;
        playerContainer.innerHTML = '';
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = song.url;
        playerContainer.appendChild(audioPlayer);
        audioPlayer.play();
    }

    const animationContainer = document.getElementById('background-animation');
    
    const faceSize = window.innerWidth <= 640 ? 100 : 150; 
    
    const faceImageUrls = [
        'ago.png',
        'pietro.png',
        'marco.png',
        'dario.png',
        'gb.png'
    ];

    const floatingElements = [];
    const speed = 3;

    faceImageUrls.forEach(url => {
        const el = document.createElement('div');
        el.classList.add('floating-face');
        el.style.backgroundImage = `url(${url})`;
        animationContainer.appendChild(el);

        floatingElements.push({
            el: el,
            x: Math.random() * (window.innerWidth - faceSize),
            y: Math.random() * (window.innerHeight - faceSize),
            dx: (Math.random() - 0.5) * speed, // Direzione e velocità casuale
            dy: (Math.random() - 0.5) * speed,
            size: faceSize
        });
    });

    function animate() {
        floatingElements.forEach((item, index) => {
            // Muovi l'elemento
            item.x += item.dx;
            item.y += item.dy;

            // Controlla collisione con i bordi
            if (item.x <= 0 || item.x >= window.innerWidth - item.size) {
                item.dx *= -1;
            }
            if (item.y <= 0 || item.y >= window.innerHeight - item.size) {
                item.dy *= -1;
            }
            
            for (let i = index + 1; i < floatingElements.length; i++) {
                const otherItem = floatingElements[i];
                const dist = Math.sqrt(Math.pow(item.x - otherItem.x, 2) + Math.pow(item.y - otherItem.y, 2));

                if (dist < item.size) { // Se si toccano
                    [item.dx, otherItem.dx] = [otherItem.dx, item.dx];
                    [item.dy, otherItem.dy] = [otherItem.dy, item.dy];

                    // Effetto visivo
                    item.el.classList.add('colliding');
                    otherItem.el.classList.add('colliding');
                    setTimeout(() => {
                        item.el.classList.remove('colliding');
                        otherItem.el.classList.remove('colliding');
                    }, 200); // Durata dell'effetto
                }
            }

            item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
});