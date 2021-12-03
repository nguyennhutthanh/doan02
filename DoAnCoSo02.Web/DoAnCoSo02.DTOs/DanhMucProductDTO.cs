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
    [Table("TypeProduct")]
    public class DanhMucProductDTO
    {
        public DanhMucProductDTO()
        {
            DanhMucSanPham = new HashSet<DetailProductDTO>();
            InterfaceRoomNavigation = new InterfaceRoomDTO();
        }

        [Key]
        public int Id { get; set; }
        [DisplayName("Mã Loại")]
        public string MaLoai { get; set; }
        [DisplayName("Tên Thể Loại")]
        public string TenLoai { get; set; }
		public string ImageName { get; set; }
		public string urlAnhDaiDien { get; set; }
        [NotMapped]
        public IFormFile AnhDaiDien { get; set; }
        public int? IdRoomInterface { get; set; }
        public InterfaceRoomDTO InterfaceRoomNavigation { get; set; }
        public ICollection<DetailProductDTO> DanhMucSanPham { get; set; }
    }
}
