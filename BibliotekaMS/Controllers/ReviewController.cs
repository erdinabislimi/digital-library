using BibliotekaMS.Data;
using BibliotekaMS.Dto;
using BibliotekaMS.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : Controller
    {
        private readonly DataContext _context;

        public ReviewController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Review>>> GetAll()
        {
            var review = await _context.Review.Include(c => c.Libri).Include(b => b.ApplicationUser).ToListAsync();
            return Ok(review);
        }

        [HttpPost]
        public async Task<IActionResult> Add(ReviewDto reviewDto)
        {
            if (reviewDto == null || string.IsNullOrWhiteSpace(reviewDto.Komenti))
                return BadRequest("Komenti nuk mund të jetë bosh.");

            var review = new Review
            {
                Username = reviewDto.Username,
                Komenti = reviewDto.Komenti,
                Date = reviewDto.Date,
                IsEdited = false,
                Isbn = reviewDto.Isbn,
                Id = reviewDto.Id
            };

            _context.Review.Add(review);
            await _context.SaveChangesAsync();

            return Ok(review);
        }
        [HttpPut("{reviewId}")]
        public async Task<ActionResult<List<Review>>> Update(int reviewId, ReviewDto reviewDto)
        {
            var update = await _context.Review.FirstOrDefaultAsync(c => c.ReviewId == reviewId);
            if (update == null)
                return BadRequest("Rezervimi not found");

            update.IsEdited = true;
            update.Komenti = reviewDto.Komenti;

            _context.Review.Update(update);
            await _context.SaveChangesAsync();

            return Ok("Updated successfully");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Review>>> Delete(int id)
        {
            var delete = await _context.Review.FirstOrDefaultAsync(c => c.ReviewId == id);
            if (delete == null)
                return BadRequest("Rezervimi not found");

            _context.Review.Remove(delete);
            await _context.SaveChangesAsync();

            return Ok("Deleted successfully");
        }
    }
}

