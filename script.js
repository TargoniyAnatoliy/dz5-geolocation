let gallery = document.querySelector('#cards-gallery');
let addBtn = document.querySelector('#add-cards');
let removeBtn = document.querySelector('#remove-cards');

gallery.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'card-btn':
            e.target.nextElementSibling.classList.add('hotel-map-active');
            break;
        case 'close-map-btn':
            e.target.parentElement.classList.remove('hotel-map-active');
            break;
    }
});

addBtn.addEventListener('click', addCards);
removeBtn.addEventListener('click', removeCards);



class Card {
    constructor(image, title, text, map) {
        this.image = image;
        this.title = title;
        this.text = text;
        this.map = map;
    }

    createCard() {
        let colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.innerHTML = `<div class="card">
                    <img src="${this.image}" class="card-img-top" alt="${this.title}">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">${this.text}</p>
                    </div>
                    <button id="card-btn" class="btn btn-primary">Показати на мапі</button>
                    <div class="hotel-map">
                        <button id="close-map-btn" type="button" class="btn-close">
                            <i class="bi bi-x"></i>
                        </button>
                        <iframe
                            src="${this.map}"
                            width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>`;
        return colDiv;
    }
}

function addCards() {
    // Оголошуємо змінну для зберігання масиву даних
    let cardsArr;

    // Викликаємо fetch, щоб отримати дані з файлу hotels.json
    fetch('https://targoniyanatoliy.github.io/dz5-geolocation/data/hotels.json')
        .then(response => response.json()) // Парсимо відповідь у формат JSON
        .then(json => {
            cardsArr = json; // Присвоюємо отриманий масив даних змінній cardsArr
            // console.log(cardsArr); // Виводимо отриманий масив даних
            // Тут ви можете виконати будь-які подальші дії з отриманим масивом cardsArr
            for (let i = 0; i < cardsArr.length; i++) {
                let hotelCard = new Card(cardsArr[i].image, cardsArr[i].title, cardsArr[i].text, cardsArr[i].map);
                gallery.append(hotelCard.createCard());
            }
        })
        .catch(error => {
            console.error('Помилка при отриманні даних:', error);
        });
}

function removeCards() {
    if (gallery.children.length <= 4) return;
    else {
        for (let i = 0; i < 4; i++) {
            gallery.lastElementChild.remove();
        }
    }
}
