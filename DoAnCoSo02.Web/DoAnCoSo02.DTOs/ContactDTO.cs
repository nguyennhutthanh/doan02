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
    [Table("Contact")]
    public class ContactDTO
	{
        [Key]
        public int Id { get; set; }
        [DisplayName("Họ Và Tên")]
        public string HoTen { get; set; }
        [DisplayName("Số Điện Thoại")]
        public string SDT { get; set; }
        [DisplayName("Địa Chỉ")]
        public string DiaChi { get; set; }
        public string Email { get; set; }
        [DisplayName("Lời Gữi")]
        public string NoiDung { get; set; }
        public bool? TrangThai { get; set; }
    }
}
