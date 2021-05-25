import Header from '@editorjs/header';
import List from '@editorjs/list';
import Image from '@editorjs/image';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import TestConstructor from './TestConstructor';
import Location from './Location';
import { BlockToolConstructable, InlineToolConstructable } from '@editorjs/editorjs';
import Question from './Question';
import CurrentQuestTask from './CurrentQuestTask';
import ApproximationToCoordinatesConstructor from './ApproximationToCoordinates';
import MatchOptions from './MatchOptions';
import AnswerInText from './AnswerInText';
import PossibleAnswer from './AnswerInText/PossibleAnswer';
import TrueAnswer from './AnswerInText/TrueAnswer';
import DialogConstructor from './Dialog';

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: ['bold', 'italic', 'link', 'marker'],
  },
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
  answerInText: {
    class: AnswerInText as unknown as BlockToolConstructable,
    inlineToolbar: ['possibleAnswer', 'trueAnswer'],
  },
  possibleAnswer: PossibleAnswer as unknown as InlineToolConstructable,
  trueAnswer: TrueAnswer as unknown as InlineToolConstructable,
  dialog: DialogConstructor as unknown as BlockToolConstructable,
};
