import * as basicLightbox from 'basiclightbox';
import '../../../node_modules/basiclightbox/dist/basicLightbox.min.css';

export default function setLightbox(event) {
  const bigImgUrl = event.target.dataset.lightboxImg;
  const instance = basicLightbox.create(`
    <div style:"background-image: url('./images/loading1.gif')"><img src="${bigImgUrl}" width="800" height="600"></div>
`);

  instance.show();
}
