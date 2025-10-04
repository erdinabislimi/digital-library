using BibliotekaMS.Data;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using Microsoft.Extensions.Hosting;


namespace BibliotekaMS.Repository
{
    public class LibriRepository : ILibriRepository
    {
        private readonly DataContext _context;
     

        public LibriRepository(DataContext context)
        {
            _context = context;
        }


        public bool CreateLibri(Libri libri)

        {
            _context.Add(libri);
            return Save();
        }

        public bool DeleteLibri(Libri libri)
        {
            _context.Remove(libri);
            return Save();
        }

        public ICollection<Libri> GetLibrat()
        {
            return _context.Libri.OrderBy(p => p.Isbn).ToList();
        }

        public Libri GetLibri(string isbn)
        {
            return _context.Libri.Where(p => p.Isbn == isbn).FirstOrDefault();
        }

        public Libri GetLibriTitulli(string titulli)
        {
            return _context.Libri.Where(p => p.Titulli == titulli).FirstOrDefault();
        }
        public ICollection<Autori> GetAutoriNgaLibri(string isbn)
        {
            return _context.AutoriILibrit.Where(l => l.Libri.Isbn == isbn).Select(a => a.Autori).ToList();
        }

        public ICollection<Kategoria> GetKategoriaNgaLibri(string isbn)
        {
            return _context.KategoriaELibrit.Where(l => l.Libri.Isbn == isbn).Select(k => k.Kategoria).ToList();
        }

        public bool LibriExists(string LibriId)
        {
            return _context.Libri.Any(p => p.Isbn == LibriId);
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateLibri(int kategoriaId, Libri libri)
        {
            _context.Update(libri);
            return Save();
        }
    }
}