import {HStack, Text} from '@gluestack-ui/themed';
import {Separator} from '@src/components/separator';
import {FC} from 'react';

interface SectionProps {
  label: string;
  value: number;
  unit?: string;
  hasSeparator?: boolean;
}

export const Section: FC<SectionProps> = ({
  label,
  value,
  unit,
  hasSeparator = true,
}) => {
  return (
    <>
      <HStack justifyContent="space-between" px="$5" py="$3">
        <Text>{label}</Text>
        <HStack>
          <Text>{value}</Text>
          {!!unit && <Text>{unit}</Text>}
        </HStack>
      </HStack>
      {hasSeparator && <Separator />}
    </>
  );
};
