import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Location from './Location';
import { BlockToolConstructable } from '@editorjs/editorjs';
import Question from './Question';

export const EDITOR_JS_TOOLS = {
  list: List,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: process.env.REACT_APP_API_ENDPOINT + 'upload/route', // Your backend file uploader endpoint
      },
    },
  },
  header: Header,
  quote: Quote,
  marker: Marker,
  delimiter: Delimiter,
  locationInstance: Location as unknown as BlockToolConstructable,
  question: Question as unknown as BlockToolConstructable,
};
