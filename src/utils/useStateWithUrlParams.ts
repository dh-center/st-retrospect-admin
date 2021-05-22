import { useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

/**
 * Use state and save it to URL search params
 *
 * @param paramName - params name in URL
 * @param defaultValue - default value if no value in URL provided
 */
export default function useStateWithUrlParams(paramName: string, defaultValue = ''): [string, Dispatch<SetStateAction<string>>] {
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState<string>(() => {
    const qs = new URLSearchParams(location.search);

    return qs.get(paramName) || defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (state) {
      params.set(paramName, state);
    } else {
      params.delete(paramName);
    }

    history.push({ search: params.toString() });
  }, [ state ]);

  return [state, setState];
}
