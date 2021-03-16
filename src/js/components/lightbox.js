import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

export default function setLightbox(event) {
  const bigImgUrl = event.target.dataset.lightboxImg;
  const instance = basicLightbox.create(`
    <div class="lightbox-wrapper" style="background-image: linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)), url('https://i.pinimg.com/originals/3d/2e/aa/3d2eaa40f3660e529ff047a8866983bc.gif')"><img src="${bigImgUrl}" width="800" height="600"></div>
`);

  instance.show();
}
