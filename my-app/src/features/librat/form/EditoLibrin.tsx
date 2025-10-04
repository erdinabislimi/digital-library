import React, { useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ILibri } from "../../../app/layout/models/libri";
import { Dialog } from "primereact/dialog";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { AutoComplete } from "primereact/autocomplete";
import { toast } from 'react-toastify';

interface IProps {
  libri: ILibri;
  editLibri: (libri: ILibri) => void;
  show: boolean;
  onHide: () => void;
}

const EditoLibrin: React.FC<IProps> = ({
  show,
  onHide,
  libri: initialFormState,
  editLibri,
}) => {
  const initializeForm = () => {
    if (initialFormState) {
      return initialFormState;
    } else {
      return {
        isbn: "",
        titulli: "",
        pershkrimi: "",
        fotoja: "",
        sasia: 0
      };
    }
  };

  const [libri, setLibri] = useState<ILibri>(initializeForm);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleTitulliChange = (e: { value: string }) => {
    setLibri({ ...libri, titulli: e.value });
  };

  const handlePershkrimiChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLibri({ ...libri, pershkrimi: e.target.value });
  };

  const handleSasiaChange = (e: InputNumberValueChangeEvent) => {
    setLibri({ ...libri, sasia: e.value as number });
  };

  const handleFotojaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = () => {
    editLibri(libri);
    toast.success("Libri u përditësua me sukses!");
    onHide();
  };

  return (
    <>
      {/* Toast container for success message */}

      <Dialog
        header="Edito Librin"
        visible={show}
        style={{ width: '30vw' }}
        onHide={onHide}
      >
        <label>Titulli</label>
        <div className="modal-flex">
          <AutoComplete
            inputId="titulli"
            value={libri.titulli}
            onChange={handleTitulliChange}
          />
        </div>

        <label>Përshkrimi</label>
        <div className="modal-flex">
          <InputTextarea
            value={libri.pershkrimi}
            onChange={handlePershkrimiChange}
            rows={5}
            cols={50}
          />
        </div>

        <Form.Label>Kopertina</Form.Label>
        <Form.Control
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFotojaChange}
          ref={fileInputRef}
        />

        <label>Sasia</label>
        <div className="modal-flex">
          <InputNumber
            value={libri.sasia}
            onValueChange={handleSasiaChange}
          />
        </div>

        <div className="modal-btn">
          <button
            data-testid="ruaj-ndryshimet"
            className="submitbtn"
            onClick={handleSubmit}
          >
            Ruaj Ndryshimet
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default EditoLibrin;
