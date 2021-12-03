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
	[Table("Trademark")]
	public class ThuongHieuProductDTO
	{
        public ThuongHieuProductDTO()
        {
            ThuongHieuProducts = new HashSet<DetailProductDTO>();
        }
        [Key]
        public int Id { get; set; }
        [DisplayName("Tên Thương Hiệu")]
        public string TenThuongHieu { get; set; }
		public string UrlAnhThuongHieu { get; set; }
		[NotMapped]
        public IFormFile AnhThuongHieu { get; set; }
        public virtual ICollection<DetailProductDTO> ThuongHieuProducts { get; set; }
    }
}
