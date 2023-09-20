export type TaskData = {
  todo: string;
  date: Date;
  priority: number;
  isEdit: boolean;
  isCompleted: boolean;
};

export type ViewProps = {
  dataList: TaskData[];
  option: string;
  onSubmitMove: (value: TaskData) => void;
  onSubmitDelete: (value: TaskData) => void;
  onSubmitUpdate: (value: TaskData, newValue: TaskData) => void;
};

export type EditProps = {
  data: TaskData;
  onSubmitUpdate: (value: TaskData, newValue: TaskData) => void;
};
export type AddProps = {
  clickHandler: (value: TaskData) => void;
};
