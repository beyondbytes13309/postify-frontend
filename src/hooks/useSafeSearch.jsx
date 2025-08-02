
export function useSafeSearch() {
  return async function (url = "", options={}) {
    if (!url) {
      return { success: false, error: 'Url was not provided'}
    }
    try {
      const response = await fetch(url, options)
      let data

      if (response.ok) {
        data = await response.json();
        return {success: true, data: data};
      } 
      
      else if (response.status >= 300 && response.status < 500) {
        try {
          data = await response.json();
          if (data) {
            return { success: false, error: data }
          }
        } catch(e) {
          return {success: false, error: 'A client error occurred.'};
        }
      } 
      
      else if (response.status >= 500) {
        try {
          data = await response.json();
          if (data) {
            return {success: false, error: data}
          }
        } catch (e) {
          return {success: false, error: 'Server responded with an error.'}
        }
      }

    } catch(e) {
      if (e.name == 'TypeError') {
        return {success: false, error: 'A network related issue occurred.'}
      } else if (e.name == 'AbortError') {
        return {success: false, error: 'Request was aborted.'}
      }
      return { success: false, error: e.message || 'An unknown error occurred.' };
    }
  }
   
}
