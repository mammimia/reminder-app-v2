import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

type Props<T> = {
  fetchMethod: (params?: any) => Promise<AxiosResponse<T[]>>;
  params?: any;
};

type ReturnType<T> = {
  data: T[];
  refetch: () => void;
  isFetching: boolean;
};

const useFetchData = <T,>({ fetchMethod, params }: Props<T>): ReturnType<T> => {
  const [data, setFolders] = useState<T[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getData = async () => {
    setIsFetching(true);
    try {
      const response = await fetchMethod(params);
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
