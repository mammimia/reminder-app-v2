import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type Props<T> = {
  fetchMethod: () => Promise<AxiosResponse<T[]>>;
};

type ReturnType<T> = {
  data: T[];
  refetch: () => void;
  isFetching: boolean;
};

const useFetchData = <T,>({ fetchMethod }: Props<T>): ReturnType<T> => {
  const [data, setFolders] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await fetchMethod();
      setFolders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, refetch: getData, isFetching };
};

export default useFetchData;
