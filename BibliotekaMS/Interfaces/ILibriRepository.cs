using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface ILibriRepository
    {
        ICollection<Libri> GetLibrat();
        Libri GetLibri(string isbn);

        Libri GetLibriTitulli(string titulli);

        ICollection<Autori> GetAutoriNgaLibri(string isbn);

        ICollection<Kategoria> GetKategoriaNgaLibri(string isbn);

        bool LibriExists(String libriId);

        bool CreateLibri(Libri libri);

        bool UpdateLibri(int kategoriaId, Libri libri);

        bool DeleteLibri(Libri libri);

        bool Save();

    }
}