import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';


/**
 * Hook that returns function for pushing location back to entity view page
 */
export default function useLeaveEditPage(): () => void {
  const history = useHistory();
  const location = useLocation();

  return (): void => {
    const entityPath = location.pathname.replace('/edit', '');

    history.push(entityPath);
  };
}
