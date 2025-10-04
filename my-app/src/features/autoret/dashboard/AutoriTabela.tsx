import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { IAutori } from "../../../app/layout/models/autori";
import { Table } from "react-bootstrap";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { PaginatorPageChangeEvent } from "primereact/paginator";

interface IProps {
  autoret: IAutori[];
  setEditAutMode: (editMode: boolean) => void;
  setCreateAutMode: (createMode: boolean) => void;
  selectAutori: (autoriId: number) => void;
  deleteAutori: (autoriId: number) => void;
}

const AutoriTabela: React.FC<IProps> = ({
  autoret,
  setCreateAutMode,
  selectAutori,
  deleteAutori,
}) => {
  const [first, setFirst] = useState<number>(0);
  const itemsPerPage = 15;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  const renderTabelaRows = () => {
    const startIndex = first;
    const endIndex = first + itemsPerPage;
    return autoret.slice(startIndex, endIndex).map((autori) => (
      <tr key={autori.autoriId} id={`authorRow-${autori.autoriId}`}>
        <td>{autori.emri}</td>
        <td>{autori.mbiemri}</td>
        <td>
          <Button
            id={`editAuthorBtn-${autori.autoriId}`}
            label="Edit"
            severity="secondary"
            text
            onClick={() => selectAutori(autori.autoriId)}
          />
        </td>
        <td>
          <Button
            id={`deleteAuthorBtn-${autori.autoriId}`}
            label="Delete"
            severity="danger"
            text
            onClick={() => {
              if (window.confirm("A jeni të sigurt që doni të fshini autorin?")) {
                deleteAutori(autori.autoriId);
              }
            }}
          />
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="tabela">
        <Row className="align-items-center justify-content-between">
          <Col>
            <h3>Lista e autorëve</h3>
          </Col>
          <Col xs="auto">
            <Button
              id="createAuthorBtn"
              icon="pi pi-plus"
              style={{ backgroundColor: "#981c5c", borderColor: "#981c5c" }}
              className="p-button-rounded p-button-success"
              onClick={() => setCreateAutMode(true)}
            />
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th scope="col">Emri</th>
              <th scope="col">Mbiemri</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderTabelaRows()}</tbody>
        </Table>
      </div>
      <Paginator
        className="paginator"
        first={first}
        rows={itemsPerPage}
        totalRecords={autoret.length}
        onPageChange={onPageChange}
        template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
      />
    </>
  );
};

export default AutoriTabela;
