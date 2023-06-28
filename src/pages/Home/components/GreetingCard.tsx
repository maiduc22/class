import { Card, Text } from '@mantine/core';

interface Props {
  fullName: string;
}
export const GreetingCard = ({ fullName }: Props) => {
  return (
    <Card padding="lg">
      <Text size="lg" weight={700}>
        Welcome back, {fullName}!
      </Text>
    </Card>
  );
};
