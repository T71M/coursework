import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Bus } from "../../../../api/types/bus";
import { Chip, Group, Loader } from "@mantine/core";
import { useComfortList } from "../../../../hooks/comforts/useComfortsList";
import { BusComfort } from "../../../../api/types/comforts";
import { useAddComfort } from "../../../../hooks/comforts/useAddComfort";
import { useDeleteComfort } from "../../../../hooks/comforts/useDeleteComfort";

export const ComfortsBlock: FC = () => {
  const form = useFormContext<Bus>();
  const id = form.watch("id");
  const busComforts = form.watch("comforts");
  const { comforts, isLoading } = useComfortList();
  const comfortsValues = !!id
    ? (busComforts as BusComfort[]).map((v) => v.comfortId)
    : (busComforts as number[]);
  const { handleAdd, isLoading: isAdding } = useAddComfort();
  const { handleDelete, isLoading: isDeleting } = useDeleteComfort();
  const setValue = (values: string[]) => {
    return form.setValue(
      "comforts",
      values.map((v) => Number(v))
    );
  };

  if (isLoading) {
    return (
      <Group position="center">
        <Loader />
      </Group>
    );
  }

  if (!id) {
    return (
      <Chip.Group
        multiple
        value={comfortsValues.map((v) => String(v))}
        onChange={setValue}
      >
        <Group mt={"2rem"}>
          {comforts?.map((comfort) => (
            <Chip value={String(comfort.id)}>{comfort.name}</Chip>
          ))}
        </Group>
      </Chip.Group>
    );
  }

  const includesValues = (value: number) => {
    return (busComforts as BusComfort[]).some((v) => v.comfortId === value);
  };

  const toggleValue = async (value: boolean, comfortId: number) => {
    if (value) {
      return await handleAdd({ busId: id, comfortId });
    }

    return await handleDelete({ busId: id, comfortId });
  };

  return (
    <Group mt={"2rem"}>
      {comforts?.map((comfort) => (
        <Chip
          value={String(comfort.id)}
          disabled={isAdding || isDeleting}
          children={comfort.name}
          checked={includesValues(comfort.id)}
          onChange={(v) => toggleValue(v, comfort.id)}
        />
      ))}
    </Group>
  );
};
