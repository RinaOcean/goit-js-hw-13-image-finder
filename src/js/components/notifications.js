import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

function onError() {
  notyf.open({
    type: 'warning',
    message: 'Please, check the entered value',
  });
}

function onFetchError() {
  notyf.open({
    type: 'error',
    message: 'Ooops!Something went wrong :(',
  });
}

const notyf = new Notyf({
  duration: 3000,
  position: {
    x: 'center',
    y: 'top',
  },
  types: [
    {
      type: 'warning',
      background: 'orange',

      icon: {
        className: 'material-icons',
        tagName: 'i',
        text: 'warning',
      },
      duration: 2000,
      dismissible: true,
    },
    {
      type: 'error',

      background: 'indianred',
      duration: 2000,
      dismissible: true,
    },
  ],
});

export { onError, onFetchError };
