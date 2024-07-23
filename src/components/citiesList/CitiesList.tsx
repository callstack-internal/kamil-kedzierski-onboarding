import {useNavigation} from '@react-navigation/native';
import {useGetCurrentLocationWeather, useGetWeatherGroup} from '@src/api/hooks';
import {Separator} from '@src/components/separator';
import {Spinner} from '@src/components/spinner';
import {TemperatureUnit} from '@src/types';
import {CityWeather} from '@src/types/api';
import {useState} from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {ListItem} from './parts/listItem';

import {Text} from '@gluestack-ui/themed';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@src/types/navigation';
import {CurrentLocationWeatherBox} from '../currentLocationWeatherBox';

export const CitiesList = () => {
  const {
    data: currentLocation,
    isFetching: isCurrentLocationFetching,
    refetch: refetchCurrentLocation,
  } = useGetCurrentLocationWeather();
  //TODO: Implement Temp unit selection
  const [selectedTempUnit, setSelectedTempUnit] =
    useState<TemperatureUnit>('imperial');

  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const {
    data: weatherGroup,
    isFetching: isWeatherGroupFetching,
    refetch: refetchWeatherGroup,
    isError,
  } = useGetWeatherGroup(selectedTempUnit);

  const handleNavigateToDetails = (cityId: string) => {
    navigation.navigate('WeatherDetails', {cityId});
  };

  const handleRefresh = () => {
    refetchWeatherGroup();
    refetchCurrentLocation();
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

  const isFetching = isWeatherGroupFetching || isCurrentLocationFetching;

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <Text textAlign="center" mt="$10">
        Failed to load. Please try again later.
      </Text>
    );
  }

  if (!weatherGroup) {
    return (
      <Text textAlign="center" mt="$10">
        No data
      </Text>
    );
  }

  return (
    <FlatList
      data={weatherGroup?.list}
      keyExtractor={(item: CityWeather) => item.id.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      onRefresh={handleRefresh}
      refreshing={isFetching}
      ListHeaderComponent={
        <CurrentLocationWeatherBox
          data={currentLocation}
          onPress={() =>
            currentLocation &&
            handleNavigateToDetails(currentLocation?.id.toString())
          }
        />
      }
    />
  );
};
