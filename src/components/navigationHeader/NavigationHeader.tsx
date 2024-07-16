import {Box, SafeAreaView} from '@gluestack-ui/themed';
import {FC, ReactNode} from 'react';

interface NavigationHeaderProps {
  children: ReactNode;
}

export const NavigationHeader: FC<NavigationHeaderProps> = ({children}) => {
  return (
    <SafeAreaView bgColor="$trueGray200">
      <Box py="$2">{children}</Box>
    </SafeAreaView>
  );
};
