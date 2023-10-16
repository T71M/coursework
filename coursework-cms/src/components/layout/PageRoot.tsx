import styled from "@emotion/styled";
import { Box, BoxProps, createPolymorphicComponent } from "@mantine/core";

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.5rem;
`;

export const PageRoot = createPolymorphicComponent<"div", BoxProps>(StyledBox);
