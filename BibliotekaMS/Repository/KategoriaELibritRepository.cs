using BibliotekaMS.Data;
using BibliotekaMS.Models;

namespace BibliotekaMS.Repository
{
    public class KategoriaELibritRepository : Interfaces.IKategoriaELibritRepository
    {
        private DataContext _context;

        public KategoriaELibritRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateKategoriaELibrit(KategoriaELibrit kategoriaELibrit)
        {
            _context.Add(kategoriaELibrit);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

    }
}
