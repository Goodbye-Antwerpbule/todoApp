import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { EditProps, TaskData } from "./compositions/type";
import { useState } from "react";
export default function Edit({ data, onSubmitUpdate }: EditProps) {
  const modal = useDisclosure();
  const [newData, setNewData] = useState<TaskData>(data);

  const clickUpdateTaskHandler = () => {
    modal.onClose();
    onSubmitUpdate(data, newData as TaskData);
    console.log(data);
    console.log(newData);
  };
  return (
    <>
      <Button onClick={modal.onOpen}>編集</Button>
      <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>タスク編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Editable defaultValue={data.todo}>
                <EditablePreview />
                <EditableInput
                  onChange={(e) => {
                    if (newData)
                      setNewData({
                        ...newData,
                        todo: e.target.value,
                      });
                  }}
                />
              </Editable>
              {`${data.date.getMonth()}/${data.date.getDate()} ${data.date.getHours()}:${data.date.getMinutes()}`}

              <Select
                colorScheme="blue"
                defaultValue="3"
                onChange={(e) => {
                  if (newData)
                    setNewData({
                      ...newData,
                      priority: Number(e.target.value),
                    });
                }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={clickUpdateTaskHandler}>
              保存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
