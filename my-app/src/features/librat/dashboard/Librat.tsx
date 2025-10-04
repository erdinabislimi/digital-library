import { useEffect, useState } from "react";
import { ILibri } from "../../../app/layout/models/libri";
import agent from "../../../app/layout/api/agent";
import LibriDashboard from "./LibriDashboard";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { IAutori } from "../../../app/layout/models/autori";
import Sidebar from "../../../dashboard/Sidebar"// Adjust the path as needed

const Librat = () => {
  const [librat, setLibrat] = useState<ILibri[]>([]);
  const [selectedLibri, setSelectedLibri] = useState<ILibri | null>(null);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleCreateLibri = (libri: ILibriRequest) => {
    agent.Librat.create(libri).then(() => {
      setLibrat([...librat, libri.libri]);
      setSelectedLibri(libri.libri);
      setEditMode(false);
    });
  };

  const handleEditLibri = (libri: ILibri) => {
    agent.Librat.update(libri).then(() => {
      setLibrat([...librat.filter((l) => l.isbn !== libri.isbn), libri]);
      setSelectedLibri(libri);
      setEditMode(false);
    });
  };

  const handleDeleteLibri = (isbn: string) => {
    agent.Librat.delete(isbn).then(() => {
      setLibrat([...librat.filter((l) => l.isbn !== isbn)]);
    });
  };

  const handleSelectLibri = (isbn: string) => {
    setSelectedLibri(librat.filter((l) => l.isbn === isbn)[0]);
    setEditMode(true);
  };

  useEffect(() => {
    agent.Librat.list().then((response: ILibri[]) => {
      setLibrat(response);
    });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-section">
        <LibriDashboard
          librat={librat}
          selectLibri={handleSelectLibri}
          selectedLibri={selectedLibri!}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedLibri={setSelectedLibri}
          createLibri={handleCreateLibri}
          editLibri={handleEditLibri}
          deleteLibri={handleDeleteLibri}
          createMode={createMode}
          setCreateMode={setCreateMode}
        />
      </div>
    </div>
  );
};

export default Librat;
