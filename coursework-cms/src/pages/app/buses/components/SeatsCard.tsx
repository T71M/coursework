import { FC } from "react";
import { BusSeat } from "../../../../api/types/bus";
import {
  Flex,
  Group,
  Paper,
  PaperProps,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import styled from "@emotion/styled";

interface Props extends PaperProps {
  seats: number[];
}

const StyledCard = styled.div<{ empty?: boolean }>`
  width: 40px;
  height: 25px;
  background: ${({ empty }) => (empty ? "white" : "rgba(200, 200, 200, 0.65)")};
  border: ${({ empty }) =>
    !empty ? "1px solid rgb(128, 128, 128)" : "1px solid transparent"};
  cursor: ${({ empty }) => !empty && "pointer"};
  display: flex;

  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
`;

const SeatPreview: FC<{ number: number; empty?: boolean }> = ({
  number,
  empty,
}) => {
  return (
    <StyledCard empty={empty}>
      {!empty && (
        <Text align="center" fz={"0.75rem"} weight={700}>
          {number}
        </Text>
      )}
    </StyledCard>
  );
};

export const SeatsCard: FC<Props> = ({ seats, ...rest }) => {
  const getHalf = (halfPart: 1 | 2) => {
    const half = Math.ceil(seats.length / 2);
    return halfPart === 1
      ? seats.slice(0, half).reverse()
      : seats.slice(half).reverse();
  };

  const renderRow = (seats: number[]) => {
    let skip = false;
    let render = [];
    for (let i = 0; i < seats.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
      let next;
      if (i + 1 < seats.length - 1) {
        next = seats[i + 1];
      }
      if (!seats[i]) return render;
      render.push(
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {next ? (
            <SeatPreview number={next} />
          ) : (
            <SeatPreview number={0} empty />
          )}
          <SeatPreview number={seats[i]} />
        </div>
      );
      skip = true;
    }
    return render;
  };

  return (
    <Paper shadow="lg" radius={"xs"} {...rest} p={"1.5rem"}>
      <Title>Места</Title>
      <Stack w={"fit-content"} align="end">
        <Flex mt={"1rem"} sx={{ flexWrap: "wrap", gap: 5 }} w={"fit-content"}>
          {renderRow(getHalf(1))}
        </Flex>
        <Flex mt={"1rem"} sx={{ flexWrap: "wrap", gap: 5 }} w={"fit-content"}>
          {renderRow(getHalf(2))}
        </Flex>
      </Stack>
    </Paper>
  );
};
