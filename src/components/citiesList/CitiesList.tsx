import {useNavigation} from '@react-navigation/native';
import {useGetWeatherGroup} from '@src/api/hooks';
import {Separator} from '@src/components/separator';
import {Spinner} from '@src/components/spinner';
import {TemperatureUnit} from '@src/types';
import {CityWeather} from '@src/types/api';
import {useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {ListItem} from './parts/listItem';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@src/types/navigation';

export const CitiesList = () => {
  //TODO: Implement Temp unit selection
  const [selectedTempUnit, setSelectedTempUnit] =
    useState<TemperatureUnit>('imperial');

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const {data, isFetching, refetch} = useGetWeatherGroup(selectedTempUnit);

  const handleNavigateToDetails = (cityId: string) => {
    navigation.navigate('WeatherDetails', {cityId});
  };

  const renderItem: ListRenderItem<CityWeather> = ({item}) => (
    <ListItem
      cityName={item.name}
      weatherCondition={item.weather[0].main}
      icon={item.weather[0].icon}
      temperature={item.main.temp}
      onPress={() => handleNavigateToDetails(item.id.toString())}
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
      onRefresh={refetch}
      refreshing={isFetching}
    />
  );
};
