import { useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useHistory } from 'react-router';

export default function useStateWithUrlParams(paramName: string, defaultValue: string): [string, Dispatch<SetStateAction<string>>];
export default function useStateWithUrlParams(paramName: string, defaultValue: number): [number, Dispatch<SetStateAction<number>>];

/**
 * Use state and save it to URL search params
 *
 * @param paramName - params name in URL
 * @param defaultValue - default value if no value in URL provided
 */
export default function useStateWithUrlParams(paramName: string, defaultValue: string | number): [string | number, Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<string>>] {
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = useState(() => {
    const qs = new URLSearchParams(location.search);
    const value = qs.get(paramName);

    if (!value) {
      return defaultValue;
    }

    if (typeof defaultValue === 'number') {
      return +value || defaultValue;
    }

    return qs.get(paramName) || defaultValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (state && state !== defaultValue) {
      params.set(paramName, state.toString());
    } else {
      params.delete(paramName);
    }

    history.push({ search: params.toString() });
  }, [ state ]);

  return [state, setState as Dispatch<SetStateAction<number>> | Dispatch<SetStateAction<string>>];
}
