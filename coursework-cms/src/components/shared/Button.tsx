import { Button, ButtonProps, Group } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props extends ButtonProps {
  link?: string | number;
  label: string;
}

export const BackButton: FC<Props> = ({ link, label, ...rest }) => {
  return (
    <Button
      {...rest}
      w={"fit-content"}
      variant="subtle"
      color="dark"
      fz="1.5rem"
      p={0}
      component={Link}
      to={(link ?? -1) as any}
      styles={{
        root: {
          "&:hover": {
            background: "none",
          },
        },
      }}
    >
      <Group spacing={5} align="center">
        <IconArrowLeft fontSize={"1.5rem"} />
        {label}
      </Group>
    </Button>
  );
};
