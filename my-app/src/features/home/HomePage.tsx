import { Col, Container, Row, Form } from "react-bootstrap";
import LibriCard from "./LibriCard";
import { useEffect, useState } from "react";
import { ILibri } from "../../app/layout/models/libri";
import { IKategoria } from "../../app/layout/models/kategoria";
import { IAutori } from "../../app/layout/models/autori";
import agent from "../../app/layout/api/agent";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Panel } from "primereact/panel";
import { Checkbox } from "primereact/checkbox";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import BookGifs from './BookGifs.gif';

const HomePage = () => {
  const [allBooks, setAllBooks] = useState<ILibri[]>([]);
  const [librat, setLibrat] = useState<ILibri[]>([]);
  const [kategorite, setKategorite] = useState<IKategoria[]>([]);
  const [selectedKategorite, setSelectedKategorite] = useState<IKategoria[]>([]);
  const [autoret, setAutoret] = useState<IAutori[]>([]);
  const [selectedAutoret, setSelectedAutoret] = useState<IAutori[]>([]);
  const [first, setFirst] = useState<number>(0);
  const [showMoreKategorite, setShowMoreKategorite] = useState<boolean>(false);
  const [showMoreAutoret, setShowMoreAutoret] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    agent.Librat.list().then((response: ILibri[]) => {
      setAllBooks(response);
      setLibrat(response);
    });

    agent.Kategorite.list().then((response: IKategoria[]) => {
      setKategorite(response);
    });

    agent.Autoret.list().then((response: IAutori[]) => {
      setAutoret(response);
    });

    window.scrollTo(0, 0);
  }, [first]);

  // Filter books based on selected categories
  useEffect(() => {
    const selectedKategoriaIds = selectedKategorite.map((k) => k.kategoriaId);
    if (selectedKategoriaIds.length > 0) {
      const filteredLibratPromises: any[] = [];
      selectedKategoriaIds.forEach((kategoriaId) => {
        filteredLibratPromises.push(agent.Kategorite.getLibriNgaKategoria(kategoriaId));
      });
      Promise.all(filteredLibratPromises).then((filteredResponses) => {
        const flatArray = filteredResponses.flat();
        const uniqueLibrat = Array.from(new Set(flatArray.map((libri) => libri.isbn)))
          .map((isbn) => flatArray.find((libri) => libri.isbn === isbn));
        setLibrat(uniqueLibrat);
      });
    } else {
      setLibrat(allBooks);
    }
  }, [selectedKategorite, selectedAutoret, allBooks]);

  // Filter books by search query
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const filtered = allBooks.filter((libri) =>
        libri.titulli.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setLibrat(filtered);
    } else {
      setLibrat(allBooks);
    }
  }, [searchQuery, allBooks]);

  const onKategoriaChange = (event: any, kategoria: IKategoria) => {
    const updated = event.checked
      ? [...selectedKategorite, kategoria]
      : selectedKategorite.filter((item) => item.kategoriaId !== kategoria.kategoriaId);
    setSelectedKategorite(updated);
  };

  const onAutoriChange = (event: any, autori: IAutori) => {
    const updated = event.checked
      ? [...selectedAutoret, autori]
      : selectedAutoret.filter((item) => item.autoriId !== autori.autoriId);
    setSelectedAutoret(updated);
  };

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderLibriCards = (librat: ILibri[]) => {
    const rows = [];
    for (let i = first; i < librat.length; i += 3) {
      const row = (
        <Row key={i} className="mb-4">
          {librat.slice(i, i + 3).map((libri: ILibri) => (
            <Col md={4} key={libri.isbn} className="d-flex">
              <LibriCard librat={[libri]} />
            </Col>
          ))}
        </Row>
      );
      rows.push(row);
    }
    return rows;
  };

  const renderKategoriteCheckboxes = (kList: IKategoria[]) => {
    const visibleItems = showMoreKategorite ? kList : kList.slice(0, 10);
    return visibleItems.map((k) => (
      <div key={k.kategoriaId} className="d-flex align-items-center mb-2">
        <Checkbox
          inputId={k.kategoriaId.toString()}
          name="kategoria"
          value={k}
          onChange={(e) => onKategoriaChange(e, k)}
          checked={selectedKategorite.some((item) => item.kategoriaId === k.kategoriaId)}
        />
        <label htmlFor={k.kategoriaId.toString()} className="ms-2">
          {k.emriKategorise}
        </label>
      </div>
    ));
  };

  const renderAutoretCheckboxes = (aList: IAutori[]) => {
    const visibleItems = showMoreAutoret ? aList : aList.slice(0, 10);
    return visibleItems.map((a) => (
      <div key={a.autoriId} className="d-flex align-items-center mb-2">
        <Checkbox
          inputId={a.autoriId.toString()}
          name="autori"
          value={a}
          onChange={(e) => onAutoriChange(e, a)}
          checked={selectedAutoret.some((item) => item.autoriId === a.autoriId)}
        />
        <label htmlFor={a.autoriId.toString()} className="ms-2">
          {a.emri} {a.mbiemri}
        </label>
      </div>
    ));
  };

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(135deg, #ffe0e6, #ffffff)",
        minHeight: "100vh",
        paddingBottom: "50px",
      }}
    >
       {/* GIF Section at the Top */}
       <Row className="justify-content-center" style={{ marginBottom: "0.1px", paddingTop: "50px" }}>
        <Col xs={12} md={8} className="text-center">
          <img
            src={BookGifs} // Imported from './BookGifs.gif'
            alt="Read More Books"
            style={{
              margin: "25px",
              width: "20%", // Adjust size as needed
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            }}
          />
        </Col>
      </Row>

      {/* Hero Section */}
      <Row className="justify-content-center text-center" style={{ marginTop: "0px", marginBottom: "20px" }}>
        <Col xs={12} md={10}>
         <h1
  id="home-welcome"
  style={{ color: "#8b004c", fontWeight: "bold", fontSize: "2.75rem" }}
>
  Discover Your Next Favorite Book
</h1>
          <p style={{ fontSize: "1.15rem", color: "#333", marginTop: "10px" }}>
            Explore our extensive collection and find the perfect read for you.
          </p>
        </Col>
      </Row>

      {/* Search Section */}
      <Row className="align-items-center justify-content-center px-3 mb-4">
        <Col xs={12} md={6} className="text-center mb-3">
          <Form>
            <Form.Control
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                borderRadius: "50px",
                padding: "0.75rem 1.5rem",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                fontSize: "1rem",
              }}
            />
          </Form>
        </Col>
      </Row>
      <Row className="px-3">
        {/* Filter Panels */}
        <Col md={3} className="mb-4">
          <Panel
            header="Kategoria"
            toggleable
            style={{
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
              backgroundColor: "#fff",
            }}
          >
            {renderKategoriteCheckboxes(kategorite)}
            <div className="mt-2">
              <button
                className="btn btn-link p-0"
                onClick={() => setShowMoreKategorite(!showMoreKategorite)}
              >
                {showMoreKategorite ? "Show Less" : "Show More"}
              </button>
            </div>
          </Panel>
          <Panel
            header="Autori"
            toggleable
            style={{
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
              backgroundColor: "#fff",
              marginTop: "20px",
            }}
          >
            {renderAutoretCheckboxes(autoret)}
            <div className="mt-2">
              <button
                className="btn btn-link p-0"
                onClick={() => setShowMoreAutoret(!showMoreAutoret)}
              >
                {showMoreAutoret ? "Show Less" : "Show More"}
              </button>
            </div>
          </Panel>
        </Col>

        {/* Book Cards */}
        <Col md={9}>
          {renderLibriCards(librat)}
        </Col>
      </Row>

      {/* Paginator */}
      <div className="d-flex justify-content-center mt-4">
        <Paginator
          first={first}
          rows={15}
          totalRecords={librat.length}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div>
    </Container>
  );
};

export default HomePage;
