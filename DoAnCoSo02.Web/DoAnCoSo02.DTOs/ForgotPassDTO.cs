using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
    [Table("ForgotPassWp")]
    public class ForgotPassDTO
	{
        public ForgotPassDTO()
		{
            IsAdmin = new AdminDTO();
        }
        [Key]
        public int id { get; set; }
        public string Code { get; set; }
        public DateTime CreateTime { get; set; }
        public DateTime GhoshTime { get; set; }
        public bool IsActive { get; set; }
        public int IdAdmin { get; set; }
        [ForeignKey("IdAdmin")]
        public AdminDTO IsAdmin { get; set; }
    }
}
