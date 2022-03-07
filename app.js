// Am folosit un API care furnizeaza date despre jocuri free de pe diferite platforme

const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    headers: {
      'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
      'x-rapidapi-key': '1d8df5195bmsh782fbb0010b075bp13034ejsn158cf937caff'
    }
  };
  const gameName = axios.request(options).then(function (response) {
    /*Am ales sa folosesc 'for loop' pentru a putea genera continutul intr-un mod dinamic,
    in asa fel incat daca se modifica datele despre jocuri si continutul de pe site sa fie actualizat. */
    for(let i = 0; i < 12; i++) {
      // aici printam continutul in consola pentru a verifica daca primesc datele
        console.log(response.data[i]);  
        const div = document.querySelector('#divTitles');

        // salvez descrierea jocului intr-o variabila, creez un paragraf si adaug o clasa pentru a edita mai tarziu in CSS
        const description = document.createElement('p');
        description.innerText = response.data[i].short_description;
        description.className = 'description'

        // creez alt paragraf care contine platforma/platformele pe care este disponibil jocul si ii adaug o clasa
        const platform = document.createElement('p');
        platform.innerText = 'Platform:' + ' ' + response.data[i].platform
        description.className = 'platform'

        // facem un h2 care contine titlul jocului + clasa 
        const gameTitle = document.createElement('h2');
        gameTitle.innerText = response.data[i].title;
        gameTitle.className = "gameTitle";

        // inseram si imaginea aferenta fiecarui joc + o clasa
        const imgs = document.createElement('IMG')
        imgs.src = response.data[i].thumbnail
        imgs.className = 'gameThumb'

        /* aici am ales sa ma folosesc de div-uri cu id #gameCard (container-ul fiecarui joc) create de mine in index.html.
         mi-a fost mai usor sa integrez totul in div-uri deja create decat sa le generez dinamic in functie de rezultat */
        const gameCard = document.querySelector('#gameCard')

        // am creat un buton pentru fiecare #gameCard care te redirectioneaza catre site-ul jocului
        const btn = document.createElement('a')
        btn.innerText = 'Take me to the game'
        btn.className = 'btn'
        btn.href = response.data[i].game_url
        
        // am folosit append si insertAdjacentElement pentru a atasa componentele pe site
        div.append(gameCard)
        gameCard.append(gameTitle);
        gameTitle.insertAdjacentElement('afterend', imgs);
        gameTitle.insertAdjacentElement('afterend', description);
        description.insertAdjacentElement('afterend', platform)
        gameCard.append(btn);

        //am folosit o librarie pentru a aplica o tranzitie atunci cand utilizatorul scrolleaza : https://scrollrevealjs.org/
        ScrollReveal().reveal('#title', {delay: 100});
        ScrollReveal().reveal('#gameCard', {delay: 200});
        ScrollReveal().reveal('.gameTitle', {delay: 400});
        ScrollReveal().reveal('.gameThumb', {delay: 600});

        
      }
      // un catch in caz ca ceva merge prost :)
  }).catch(function (error) {
      console.error(error);
  });
