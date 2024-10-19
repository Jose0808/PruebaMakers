using pruebabackend.Models;

namespace pruebabackend.Services
{
    public interface ILoanService
    {
        Task<string> Login(string userId, string pass);
        Task<string> RequestLoan(int userId, decimal amount);

            Task<string> ApproveLoan(int loanId);

        Task <IEnumerable<LoanModel>> GetLoansByUser(int userId);
        
    }
}