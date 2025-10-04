using BibliotekaMS.Data;
using BibliotekaMS.Models;

namespace BibliotekaMS.Repository
{
    public class AutoriILibritRepository : Interfaces.IAutoriILibritRepository
    {
        private DataContext _context;

        public AutoriILibritRepository(DataContext context)
        {
            _context = context;
        }
        public bool CreateAutoriILibrit(AutoriILibrit autoriILibrit)
        {
            _context.Add(autoriILibrit);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
