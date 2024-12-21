const images = [
  {
    id: 1,
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    id: 2,
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    id: 3,
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    id: 4,
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    id: 5,
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    id: 6,
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    id: 7,
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    id: 8,
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    id: 9,
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

/*
preview — посилання на маленьку версію зображення для картки галереї

original — посилання на велику версію зображення для модального вікна

description — текстовий опис зображення, для атрибута alt малого зображення та підпису великого зображення в модалці.

*/
/*

<li class="gallery-item">
  <a class="gallery-link" href="large-image.jpg">
    <img
      class="gallery-image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</li>

 */

const createProductCardTemplate = product => {
  return `
    <li class="gallery-item" data-id="${product.id}">
      <a class="gallery-link" href="${product.original}">
        <img
          class="gallery-image"
          src="${product.preview}"
          data-source="${product.original}"
          alt="${product.description}"
        />
      </a>
    </li>
  `;
};

const productsCardTemplate = images.map(image => createProductCardTemplate(image)).join('');

const productsListEl = document.querySelector('.gallery');

// Додаємо галерею на сторінку
productsListEl.innerHTML = productsCardTemplate;

// Відстежуємо кліки по галереї
productsListEl.addEventListener('click', event => {
  event.preventDefault();

  const clickedImage = event.target.closest('.gallery-image');
  if (!clickedImage) return;

  // Знаходимо id зображення
  const productId = Number(clickedImage.closest('.gallery-item').dataset.id);

  // Отримуємо інформацію про продукт
  const productInfo = images.find(image => image.id === productId);

  // Створюємо модальне вікно
  const modalWindowInstance = basicLightbox.create(
    `
    <img class="product-modal-img" src="${productInfo.original}" alt="${productInfo.description}" />
    `,
    {
      closable: true,
      className: 'our-class',

      onShow() {
        console.log('Modal show!');
      },

      onClose() {
        console.log('Modal close');
      },
    }
  );

  modalWindowInstance.show();
});
