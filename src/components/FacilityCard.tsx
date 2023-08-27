import { IFacility } from '@/types/models/IFacility';
import { SelectedFacilities } from '@/types/models/IRoom';
import { ActionIcon, Card, Grid, Group, Image, Text } from '@mantine/core';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

interface Props {
  facility: IFacility;
  selectedFacilities: SelectedFacilities[];
  setSelectedFacilities: React.Dispatch<
    React.SetStateAction<SelectedFacilities[]>
  >;
  viewOnly: boolean;
}

export const FacilityCard: React.FC<Props> = ({
  facility,
  selectedFacilities,
  setSelectedFacilities,
  viewOnly
}) => {
  const [_quantity, setQuantity] = useState(0);
  useEffect(() => {
    const index = selectedFacilities.findIndex(
      (item) => item.id === facility.id
    );

    if (_quantity > 0) {
      if (index !== -1) {
        const updatedSelectedFacilities = [...selectedFacilities];
        updatedSelectedFacilities[index].qty = _quantity;
        setSelectedFacilities(updatedSelectedFacilities);
      } else {
        setSelectedFacilities([
          ...selectedFacilities,
          { id: facility.id, qty: _quantity }
        ]);
      }
    } else if (index !== -1) {
      const updatedSelectedFacilities = [...selectedFacilities];
      updatedSelectedFacilities.splice(index, 1);
      setSelectedFacilities(updatedSelectedFacilities);
    }
  }, [_quantity, facility.id, selectedFacilities, setSelectedFacilities]);

  return (
    <Card shadow="md">
      <Grid align="center">
        <Grid.Col span={7}>
          <Group spacing="xl">
            <Image
              width={56}
              height={56}
              src={facility.image}
              withPlaceholder
            />
            <Text lineClamp={1}>{facility.name}</Text>
          </Group>
        </Grid.Col>
        <Grid.Col span={3}>
          <Group grow>
            {viewOnly && (
              <ActionIcon
                disabled={_quantity <= 0}
                onClick={() => setQuantity((prev) => prev - 1)}
              >
                <IconMinus />
              </ActionIcon>
            )}
            <Text align="center">{_quantity}</Text>
            {viewOnly && (
              <ActionIcon onClick={() => setQuantity((prev) => prev + 1)}>
                <IconPlus />
              </ActionIcon>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </Card>
  );
};
