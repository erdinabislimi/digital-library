using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IKategoriaELibritRepository
    {
        bool CreateKategoriaELibrit(KategoriaELibrit kategoriaELibrit);
        bool Save();
    }
}
