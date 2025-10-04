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
    public class KategoriaController : Controller
    {
        private readonly Interfaces.IKategoriaRepository _kategoriaRepository;
        private readonly IMapper _mapper;

        public KategoriaController(Interfaces.IKategoriaRepository kategoriaRepository, IMapper mapper)
        {
            _kategoriaRepository = kategoriaRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Kategoria>))]
        public IActionResult GetKategorite()
        {
            var kategorite = _mapper.Map<List<KategoriaDto>>(_kategoriaRepository.GetKategorite());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(kategorite);
        }

        [HttpGet("{kategoriaId}")]
        [ProducesResponseType(200, Type = typeof(Kategoria))]
        [ProducesResponseType(400)]

        public IActionResult GetKategoria(int kategoriaId)
        {
            if (!_kategoriaRepository.KategoriaExists(kategoriaId))
                return NotFound();

            var kategoria = _mapper.Map<KategoriaDto>(_kategoriaRepository.GetKategoria(kategoriaId));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(kategoria);
        }

        [HttpGet("libri/{kategoriaId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Libri>))]
        [ProducesResponseType(400)]

        public IActionResult GetLibriNgaKategoria(int kategoriaId)
        {
            if (!_kategoriaRepository.KategoriaExists(kategoriaId))
            {
                return NotFound();
            }
            var librat = _mapper.Map<List<LibriDto>>(
                _kategoriaRepository.GetLibriNgaKategoria(kategoriaId));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(librat);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]

        public IActionResult CreateKategoria([FromBody] KategoriaDto kategoriaCreate)
        {
            if (kategoriaCreate == null)
            {
                return BadRequest(ModelState);
            }

            var kategoria = _kategoriaRepository.GetKategorite()
                .Where(c => c.EmriKategorise.Trim().ToUpper() == kategoriaCreate.EmriKategorise.TrimEnd().ToUpper()).FirstOrDefault();

            if (kategoria != null)
            {
                ModelState.AddModelError("", "Kategoria already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var kategoriaMap = _mapper.Map<Kategoria>(kategoriaCreate);

            if (!_kategoriaRepository.CreateKategoria(kategoriaMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok(kategoriaMap);


        }

        [HttpPut("{kategoriaId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateKategoria(int kategoriaId, [FromBody] KategoriaDto updatedKategoria)
        {
            if (updatedKategoria == null)
                return BadRequest(ModelState);

            if (kategoriaId != updatedKategoria.KategoriaId)
                return BadRequest(ModelState);

            if (!_kategoriaRepository.KategoriaExists(kategoriaId))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var kategoriaMap = _mapper.Map<Kategoria>(updatedKategoria);

            if (!_kategoriaRepository.UpdateKategoria(kategoriaMap))
            {
                ModelState.AddModelError("", "Something went wrong updating kategoria");
                return StatusCode(500, ModelState);

            }

            return NoContent();

        }

        [HttpDelete("{kategoriaId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteKategoria(int kategoriaId)
        {
            if (!_kategoriaRepository.KategoriaExists(kategoriaId))
            {
                return NotFound();
            }

            var kategoriaToDelete = _kategoriaRepository.GetKategoria(kategoriaId);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_kategoriaRepository.DeleteKategoria(kategoriaToDelete))
            {
                ModelState.AddModelError("", "Something went wrong deleting kategoria");
            }

            return NoContent();
        }

    }
}

