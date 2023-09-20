import { useState } from "react";
import { usePersist } from "./usePersist";

export const AlertMessagePersist = () => {
  const [mydata, setMydata] = usePersist("mydata", []);
  const [task, setTask] = useState(mydata?.task || []);
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (e === undefined) return;
    setTask(e.target.value);
  };
  const onAction = () => {
    const data = {
      task,
    };
    setMydata(data);
  };
  return (
    <div className="alert alert-primary h5 text-primary">
      <h5 className="mb-4">{JSON.stringify(mydata)}</h5>
      <div className="form-group">
        <label htmlFor="" className="h6">
          Name
        </label>
        <input
          type="text"
          onChange={onChangeName}
          value={task}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={onAction}>
          save
        </button>
      </div>
    </div>
  );
};
