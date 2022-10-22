import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
console.log(galleryContainer);

const makeImages = createImageCardMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", makeImages);

function createImageCardMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>
    `;
    })
    .join("");
}

galleryContainer.addEventListener("click", ongalleryContainerClick);

function ongalleryContainerClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const modalImages = e.target.getAttribute("data-source");
  const instance = basicLightbox.create(`
        <img src="${modalImages}" width="800" height="600">
    `);

  window.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      instance.close();
    }
  });

  window.removeEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      instance.close();
    }
  });
  //  не рабоает снятие слушателя, а вот поставить то ставится, буду благодарна если объяснишь
  instance.show();
}
