import { TaskData, ViewProps } from "./compositions/type";
import { Button, Grid, Box } from "@chakra-ui/react";
import Edit from "./Edit";

export default function View({
  dataList,
  option,
  onSubmitMove,
  onSubmitDelete,
  onSubmitUpdate,
}: ViewProps) {
  const sortedList = (() => {
    switch (option) {
      case "create-desc":
        return [...dataList].sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );

      case "create-asc":
        return [...dataList].sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        );

      case "priority-desc":
        return [...dataList].sort((a, b) => a.priority - b.priority);

      default:
        return [...dataList].sort((a, b) => b.priority - a.priority);
    }
  })();

  const clickSubmitMoveHandler = (value: TaskData) => {
    onSubmitMove(value);
  };
  const clickSubmitDeleteHandler = (value: TaskData) => {
    onSubmitDelete(value);
  };

  return (
    <>
      <Grid fontWeight="bold" m="2" templateColumns="18em 19em 6em 5em 5em 5em">
        <Box />
        <Box>やること</Box>
        <Box>日付</Box>
        <Box>優先度</Box>
        <Box />
        <Box />
      </Grid>

      {sortedList.map((value, key) => (
        <Grid m="2" key={key} templateColumns="5em 30em 9em 4em 5em 5em">
          <Edit data={value} onSubmitUpdate={onSubmitUpdate} />
          <Box ml="5">{value.todo}</Box>
          <Box>{`${value.date.getFullYear()} ${value.date.getMonth()}/${value.date.getDate()} ${value.date.getHours()}:${value.date.getMinutes()}`}</Box>
          <Box>{value.priority}</Box>
          <Button mr="1" onClick={() => clickSubmitMoveHandler(value)}>
            {value.isCompleted ? "戻す" : "完了"}
          </Button>
          <Button onClick={() => clickSubmitDeleteHandler(value)}>削除</Button>
        </Grid>
      ))}
    </>
  );
}
