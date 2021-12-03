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
	public class DanhMucHinhDTO
	{
		public DanhMucHinhDTO()
		{
			IsAnhSanPham = new DetailProductDTO();
		}
		[Key]
		public int Id { get; set; }
		public string TenAnh { get; set; }
		public string UrlAnh { get; set; }
		public DetailProductDTO IsAnhSanPham { get; set; }
	}
}
