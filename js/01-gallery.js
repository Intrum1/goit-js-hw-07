import { galleryItems } from "./gallery-items.js";

console.log(galleryItems);

const gallery = document.querySelector(".gallery");

/*
1. Создать разметку из массива обьектов
2. Добавить слушатель на галерею
    2.1 Если клик произошел не по картинке - то делаем ранний возврат и выходим из функции.
    2.2 Открываем модальное окно
3. Вешаем обработчик событий на клавишу Escape (только при открытом модальном окне)
4. При закрытии модального окна убираем обработчик

*/
gallery.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
gallery.addEventListener("click", handleClick);

function handleClick(event) {
  // event - это объект события, который хранит в себе всю информацию о событии, которое произошло + набор методов для работы с этим событием
  event.preventDefault(); //отмена поведения браузера по умолчанию (в данном случае отмена перехода по ссылке href)
  // coneventизошло событие(или на элемент, который это событие вызвал), в нашей ситуации этим элементом будет место, куда я кликнул | currentTarget - ссылка на дом элемент, на котором висит слушатель событий(всегда!!!) в нашем случае это список ul.gallery
  if (event.target === event.currentTarget) return; //паттер ранний возврат - проверяем негативное условие (в нашем случае это нажатие на галерею) - если оно истинно - выходим из функции оброброчика событий

  const modal = basicLightbox.create(
    `<img src="${event.target.dataset.source}" alt="${event.target.alt}" />`,
  ); // создание экземпляра для модального окна через метод create библиотеки basicLightbox

  modal.show(); // показать модальное окно

  const closeModal = ({ code }) => {
    if (code === "Escape") { // проверяем что мы нажали на клавишу ескейп
      modal.close(); // азкрываем модальное окно
      window.removeEventListener("keydown", closeModal) // после закрытия модального окна нам не нужно отслеживать нажатие на эскейп, потому что даже если мы нажмем нам нечего будет закрывать, поэтому чтобы не мучать браузер лишними оброботчиками, мы снимаем оброботчик на закрытие
    }
  };

  window.addEventListener("keydown", closeModal); // когда модальное окно открылось - доабавляем обработчик на закрытие
}

function createMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }, i) => `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>`,
    )
    .join("");
}
