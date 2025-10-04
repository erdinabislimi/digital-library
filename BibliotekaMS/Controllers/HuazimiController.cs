using BibliotekaMS.Data;
using BibliotekaMS.Dto;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HuazimiController : Controller
    {
        private readonly DataContext _context;

        public HuazimiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Rezervimi>>> GetAll()
        {
            var huazimi = await _context.Huazimi.Include(c => c.Libri).Include(b => b.ApplicationUser).ToListAsync();
            return Ok(huazimi);
        }

        [HttpPost]
        public async Task<IActionResult> Add(HuazimiDto huazimiDto)
        {
            if (huazimiDto == null)
                return BadRequest("Failed");

            var huazimi = new Huazimi
            {
                Username = huazimiDto.Username,
                CurrentDate = huazimiDto.CurrentDate,
                DueDate = huazimiDto.DueDate,
                ReturnDate = huazimiDto.ReturnDate,
                Id = huazimiDto.Id,
                Isbn = huazimiDto.Isbn
            };

            _context.Huazimi.Add(huazimi);
            await _context.SaveChangesAsync();

            return Ok(huazimi);
        }

        [HttpPut("{huazimiId}")]
        public async Task<ActionResult<List<Huazimi>>> Update(int huazimiId, HuazimiDto huazimiDto)
        {
            var update = await _context.Huazimi.FirstOrDefaultAsync(c => c.HuazimiId == huazimiId);
            if (update == null)
                return BadRequest("Rezervimi not found");

            update.DueDate = huazimiDto.DueDate;
            update.ReturnDate = huazimiDto.ReturnDate;
            update.isReturned = huazimiDto.isReturned;

            _context.Huazimi.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Huazimi>>> Delete(int id)
        {
            var delete = await _context.Huazimi.FirstOrDefaultAsync(c => c.HuazimiId == id);
            if (delete == null)
                return BadRequest("Rezervimi not found");

            _context.Huazimi.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfully");
        }
        [HttpGet("countBorrowed")]
        public async Task<ActionResult<int>> CountBorrowedBooks()
        {
            // Count the number of Huazimi records where isReturned is false (i.e., books not yet returned)
            var count = await _context.Huazimi.Where(h => !h.isReturned).CountAsync();

            return Ok(count);
        }

    }
}
