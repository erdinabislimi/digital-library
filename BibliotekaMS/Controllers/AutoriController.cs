using AutoMapper;
using BibliotekaMS.Dto;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using BibliotekaMS.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutoriController : Controller
    {
        private readonly IAutoriRepository _autoriRepository;
        private readonly IMapper _mapper;

        public AutoriController(IAutoriRepository autoriRepository, IMapper mapper)
        {
            _autoriRepository = autoriRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Autori>))]
        public IActionResult GetAutoret()
        {
            var autoret = _mapper.Map<List<AutoriDto>>(_autoriRepository.GetAutoret());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autoret);
        }
      

        [HttpGet("{autoriId}")]
        [ProducesResponseType(200, Type = typeof(Autori))]
        [ProducesResponseType(400)]

        public IActionResult GetAutori(int autoriId)
        {
            if (!_autoriRepository.AutoriExists(autoriId))
                return NotFound();

            var autori = _mapper.Map<AutoriDto>(_autoriRepository.GetAutori(autoriId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(autori);
        }

        [HttpGet("libri/{autoriId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Libri>))]
        [ProducesResponseType(400)]

        public IActionResult GetLibriNgaAutori(int autoriId)
        {
            if(!_autoriRepository.AutoriExists(autoriId))
            {
                return NotFound();
            }
            var librat = _mapper.Map<List<LibriDto>>(
                _autoriRepository.GetLibriNgaAutori(autoriId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(librat);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateAutori([FromBody] AutoriDto autoriCreate)
        {
            if (autoriCreate == null)
            {
                return BadRequest(ModelState);
            }

            var autori = _autoriRepository.GetAutoret()
                .Where(c => c.Emri.Trim().ToUpper() == autoriCreate.Emri.TrimEnd().ToUpper()).FirstOrDefault();

            if (autori != null)
            {
                ModelState.AddModelError("", "Autori already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var autoriMap = _mapper.Map<Autori>(autoriCreate);

            if (!_autoriRepository.CreateAutori(autoriMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok(autoriMap);
        }

        [HttpPut("{autoriId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateAutori(int autoriId, [FromBody] AutoriDto updatedAutori)
        {
            if (updatedAutori == null)
                return BadRequest(ModelState);

            if (autoriId != updatedAutori.AutoriId)
                return BadRequest(ModelState);

            if (!_autoriRepository.AutoriExists(autoriId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var autoriMap = _mapper.Map<Autori>(updatedAutori);

            if (!_autoriRepository.UpdateAutori(autoriMap))
            {
                ModelState.AddModelError("", "Something went wrong updating autori");
                return StatusCode(500, ModelState);

            }

            return NoContent();

        }

        [HttpDelete("{autoriId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteAutori(int autoriId)
        {
            if (!_autoriRepository.AutoriExists(autoriId))
            {
                return NotFound();
            }

            var autoriToDelete = _autoriRepository.GetAutori(autoriId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_autoriRepository.DeleteAutori(autoriToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting autori");
            }

            return NoContent();
        }

    }
}
   

