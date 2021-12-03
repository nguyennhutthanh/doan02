using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	public class KhuyenMaiProductDTO
	{
		public KhuyenMaiProductDTO()
		{
			ProductCodeNavigation = new HashSet<DetailProductDTO>();
		}
		[Key]
		public int id { get; set; }
		public float Sale { get; set; }
		public DateTime Expire { get; set; }
		public int IdProduct { get; set; }
		public ICollection<DetailProductDTO> ProductCodeNavigation { get; set; }
	}
}
