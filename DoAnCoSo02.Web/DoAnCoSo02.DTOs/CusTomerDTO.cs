using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	[Table("CusTomer")]
	public class CusTomerDTO
	{
		[Key]
		public int IdKhach { get; set; }
		public string HoTen { get; set; }
		public string SDT { get; set; }
		public string DiaChi { get; set; }
		public string Email { get; set; }
		public string UserName { get; set; }
		public string PassWp { get; set; }
		public bool IsBlocked { get; set; }
		public DateTime NgayTaoTK { get; set; }
	}
}
