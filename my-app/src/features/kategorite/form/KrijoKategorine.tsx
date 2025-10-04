import React, { useState } from "react";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";

interface IProps {
  kategoria: IKategoria;
  createKategoria: (kategoria: IKategoria) => void;
  editKategoria: (kategoria: IKategoria) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoKategorine: React.FC<IProps> = ({ show, onHide, createKategoria }) => {
  const [kategoria, setKategoria] = useState<IKategoria>({ kategoriaId: 0, emriKategorise: "" });

  const handleSubmit = () => {
    createKategoria({ ...kategoria });
    onHide();
  };

  return (
    <Dialog header="Krijo Kategorinë" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <div className="p-field">
        <label htmlFor="emriKategorise">Emri i kategorisë</label>
        <AutoComplete
          inputId="emriKategorise"
          value={kategoria.emriKategorise}
          onChange={(e) => setKategoria({ ...kategoria, emriKategorise: e.value })}
          placeholder="Shkruaj emrin"
          forceSelection={false}
          completeMethod={() => {}}
        />
      </div>
      <div className="modal-btn">
        <button type="button" className="p-button p-button-success" onClick={handleSubmit}>
          Ruaj
        </button>
      </div>
    </Dialog>
  );
};

export default KrijoKategorine;
