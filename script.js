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
    fetch('http://127.0.0.1:5500/data/hotels.json')
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




/*
[
    {
        image: './img/hotel1.jpeg', 
        title: 'White Villas', 
        text: `2-х поверхові окремі будиночки, розташовані в одному з найзнаменитіших курортів України -Коблево`,
        map: `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5509.581270195974!2d31.2203655!3d46.6165453!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c66bb2bef714f1%3A0x97c7ea7cceb56b5!2z0L_RgNC-0YHQv9C10LrRgiDQmtGD0YDQvtGA0YLQvdC40LksIDYxLCDQmtC-0LHQu9C10LLQtSwg0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA1NzQ1Mw!5e1!3m2!1suk!2sua!4v1718450058292!5m2!1suk!2sua`
    }, 
    {
        image: './img/hotel2.jpeg',
        title: 'De La Vita', 
        text: `Готель розташований на першій береговій лінії, в найпопулярнішому курорті Миколаївській
        області-Коблево`,
        map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d955.3172715364365!2d31.21346999229365!3d46.62078539316895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c66b1e13afbbbd%3A0x55783531bc4872e6!2sDe%20La%20Vita!5e1!3m2!1suk!2sua!4v1718457519454!5m2!1suk!2sua`
    }, 
    {
        image: './img/hotel3.jpeg',
        title: 'Valen Park Pension', 
        text: `Готель розташований на першій береговій лінії, в найпопулярнішому курорті Миколаївській
        області-Коблево`,
        map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1935.309554847864!2d31.212396841762303!3d46.6210133649521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c66baafd5b9a7f%3A0xb2a3eec7f9a1a3b4!2z0L_RgNC-0YHQv9C10LrRgiDQmtGD0YDQvtGA0YLQvdC40LksIDQxLCDQmtC-0LHQu9C10LLQtSwg0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA1NzQ1Mw!5e1!3m2!1suk!2sua!4v1718457481963!5m2!1suk!2sua`
    }, 
    {
        image: './img/hotel4.jpeg', 
        title: 'Friday Wood', 
        text: `Готель розташований на першій береговій лінії, в найпопулярнішому курорті Миколаївській
        області-Коблево`,
        map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1359.6727055520898!2d31.212087947881255!3d46.622726408024754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c66baa79e921ef%3A0xd7c4a9464ec4fe6!2z0L_RgNC-0YHQv9C10LrRgiDQmtGD0YDQvtGA0YLQvdC40LksIDI5LCDQmtC-0LHQu9C10LLQtSwg0JzQuNC60L7Qu9Cw0ZfQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA1NzQyOA!5e1!3m2!1suk!2sua!4v1718457581724!5m2!1suk!2sua`
    }]
*/