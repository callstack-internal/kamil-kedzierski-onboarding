import {SafeAreaView, Text} from '@gluestack-ui/themed';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useGetWeatherDetails} from '@src/api/hooks';
import {Section} from '@src/components/section';
import {Separator} from '@src/components/separator';
import {Spinner} from '@src/components/spinner';
import {WeatherInformationBox} from '@src/components/weatherInformationBox';
import {MainStackParamList} from '@src/types/navigation';
import {getIconUrl} from '@src/utils';
import {FC} from 'react';

interface WeatherDetailsScreenProps
  extends NativeStackScreenProps<MainStackParamList, 'WeatherDetails'> {}

export const WeatherDetailsScreen: FC<WeatherDetailsScreenProps> = ({
  route,
}) => {
  const cityId = route.params.cityId;
  const {data, isFetching, isError} = useGetWeatherDetails(cityId);

  if (isFetching) {
    return <Spinner />;
  }
  if (isError && !data) {
    return (
      <SafeAreaView>
        <Text>Failed to load weather details. Please try again later.</Text>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView>
        <Text>No data found</Text>
      </SafeAreaView>
    );
  }
  const iconUrl = getIconUrl(data.weather[0].icon);

  return (
    <SafeAreaView>
      <WeatherInformationBox
        iconUrl={iconUrl}
        cityName={data.name}
        weatherCondition={data.weather[0].main}
        temperature={data.main.temp}
      />
      <Separator />
      <Section label="Humidity" value={data.main.humidity} unit="%" />
      <Section label="Pressure" value={data.main.pressure} unit="hPa" />
      <Section label="Wind Speed" value={data.wind.speed} unit="mph" />
      <Section label="Cloud Cover" value={data.clouds.all} unit="%" />
    </SafeAreaView>
  );
};
