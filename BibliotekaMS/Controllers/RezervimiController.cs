using BibliotekaMS.Data;
using BibliotekaMS.Dto;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RezervimiController : Controller
    {
        private readonly DataContext _context;

        public RezervimiController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Rezervimi>>> GetAll()
        {
            var rezervimi = await _context.Rezervimi.Include(c => c.Libri).Include(b => b.ApplicationUser).ToListAsync();
            return Ok(rezervimi);
        }
        [HttpPost]
        public async Task<IActionResult> Add(RezervimiDto rezervimiDto)
        {
            if (rezervimiDto == null)
                return BadRequest(new { status = "error", message = "Reservation data is null." });

            var rezervimi = new Rezervimi
            {
                Username = rezervimiDto.Username,
                DueDate = rezervimiDto.DueDate,
                Id = rezervimiDto.Id,
                Isbn = rezervimiDto.Isbn
            };

            try
            {
                _context.Rezervimi.Add(rezervimi);
                await _context.SaveChangesAsync();
                return Ok(new { status = "success", message = "Reservation created successfully.", reservation = rezervimi });
            }
            catch (Exception ex)
            {
                // Log the exception (ex) as needed
                return StatusCode(500, new { status = "error", message = "An error occurred while creating the reservation." });
            }
        }

        /*[HttpPost]
        public async Task <IActionResult> Add(RezervimiDto rezervimiDto)
        {
            if (rezervimiDto == null)
                return BadRequest("Failed");

            var rezervimi = new Rezervimi
            {
                Username = rezervimiDto.Username,
                DueDate = rezervimiDto.DueDate,
                Id = rezervimiDto.Id,
                Isbn = rezervimiDto.Isbn
            };

            _context.Rezervimi.Add(rezervimi);
            await _context.SaveChangesAsync();

            return Ok(rezervimi);
        }
        */
        [HttpPut("{rezervimiId}")]
        public async Task<ActionResult<List<Rezervimi>>> Update(int rezervimiId, RezervimiDto rezervimiDto)
        {
            var update = await _context.Rezervimi.FirstOrDefaultAsync(c => c.RezervimiId == rezervimiId);
            if (update == null)
                return BadRequest("Rezervimi not found");

            update.DueDate = rezervimiDto.DueDate;

            _context.Rezervimi.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Rezervimi>>> Delete(int id)
        {
            var delete = await _context.Rezervimi.FirstOrDefaultAsync(c => c.RezervimiId == id);
            if (delete == null)
                return BadRequest("Rezervimi not found");

            _context.Rezervimi.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfully");
        }
    }
}
