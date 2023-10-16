import { Button, ButtonProps, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props extends ButtonProps {
  link?: string;
  label?: string;
}

export const AddButton: FC<Props> = ({ link, label, ...rest }) => {
  return (
    <Button
      {...rest}
      component={Link}
      color="yellow"
      w={"fit-content"}
      to={link ?? "create"}
    >
      <Group spacing={10}>
        <IconPlus /> {label ?? "Добавить"}
      </Group>
    </Button>
  );
};
