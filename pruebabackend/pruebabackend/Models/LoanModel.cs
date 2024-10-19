namespace pruebabackend.Models
{
    public class LoanModel
    {
            public int Id { get; set; }
            public decimal Amount { get; set; }
            public int TermMonths { get; set; }
            public string Status { get; set; } // Pending, Approved, Rejected
            public int UserId { get; set; }
        
    }
}
