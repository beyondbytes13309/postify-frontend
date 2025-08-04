import { useCallback, useEffect, useRef, useState } from "react"

export function useSafeFetch(url='', options={}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const abortControllerRef = useRef(null)

  const setState = useCallback((data, error, loading) => {
    setData(data);
    setError(error);
    setLoading(loading);
  }, [])

  useEffect(() => {
    if (!url) {
      return setState(null, 'Url was not provided.', false)
    }
    setState(null, null, false)

    abortControllerRef.current = new AbortController();

    const makeFetchRequest = async () => {
      try {
        const response = await fetch(url, {...options, signal: abortControllerRef?.current.signal});
        let data;

        if (response.ok) {
          data = await response.json();
          return setState(data, null, false)
          
        } else if (response.status >= 300 && response.status < 500) {
          try {
            data = await response.json();
            if (data) {
              return setState(data, null, false)
            }
          } catch (e) {
            return setState(null, e, false)
          }
        } else if (response.status >= 500) {
          try {
            data = await response.json();
            if (data) {
              return setState(null, data, false)
            }
          } catch (e) {
            return setState(null, e, false)
          }
        }
      } catch (e) {
        return setState(null, e, false)
      }
    };

    setState(null, null, true)
    makeFetchRequest()

    return () => abortControllerRef?.current?.abort()

  }, [url, JSON.stringify(options)])

  return {
    data,
    error,
    loading,
    abort: () => abortControllerRef?.current?.abort()
  }
}

