import PersonsPage from '../components/Persons/PersonsPage';
import QuestsPage from '../components/Quests/QuestsPage';
import Quiz from '../components/Quiz';

const routes = [
  {
    path: '/persons',
    component: PersonsPage,
  },
  {
    path: '/quests',
    component: QuestsPage,
  },
  {
    path: '/quiz',
    component: Quiz,
  },
];

export default routes;
