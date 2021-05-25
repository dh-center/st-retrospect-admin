import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import TestConstructor from './TestConstructor';
import Location from './Location';
import { BlockToolConstructable } from '@editorjs/editorjs';
import Question from './Question';
import CurrentQuestTask from './CurrentQuestTask';
import ApproximationToCoordinatesConstructor from './ApproximationToCoordinates';
import MatchOptions from './MatchOptions';

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
  test: TestConstructor as unknown as BlockToolConstructable,
  locationInstance: Location as unknown as BlockToolConstructable,
  question: Question as unknown as BlockToolConstructable,
  currentQuestTask: CurrentQuestTask as unknown as BlockToolConstructable,
  approximationToCoordinates: ApproximationToCoordinatesConstructor as unknown as BlockToolConstructable,
  matchOptions: MatchOptions as unknown as BlockToolConstructable,
};
