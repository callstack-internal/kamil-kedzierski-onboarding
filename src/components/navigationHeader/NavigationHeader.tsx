import {Box, SafeAreaView} from '@gluestack-ui/themed';
import {FC, ReactNode} from 'react';

interface NavigationHeaderProps {
  children: ReactNode;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({children}) => {
  return (
    <SafeAreaView bgColor="$trueGray200">
      <Box $ios-py="$2" $android-py="$4.5">
        {children}
      </Box>
    </SafeAreaView>
  );
};
