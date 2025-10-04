using BibliotekaMS.Data;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;

namespace BibliotekaMS.Repository
{
    public class KategoriaRepository : Interfaces.IKategoriaRepository
    {
        private DataContext _context;
        public KategoriaRepository(DataContext context)
        {
            _context = context;
        }

        public bool CreateKategoria(Kategoria kategoria)
        {
            _context.Add(kategoria);
            return Save();
        }


        public bool DeleteKategoria(Kategoria kategoria)
        {
            _context.Remove(kategoria);
            return Save();
        }

        public Kategoria GetKategoria(int id)
        {
            return _context.Kategoria.Where(k => k.KategoriaId == id).FirstOrDefault();
        }

        public int GetKategoriaId(string emriKategorise)
        {
            var kategoria = _context.Kategoria.Where(k => k.EmriKategorise == emriKategorise).FirstOrDefault();
            if (kategoria != null)
            {
                return kategoria.KategoriaId;
            }
            return 0;
        }

        public ICollection<Kategoria> GetKategorite()
        {
            return _context.Kategoria.ToList();
        }

        public ICollection<Libri> GetLibriNgaKategoria(int kategoriaId)
        {
            return _context.KategoriaELibrit.Where(e => e.KategoriaId == kategoriaId).Select(c => c.Libri).ToList();

        }

        public bool KategoriaExists(int kategoriaId)
        {
            return _context.Kategoria.Any(k => k.KategoriaId == kategoriaId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateKategoria(Kategoria kategoria)
        {
            _context.Update(kategoria);
            return Save();
        }

      
    }
}
