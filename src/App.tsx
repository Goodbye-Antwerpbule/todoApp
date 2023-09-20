import {
  Box,
  Grid,
  Heading,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { TaskData } from "./compositions/type";
import View from "./View";
import Add from "./Add";

function App() {
  const [inbox, setInbox] = useState<TaskData[]>([]);
  const [compTask, setCompTask] = useState<TaskData[]>([]);
  const [option, setOption] = useState<string>("create-desc");

  type a = {
    date: string | Date;
  };

  // useEffect(() => {
  //   const serializedInbox = localStorage.getItem("inbox");
  //   const serializedCompTask = localStorage.getItem("comTask");

  //   if (serializedInbox)
  //     setCompTask(
  //       JSON.parse(serializedInbox).map(({ date }: a) => new Date(date))
  //     );
  //   if (serializedCompTask)
  //     setInbox(
  //       JSON.parse(serializedCompTask).map(({ date }: a) => new Date(date))
  //     );
  // }, []);

  const seveTaskToStrageHandler = (value: TaskData[]) => {
    if (value[0].isCompleted) {
      const serializedcompTask = JSON.stringify(value);
      localStorage.setItem("compTask", serializedcompTask);
    } else {
      const serializedInbox = JSON.stringify(value);
      localStorage.setItem("inbox", serializedInbox);
    }
  };
  //インボックスにタスクを登録する
  const clickAddInboxHandler = (value: TaskData) => {
    setInbox([...inbox, value]);
    seveTaskToStrageHandler(inbox);
  };

  //タスクをインボックス/完了済みに移動させる
  const clickMoveToHandler = (value: TaskData) => {
    if (value.isCompleted) {
      setCompTask(compTask.filter((v) => v != value));
      const newValue: TaskData = { ...value, isCompleted: false };
      setInbox([...inbox, newValue]);
      seveTaskToStrageHandler(inbox);
    } else {
      setInbox(inbox.filter((v) => v != value));
      const newValue: TaskData = { ...value, isCompleted: true };
      setCompTask([...compTask, newValue]);
      seveTaskToStrageHandler(compTask);
    }
  };

  //タスクを削除する
  const clickDeleteTaskHandler = (value: TaskData) => {
    if (value.isCompleted) {
      const a = compTask.filter((v) => v != value);
      setCompTask(a);
      seveTaskToStrageHandler(a);
    } else {
      const a = inbox.filter((v) => v != value);
      setInbox(a);
      seveTaskToStrageHandler(a);
    }
  };

  //モーダルを表示しタスクを編集する
  const clickUpdateTaskHandler = (value: TaskData, newValue: TaskData) => {
    if (value.isCompleted) {
      setCompTask([...compTask.filter((v) => v != value), newValue]);
      seveTaskToStrageHandler(compTask);
    } else {
      setInbox([...inbox.filter((v) => v != value), newValue]);
      seveTaskToStrageHandler(inbox);
    }
  };
  return (
    <>
      <Heading mt="5" ml="5" mb="5">
        My Todo
      </Heading>
      <Tabs variant="soft-rounded" colorScheme="green">
        <Grid templateColumns="300px 1em 40em">
          <Box>
            <TabList>
              <Tab mr="2" ml="4">
                インボックス
              </Tab>
              <Tab>完了したタスク</Tab>
            </TabList>
          </Box>
          <Box />
          <Box w="20%">
            <Select
              colorScheme="blue"
              onChange={(e) => {
                setOption(e.target.value);
              }}
              defaultValue="create-desc"
            >
              <option value="create-desc">登録日↑</option>
              <option value="create-asc">登録日↓</option>
              <option value="priority-desc">優先度↑</option>
              <option value="priority-asc">優先度↓</option>
            </Select>
          </Box>
        </Grid>

        <TabPanels>
          <TabPanel>
            <View
              dataList={inbox}
              option={option}
              onSubmitMove={clickMoveToHandler}
              onSubmitDelete={clickDeleteTaskHandler}
              onSubmitUpdate={clickUpdateTaskHandler}
            />
          </TabPanel>
          <TabPanel>
            <View
              dataList={compTask}
              option={option}
              onSubmitMove={clickMoveToHandler}
              onSubmitDelete={clickDeleteTaskHandler}
              onSubmitUpdate={clickUpdateTaskHandler}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Add clickHandler={clickAddInboxHandler} />
    </>
  );
}

export default App;
