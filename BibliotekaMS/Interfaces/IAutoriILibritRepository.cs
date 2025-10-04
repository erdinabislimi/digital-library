using BibliotekaMS.Models;

namespace BibliotekaMS.Interfaces
{
    public interface IAutoriILibritRepository
    {
        bool CreateAutoriILibrit(AutoriILibrit autoriILibrit);
        bool Save();
    }
}
