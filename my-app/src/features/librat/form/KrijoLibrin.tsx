import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { ILibri } from "../../../app/layout/models/libri";
import { IKategoria } from "../../../app/layout/models/kategoria";
import { IAutori } from "../../../app/layout/models/autori";
import agent from "../../../app/layout/api/agent";
import { ILibriRequest } from "../../../app/layout/models/libriRequest";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { MultiSelect } from "primereact/multiselect";

interface IProps {
  libri: ILibri;
  createLibri: (libri: ILibriRequest) => void;
  show: boolean;
  onHide: () => void;
}

const KrijoLibrin: React.FC<IProps> = ({ show, onHide, createLibri }) => {
  const [libri, setLibri] = useState<ILibri>({
    isbn: "",
    titulli: "",
    pershkrimi: "",
    fotoja: "",
    sasia: 0 as number,
  });

  const [autoret, setAutoret] = useState<IAutori[]>([]);
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);
  const [selectedKategories, setSelectedKategories] = useState<IKategoria[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<IAutori[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Make an API call to fetch the list of authors from your server
    agent.Autoret.list()
      .then((response: IAutori[]) => {
        setAutoret(response);
      })
      .catch((error) => {
        // Handle any errors from the API call
        console.error("Error fetching authors: ", error);
      });

      agent.Kategorite.list()
      .then((response: IKategoria[]) => {
        setKategorite(response);
      })
      .catch((error) => {
        // Handle any errors from the API call
        console.error("Error fetching Kategoria options: ", error);
      });
  }, []);
  // Fetch Kategoria options from your server and update the state

const handleSubmit = () => {
  const libriRequest: ILibriRequest = {
    libri: { ...libri },
    kategorite: selectedKategories.map((kategoria) => kategoria.emriKategorise),
    autoret: selectedAuthors.map((autori) => autori.emri + ' ' + autori.mbiemri),
  };

  createLibri(libriRequest);
  onHide(); // Mbyll dialogun pas krijimit
};

  
  const validate = () => {
    const errs: { [key: string]: string } = {};
  
    if (!libri.isbn.trim()) errs.isbn = "ISBN nuk duhet të jetë bosh.";
    if (libri.titulli.trim().length < 2 || libri.titulli.length > 100)
      errs.titulli = "Titulli duhet të jetë 2-100 karaktere.";
    if (libri.pershkrimi.trim().length < 10 || libri.pershkrimi.length > 1000)
      errs.pershkrimi = "Përshkrimi duhet të jetë 10-1000 karaktere.";
    if (!libri.sasia || libri.sasia < 1)
      errs.sasia = "Sasia duhet të jetë së paku 1.";
    if (selectedKategories.length === 0)
      errs.kategorite = "Zgjidh të paktën një kategori.";
    if (selectedAuthors.length === 0)
      errs.autoret = "Zgjidh të paktën një autor.";
  
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const validateCopies = (copies: number) => {
    // Kontrollon nëse numri i kopjeve është më i vogël se 1 ose më i madh se 1000
    if (copies < 1 || copies > 1000) {
      return "Numri i kopjeve duhet të jetë midis 1 dhe 1000.";
    }
  
    return null; // Nëse validimi kalon
  };const validateISBN = (isbn: string) => {
    // Kontrollon nëse ISBN është bosh ose ka vetëm hapësira
    if (!isbn.trim()) {
      return "ISBN nuk mund të jetë bosh.";
    }
    
    // Kontrollon nëse ISBN është alfanumerik dhe ka minimum 10 dhe maksimum 13 karaktere
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(isbn)) {
      return "ISBN duhet të përmbajë vetëm shkronja dhe numra.";
    }
  
    if (isbn.length < 10 || isbn.length > 13) {
      return "ISBN duhet të ketë midis 10 dhe 13 karaktereve.";
    }
  
    return null; // Nëse validimi kalon
  };
  function convertFile(files: FileList | null) {
    if (files && files.length > 0) {
      const fileRef = files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const imageUrl = ev.target?.result as string;
        setLibri({ ...libri, fotoja: imageUrl });
      };

      reader.readAsDataURL(fileRef);
    }
  }

  return (
    <>
        <Dialog header="Krijo Librin" visible={show} style={{ width: '30vw' }} onHide={onHide}>
      <label>ISBN</label>
      <div className="modal-flex">
<AutoComplete
  id="isbn"
  value={libri.isbn}
  onChange={(e) => setLibri({ ...libri, isbn: e.target.value })}
/> {errors.isbn && <small className="text-danger">{errors.isbn}</small>}

    </div>
    <label>Titulli</label>
      <div className="modal-flex">
<AutoComplete
  id="titulli"
  value={libri.titulli}
  onChange={(e) => setLibri({ ...libri, titulli: e.target.value })}
/>    </div>
        <label>Përshkrimi</label>
      <div className="modal-flex">
<InputTextarea
  id="pershkrimi"
  value={libri.pershkrimi}
  onChange={(e) => setLibri({ ...libri, pershkrimi: e.target.value })}
/>      </div>
    {/* <label>Kopertina</label> */}
    {/* <div className="modal-flex"> 
    { <FileUpload mode="basic" name="kopertina" accept=".png,.jpg,.jpeg" maxFileSize={1000000} onUpload={onUpload} /> */}

      {/* </div> */}
      <Form.Label>Kopertina</Form.Label>
            <Form.Control
              id="fotoja"

              type="file"
              accept=".png,.jpg,.jpeg"
                onChange={(e) =>
    convertFile((e.target as HTMLInputElement).files)
              }
            /> 
      <label>Sasia</label>
      <div className="modal-flex">
<InputNumber
  id="sasia"
  value={libri.sasia}
  onValueChange={(e) => setLibri({ ...libri, sasia: e.value || 0 })}
/>      </div>
 <MultiSelect
  id="kategorite"
  value={selectedKategories}
  onChange={(e) => setSelectedKategories(e.value)}
  options={kategorite.map((kategoria) => ({
    label: kategoria.emriKategorise,
    value: kategoria,
    key: kategoria.kategoriaId,
  }))}
  optionLabel="label"
  display="chip"
  placeholder="Selekto kategoritë"
  maxSelectedLabels={3}
  className="w-full md:w-20rem"
/>

<MultiSelect
  id="autoret"
  value={selectedAuthors}
  onChange={(e) => setSelectedAuthors(e.value)}
  options={autoret.map((autori) => ({
    label: autori.emri + ' ' + autori.mbiemri,
    value: autori,
    key: autori.autoriId,
  }))}
  optionLabel="label"
  filter
  placeholder="Selekto Autorët"
  maxSelectedLabels={3}
  className="w-full md:w-20rem"
/>


      <div className="modal-btn">
<button id="submit-libri" className="submitbtn" onClick={handleSubmit}>Ruaj</button>
        </div>
    </Dialog>
 
    </>
  );
};

export default KrijoLibrin;
