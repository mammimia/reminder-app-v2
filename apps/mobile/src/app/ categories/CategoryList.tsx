import { CategoryDto } from '@mammimia/types';
import React from 'react';
import { FlatList } from 'react-native';
import ListEmptyComponent from '../../components/list/ListEmptyComponent';
import ListPageContainer from '../../components/list/ListPageContainer';
import CategorySliderItem from './CategorySliderItem';

type Props = {
  data: CategoryDto[];
  isFetching: boolean;
  onRefresh: () => void;
  openEditModal?: (category: CategoryDto) => void;
};

const CategoryList = ({
  data,
  isFetching,
  onRefresh,
  openEditModal,
}: Props) => {
  return (
    <ListPageContainer isFetching={isFetching}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CategorySliderItem
            category={item}
            openEditModal={openEditModal}
            refetch={onRefresh}
          />
        )}
        keyExtractor={(item) => item.id}
        onRefresh={onRefresh}
        refreshing={isFetching}
        ListEmptyComponent={() => <ListEmptyComponent text="No categories" />}
      />
    </ListPageContainer>
  );
};

export default CategoryList;
