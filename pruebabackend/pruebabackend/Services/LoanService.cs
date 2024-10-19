using Microsoft.AspNetCore.Http;
using pruebabackend.Models;

namespace pruebabackend.Services
{
    public class LoanService
    {
        public string Login(string userId, string pass)
        {

            return "";
        }

        public string RequestLoan(int userId, decimal amount, int termMonths)
        {

            return "";
        }

        public string ApproveLoan(int loanId)
        {
            return "";
        }

        public IEnumerable<LoanModel> GetLoansByUser(int userId)
        {
            // Lógica para obtener los préstamos de un usuario.
            IEnumerable<LoanModel> ie = new List<LoanModel>(
                );


            return (ie);
        }

    }

}
