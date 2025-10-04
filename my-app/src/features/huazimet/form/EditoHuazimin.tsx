import React, { useState, ChangeEvent } from "react";
import { Dialog } from "primereact/dialog";
import { Form } from "react-bootstrap";
import { IHuazimi } from "../../../app/layout/models/huazimi";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";

interface IProps {
  huazimi: IHuazimi;
  editHuazimi: (huazimi: IHuazimi) => void;
  show: boolean;
  onHide: () => void;
}

const EditoHuazimin: React.FC<IProps> = ({
  show,
  onHide,
  huazimi: initialFormState,
  editHuazimi,
}) => {
  const INITIAL_RETURN_DATE = new Date('0001-01-01T00:00:00.000Z');

  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        huazimiId: 0,
        currentDate: "",
        dueDate: new Date().toISOString().split("T")[0], // Initialize with a Date object
        returnDate: new Date(),
        isReturned: false,
        isbn: "",
        id: "",
        username: "",
      };
    }
  };

  const [huazimi, setHuazimi] = useState<IHuazimi>(initializeForm);

  const [checked, setChecked] = useState<boolean>(false);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Keep it as a string
    setHuazimi({ ...huazimi, dueDate: selectedDate });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const isChecked = e.checked ?? false; // Use false as the default value
    setChecked(isChecked);
    setHuazimi({
      ...huazimi,
      returnDate: isChecked ? new Date() : INITIAL_RETURN_DATE,
      isReturned: isChecked ? true: false,
    });
  };
  const handleSubmit = () => {
    editHuazimi(huazimi);
    onHide();
  };


  return (
    <>
      <Dialog header="Edito Huazimin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
        <label>Emri</label>
        <div className="modal-flex">
          <Form.Control
            type="date"
            value={huazimi.dueDate}
            onChange={handleDateChange}
          />
        </div>
        <label>Është kthyer</label>
        <div className="modal-flex">
            <Checkbox onChange={handleCheckboxChange}  checked={huazimi.isReturned}></Checkbox>
        </div>
        {/* <Form.Check
  type="checkbox"
  label="Current Date"
  checked={false}
  onChange={handleCheckboxChange}
/> */}
        <div className="modal-btn">
          <button className="submitbtn" onClick={handleSubmit}>
            Ruaj Ndryshimet
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default EditoHuazimin;
