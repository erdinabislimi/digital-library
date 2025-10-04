using BibliotekaMS.Data;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BibliotekaMS.Repository
{
    public class AutoriRepository : IAutoriRepository
    {
        private DataContext _context;
        public AutoriRepository(DataContext context)
        {
            _context = context;
        }
        public bool AutoriExists(int autoriId)
        {
            return _context.Autori.Any(a => a.AutoriId == autoriId);
        }

        public bool CreateAutori(Autori autori)
        {
            _context.Add(autori);
            return Save();
        }

        public bool DeleteAutori(Autori autori)
        {
            _context.Remove(autori);
            return Save();
        }

        public ICollection<Autori> GetAutoret()
        {
            return _context.Autori.ToList();
        }

        public Autori GetAutori(int autoriId)
        {
            return _context.Autori.Where(a => a.AutoriId == autoriId).FirstOrDefault();
        }

        public ICollection<Libri> GetLibriNgaAutori(int autoriId)
        {
            return _context.AutoriILibrit.Where(a => a.Autori.AutoriId == autoriId).Select(l => l.Libri).ToList();
        }

        public int GetAutoriId(string emriAutorit, string mbiemriAutorit)
        {
            var autori = _context.Autori
                .Where(a => a.Emri == emriAutorit && a.Mbiemri == mbiemriAutorit)
                .FirstOrDefault();

            if (autori != null)
            {
                return autori.AutoriId;
            }

            return 0;
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }

        public bool UpdateAutori(Autori autori)
        {
            _context.Update(autori);
            return Save();
        }
    }
}
