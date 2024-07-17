import {Box} from '@gluestack-ui/themed';
import {ListItem} from './parts/listItem';

export const CitiesList = () => {
  //TODO: List and data fetch will be implemented in the next PR

  const handleNavigateToDetails = (id: string) => {
    console.log(`navigate to details ${id}`);
  };

  return (
    <Box>
      <ListItem
        cityName="San Jose"
        weatherCondition="Clear"
        icon="01d"
        temperature="44"
        onPress={() => handleNavigateToDetails('123')}
      />
    </Box>
  );
};
