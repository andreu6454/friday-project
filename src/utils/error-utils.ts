import axios from 'axios';

type ThunkAPIType = {
  dispatch: (action: any) => any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  rejectWithValue: Function;
};

export const handlerAsyncError = (error: any, thunkAPI: ThunkAPIType) => {
  if (axios.isAxiosError(error)) {
    //here we have a type guard check, error inside this if will be treated as AxiosError
    const response = error?.response;
    const request = error?.request;
    const config = error?.config; //here we have access the config used to make the api call (we can make a retry using this conf)

    if (error.code === 'ERR_NETWORK') {
      return thunkAPI.rejectWithValue('connection problems..');
    }
    if (error.code === 'ERR_CANCELED') {
      return thunkAPI.rejectWithValue('connection canceled..');
    }
    if (response) {
      //The request was made and the server responded with a status code that falls out of the range of 2xx the http status code mentioned above
      const statusCode = response?.status;
      if (statusCode === 404) {
        return thunkAPI.rejectWithValue(
          'The requested resource does not exist or has been deleted',
        );
      }
    }
    if (request) {
      console.warn('something happend');
      //The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
    }

    return thunkAPI.rejectWithValue(error.response?.data.error);
  }

  return thunkAPI.rejectWithValue('Oops, unexpected error');
};
