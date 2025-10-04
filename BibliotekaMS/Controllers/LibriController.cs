using AutoMapper;
using BibliotekaMS.Dto;
using BibliotekaMS.Interfaces;
using BibliotekaMS.Models;
using BibliotekaMS.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace BibliotekaMS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibriController : Controller
    {
        private readonly ILibriRepository _libriRepository;
        private readonly IKategoriaELibritRepository _kategoriaELibritRepository;
        private readonly IAutoriILibritRepository _autoriILibritRepository;
        private readonly IKategoriaRepository _kategoriaRepository;
        private readonly IAutoriRepository _autoriRepository;
        private readonly IMapper _mapper;

        public LibriController(ILibriRepository libriRepository, IKategoriaELibritRepository kategoriaELibritRepository, IAutoriILibritRepository autoriILibritRepository, IKategoriaRepository kategoriaRepository, IAutoriRepository autoriRepository, IMapper mapper)
        {
            _libriRepository = libriRepository;
            _kategoriaELibritRepository = kategoriaELibritRepository;
            _autoriILibritRepository = autoriILibritRepository;
            _kategoriaRepository = kategoriaRepository;
            _autoriRepository = autoriRepository;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Libri>))]
        public IActionResult GetLibrat()
        {
            var librat = _mapper.Map<List<LibriDto>>(_libriRepository.GetLibrat());

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(librat);
        }

        [HttpGet("{libriIsbn}")]
        [ProducesResponseType(200, Type = typeof(Libri))]
        [ProducesResponseType(400)]

        public IActionResult GetLibri(string libriIsbn)
        {
            if (!_libriRepository.LibriExists(libriIsbn))
                return NotFound();

            var libri = _mapper.Map<LibriDto>(_libriRepository.GetLibri(libriIsbn));

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(libri);
        }

        [HttpGet("kategoria/{isbn}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Kategoria>))]
        [ProducesResponseType(400)]

        public IActionResult GetKategoriaNgaLibri(string isbn)
        {
            if (!_libriRepository.LibriExists(isbn))
            {
                return NotFound();
            }
            var kategorite = _mapper.Map<List<KategoriaDto>>(
                _libriRepository.GetKategoriaNgaLibri(isbn));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(kategorite);
        }

        [HttpGet("autori/{isbn}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Autori>))]
        [ProducesResponseType(400)]

        public IActionResult GetAutoriNgaLibri(string isbn)
        {
            if (!_libriRepository.LibriExists(isbn))
            {
                return NotFound();
            }
            var autoret = _mapper.Map<List<AutoriDto>>(
                _libriRepository.GetAutoriNgaLibri(isbn));

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(autoret);
        }

        /*
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateLibri([FromQuery] KategoriaAutoriRequest request, [FromBody] LibriDto libriCreate)
        {
            if (libriCreate == null)
                return BadRequest(ModelState);

            var librat = _libriRepository.GetLibrat()
                .Where(c => c.Titulli.Trim().ToUpper() == libriCreate.Titulli.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (librat != null)
            {
                ModelState.AddModelError("", "Libri already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var libriMap = _mapper.Map<Libri>(libriCreate);

            // Create and save the Libri
            if (!_libriRepository.CreateLibri(libriMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            // Create and save KategoriaELibrit records for each Kategoria in request.kategorite
            if (request.kategorite != null)
            {
                foreach (string kategoriaName in request.kategorite)
                {
                    // Get the KategoriaId from the KategoriaRepository based on emriKategorise
                    int kategoriaId = _kategoriaRepository.GetKategoriaId(kategoriaName);

                    if (kategoriaId != 0)
                    {
                        var kategoriaELibrit = new KategoriaELibrit
                        {
                            Isbn = libriMap.Isbn, // Assuming Isbn is the primary key of the Libri
                            KategoriaId = kategoriaId // Use the fetched KategoriaId
                        };

                        // Save KategoriaELibrit record to the database
                        _kategoriaELibritRepository.CreateKategoriaELibrit(kategoriaELibrit);
                    }
                }
            }

            if (request.autoret != null)
            {
                foreach (string autoriFullName in request.autoret)
                {
                    string[] parts = autoriFullName.Split(' ');
                    if (parts.Length == 2) // Ensure there are two parts
                    {
                        string autoriName = parts[0];
                        string autoriLastName = parts[1];

                        // Get the AutoriId from the AutoriRepository based on autoriName and autoriLastName
                        int autoriId = _autoriRepository.GetAutoriId(autoriName, autoriLastName);

                        if (autoriId != 0)
                        {
                            var autoriILibrit = new AutoriILibrit
                            {
                                Isbn = libriMap.Isbn, // Assuming Isbn is the primary key of the Libri
                                AutoriId = autoriId // Use the fetched AutoriId
                            };

                            // Save AutoriILibrit record to the database
                            _autoriILibritRepository.CreateAutoriILibrit(autoriILibrit);
                        }
                    }
                    else
                    {
                        // Handle invalid format for autoriFullName
                        ModelState.AddModelError("", "Invalid format for autoriFullName: " + autoriFullName);
                        return BadRequest(ModelState);
                    }
                }
            }
            return Ok("Successfully created");
        }*/
        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateLibri([FromBody] LibriRequest libriRequest)
        {
            if (libriRequest == null || libriRequest.libri == null)
                return BadRequest(ModelState);

            var librat = _libriRepository.GetLibrat()
                .Where(c => c.Titulli.Trim().ToUpper() == libriRequest.libri.Titulli.TrimEnd().ToUpper())
                .FirstOrDefault();

            if (librat != null)
            {
                ModelState.AddModelError("", "Libri already exists");
                return StatusCode(422, ModelState);
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Extract data from LibriRequest
            var libriData = libriRequest.libri;
            var kategorite = libriRequest.kategorite;
            var autoret = libriRequest.autoret;

            var libriMap = _mapper.Map<Libri>(libriData);

            // Create and save the Libri
            if (!_libriRepository.CreateLibri(libriMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            // Create and save KategoriaELibrit records for each Kategoria in kategorite
            if (kategorite != null)
            {
                foreach (string kategoriaName in kategorite)
                {
                    // Get the KategoriaId from the KategoriaRepository based on emriKategorise
                    int kategoriaId = _kategoriaRepository.GetKategoriaId(kategoriaName);

                    if (kategoriaId != 0)
                    {
                        var kategoriaELibrit = new KategoriaELibrit
                        {
                            Isbn = libriMap.Isbn, // Assuming Isbn is the primary key of the Libri
                            KategoriaId = kategoriaId // Use the fetched KategoriaId
                        };

                        // Save KategoriaELibrit record to the database
                        _kategoriaELibritRepository.CreateKategoriaELibrit(kategoriaELibrit);
                    }
                }
            }

            // Create and save AutoriILibrit records for each Autori in autoret
            if (autoret != null)
            {
                foreach (string autoriFullName in autoret)
                {
                    string[] parts = autoriFullName.Split(' ');
                    if (parts.Length == 2) // Ensure there are two parts
                    {
                        string autoriName = parts[0];
                        string autoriLastName = parts[1];

                        // Get the AutoriId from the AutoriRepository based on autoriName and autoriLastName
                        int autoriId = _autoriRepository.GetAutoriId(autoriName, autoriLastName);

                        if (autoriId != 0)
                        {
                            var autoriILibrit = new AutoriILibrit
                            {
                                Isbn = libriMap.Isbn, // Assuming Isbn is the primary key of the Libri
                                AutoriId = autoriId // Use the fetched AutoriId
                            };

                            // Save AutoriILibrit record to the database
                            _autoriILibritRepository.CreateAutoriILibrit(autoriILibrit);
                        }
                    }
                    else
                    {
                        // Handle invalid format for autoriFullName
                        ModelState.AddModelError("", "Invalid format for autoriFullName: " + autoriFullName);
                        return BadRequest(ModelState);
                    }
                }
            }
            return Ok("Successfully created");
        }



        [HttpPut("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult UpdateLibri(string libriIsbn, [FromQuery] int kategoriaId, [FromBody] LibriDto updatedLibri)
        {
            if (updatedLibri == null)
                return BadRequest(ModelState);

            if (libriIsbn != updatedLibri.isbn)
                return BadRequest(ModelState);

            if (!_libriRepository.LibriExists(libriIsbn))
                return NotFound();

            if (!ModelState.IsValid)
                return BadRequest();

            var libriMap = _mapper.Map<Libri>(updatedLibri);

            if (!_libriRepository.UpdateLibri(kategoriaId, libriMap))
            {
                ModelState.AddModelError("", "Something went wrong updating libri");
                return StatusCode(500, ModelState);
            }

            return NoContent();

        }

        [HttpDelete("{libriIsbn}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult DeleteLibri(string libriIsbn)
        {
            if (!_libriRepository.LibriExists(libriIsbn))
            {
                return NotFound();
            }


            var libriToDelete = _libriRepository.GetLibri(libriIsbn);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_libriRepository.DeleteLibri(libriToDelete))
            {
                ModelState.AddModelError("", "Something went erong deleting Libri");
            }
            return NoContent();
        }

        [HttpGet("count")]
        [ProducesResponseType(200, Type = typeof(int))]
        public IActionResult CountBooks()
        {
            // Get all books from the repository and count them
            var count = _libriRepository.GetLibrat().Count();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(count);
        }

    }

}

