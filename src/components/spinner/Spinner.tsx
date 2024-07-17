import {Spinner as BaseSpinner, Box} from '@gluestack-ui/themed';

export const Spinner = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" mt="$32">
      <BaseSpinner size="large" />
    </Box>
  );
};
