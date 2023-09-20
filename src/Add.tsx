import { AddProps } from "./compositions/type";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { useRef } from "react";

export default function Add({ clickHandler }: AddProps) {
  const ref = useRef<HTMLInputElement>(null);
  const clickSubmitHandler = () => {
    const d = new Date();
    if (ref.current)
      clickHandler({
        todo: ref.current.value,
        date: d,
        priority: 3,
        isEdit: false,
        isCompleted: false,
      });
  };
  return (
    <>
      <Box ml="5" w="60%">
        <InputGroup>
          <Input type="text" placeholder="Enter KeyWords" ref={ref} />
          <InputRightElement width="5rem">
            <Button onClick={clickSubmitHandler} size="sm" colorScheme="blue">
              登録
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}
