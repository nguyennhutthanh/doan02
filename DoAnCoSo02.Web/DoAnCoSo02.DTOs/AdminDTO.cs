using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
    [Table("Admin")]
    public class AdminDTO
	{
        public AdminDTO()
		{
            IsAdmin = new List<ForgotPassDTO>();
        }
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        [Required(ErrorMessage = "Trường này Không được trống")]
        public string UserName { get; set; }
        [MaxLength(200)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [MaxLength(200)]
        [NotMapped]
        public string EnterPassword { get; set; }
        [DisplayName("Muối")]
        [MaxLength(200)]
        public string Salt { get; set; }
        public bool IsSuperAdmin { get; set; }
        public string Email { get; set; }
        public bool IsBlocked { get; set; }
        public string Avatar { get; set; }
        [NotMapped]
        public IFormFile UrlAvatar { get; set; }
        public ICollection<ForgotPassDTO> IsAdmin { get; set; }
    }
}
