import { Button, Flex, Group, Select, Text, createStyles } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconArrowRightRhombus, IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { FC, forwardRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { usePointsList } from "../../../hooks/points/usePointsList";

const useStyles = createStyles(() => ({
  root: {
    backgroundImage:
      'url("https://donbilet.ru/assets/images/icons/busSection.svg")',
    minHeight: 450,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "1rem 0",
    minWidth: "100%",
    backgroundSize: "contain",
  },
  routeSearch: {
    background: "white",
    borderRadius: "80px",
    padding: "2rem",
    boxShadow: "0 3px 10px 0 rgba(0,0,0,0.1)",
    border: "1px solid #bbb",
    maxWidth: "1000px",
    width: "100%",
    marginTop: "1.25rem",
  },
  select: {
    borderRadius: "100px",
    "& input": {
      fontSize: "1.75rem",
    },
    "& input::placeholder": {
      color: "gray",
      fontSize: "1.75rem",
    },
  },
}));

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

interface Props {
  homepage?: boolean;
}

export const RouteSearch: FC<Props> = ({ homepage }) => {
  const { classes } = useStyles();
  const { points } = usePointsList();
  const [endPoint, setEndPoint] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const pointsData = (points ?? []).map((point) => ({
    label: point.name,
    value: String(point.id),
    description: point.region.name,
  }));

  const onEndPointChange = (v: string) => {
    if (homepage) {
      return setEndPoint(v);
    }

    searchParams.set("endPoint", v);
    setSearchParams(searchParams);
  };

  const onDateChange = (v: Date) => {
    if (homepage) {
      return setDate(v);
    }
    searchParams.set("date", dayjs(v).toISOString());
    setSearchParams(searchParams);
  };

  const getDate = () => {
    try {
      if (homepage) {
        return date;
      }
      const data = searchParams.get("date");
      if (!data) {
        navigate("/home");
        return new Date();
      }
      return dayjs(data).toDate();
    } catch {
      navigate("/home");
    }
  };

  const getEndPoint = () => {
    try {
      return homepage ? endPoint : searchParams.get("endPoint");
    } catch {
      navigate("/home");
    }
  };

  return (
    <>
      <Group position="center" mt={"2rem"}>
        <Text
          align="center"
          fz={"3rem"}
          color="yellow"
          inline
          span
          sx={{
            textShadow: "1px 1px 2px black",
          }}
        >
          Билеты на автобус
        </Text>
      </Group>
      <div className={classes.root}>
        <Flex justify={"center"}>
          <div style={{ width: "100%" }} className={classes.routeSearch}>
            <Group w={"100%"} position="center">
              <DatePickerInput
                ml={"5rem"}
                defaultValue={new Date()}
                locale="ru"
                minDate={dayjs().subtract(0, "day").toDate()}
                value={getDate()}
                onChange={onDateChange}
                valueFormat="DD.MM.YYYY"
                mt={"0.25rem"}
                icon={<IconCalendar color="orange" />}
                styles={{
                  wrapper: {
                    paddingRight: "0.75rem",
                    borderRight: "2px solid orange",
                  },
                  input: {
                    fontSize: "1.55rem",
                  },
                }}
                variant="unstyled"
              />
              <Text fz={"1.75rem"}>Донецк</Text>
              <IconArrowRightRhombus
                fontSize={"3rem"}
                size={"3.5rem"}
                style={{ marginTop: "0.25rem" }}
                color="orange"
              />
              <Select
                data={pointsData}
                itemComponent={SelectItem}
                variant="unstyled"
                placeholder="Куда"
                value={getEndPoint()}
                onChange={onEndPointChange}
                className={classes.select}
                rightSection={<></>}
              />
            </Group>
            <Group position="center">
              {homepage && (
                <Button
                  bg={"orange !important"}
                  children="Найти"
                  mt={"1rem"}
                  w={250}
                  onClick={() => {
                    if (!endPoint || !date) return;
                    if (homepage) {
                      return navigate({
                        pathname: "/races",
                        search: createSearchParams({
                          endPoint,
                          date: dayjs(date).toISOString(),
                        }).toString(),
                      });
                    }
                  }}
                />
              )}
            </Group>
          </div>
        </Flex>
      </div>
    </>
  );
};
