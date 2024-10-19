using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pruebabackend.Services;

namespace pruebabackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LoansController : ControllerBase
    {
        private readonly ILoanService _loanService;

        public LoansController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        [HttpPost("request")]
        public IActionResult RequestLoan([FromBody] LoanRequestDto request)
        {
            var result = _loanService.RequestLoan(request.UserId, request.Amount);
            return result.IsCompletedSuccessfully ? Ok(result) : BadRequest("Error en el sistema");
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("approve/{loanId}")]
        public IActionResult ApproveLoan(int loanId)
        {
            var result = _loanService.ApproveLoan(loanId);
            return result.IsCompletedSuccessfully ? Ok(result) : BadRequest("Error en el sistema");
        }

        [Authorize]
        [HttpGet("{userId}")]
        public IActionResult GetLoans(int userId)
        {
            var loans = _loanService.GetLoansByUser(userId);
            return Ok(loans);
        }
    }

}
