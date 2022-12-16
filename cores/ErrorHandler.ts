/* eslint-disable no-throw-literal */
export const axiosErrorHandler = (err: any) => {
  if (err.response) {
    const { status, data, headers } = err.response;
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx

    // Not Auth
    if (status === 401) {
      // handle 401
    }

    // API return 404 not found 403 Forbidden roles (clientType)
    if (status === 403) {
      // handle 403
    }

    // eslint-disable-next-line no-throw-literal
    // handle general error
  } else if (err.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js

  } else {
    // Something happened in setting up the request that triggered an Error

  }
};

// use this if we have format
// export const getErrorMessage = (err: any) =>
//   ({ field: err.data ? err.data.param : null, message: `${err.message}` });
