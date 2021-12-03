using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	[Table("MaterialProduct")]
	public class ProductMaterialDTO
	{
		public ProductMaterialDTO()
		{
			ChatLieuNavigation = new HashSet<DetailProductDTO>();
		}
		[Key]
		public int id { get; set; }
		public string TenChatLieu { get; set; }
		public string urlAnhChatLieu { get; set; }
		public string TenAnh { get; set; }
		[NotMapped]
		public IFormFile AnhChatLieu { get; set; }
		public ICollection<DetailProductDTO> ChatLieuNavigation { get; set; }
	}
}
