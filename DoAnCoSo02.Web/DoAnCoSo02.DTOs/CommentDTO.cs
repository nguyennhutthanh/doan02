using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	[Table("Comment")]
	public class CommentDTO
	{
		public CommentDTO()
		{
			IdComment = new DetailProductDTO();
		}
		[Key]
		public int id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string NoiDung { get; set; }
		public DateTime NgayBinhLuan { get; set; }
		public bool? TrangThai { get; set; }
		public bool Spam { get; set; }
		public int IdProduct { get; set; }
		[ForeignKey("IdProduct")]
		public DetailProductDTO IdComment { get; set; }
	}
}
