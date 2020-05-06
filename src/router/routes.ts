import PersonsPage from '../components/Persons/PersonsPage';
import Quests from '../components/Quests';
import Quiz from '../components/Quiz';

const routes = [
  {
    path: '/persons',
    component: PersonsPage,
  },
  {
    path: '/quests',
    component: Quests,
  },
  {
    path: '/quiz',
    component: Quiz,
  },
];

export default routes;
