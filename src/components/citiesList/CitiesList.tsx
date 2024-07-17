import {useGetWeatherGroup} from '@src/api/hooks';
import {Spinner} from '@src/components/spinner';
import {TemperatureUnit} from '@src/types';
import {CityWeather} from '@src/types/api';
import {useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {ListItem} from './parts/listItem';
import {Separator} from './parts/separator';

export const CitiesList = () => {
  //TODO: Implement Temp unit selection
  const [selectedTempUnit, setSelectedTempUnit] =
    useState<TemperatureUnit>('imperial');

  const {data, isFetching} = useGetWeatherGroup(selectedTempUnit);

  const handleNavigateToDetails = (id: string) => {
    console.log(`navigate to details ${id}`);
  };

  const renderItem: ListRenderItem<CityWeather> = ({item}) => (
    <ListItem
      cityName={item.name}
      weatherCondition={item.weather[0].main}
      icon={item.weather[0].icon}
      temperature={Math.round(item.main.temp).toString()} // Assuming conversion is correct
      onPress={() => handleNavigateToDetails(item.dt.toString())}
    />
  );

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <FlatList
      data={data?.list}
      keyExtractor={(item: CityWeather) => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
    />
  );
};
