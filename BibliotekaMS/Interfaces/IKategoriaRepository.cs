using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IKategoriaRepository
    {
        ICollection<Kategoria> GetKategorite();
        Kategoria GetKategoria(int id);

        int GetKategoriaId(string emriKategorise);
        ICollection<Libri> GetLibriNgaKategoria(int kategoriaId);
        bool KategoriaExists(int kategoriaId);

        bool CreateKategoria( Kategoria kategoria);

        bool UpdateKategoria(Kategoria kategoria);

        bool DeleteKategoria(Kategoria kategoria);

        bool Save();
    }
}

