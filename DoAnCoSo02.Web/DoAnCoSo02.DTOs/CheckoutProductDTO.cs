using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
    [Table("CheckoutProduct")]
	public class CheckoutProductDTO
	{
        public CheckoutProductDTO()
        {
            DetailCheckoutNavigation = new HashSet<DetailCheckoutDTO>();
        }
        [Key]
        public int Id { get; set; }
        public string HoTen { get; set; }
        public string Email { get; set; }
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string GhiChu { get; set; }
        public int TongHoaDon { get; set; }
        public int TongSanPhamMua { get; set; }
        public bool TrangThai { get; set; }
        public bool DaGiao { get; set; }
        public DateTime NgayDat { get; set; }
        public virtual ICollection<DetailCheckoutDTO> DetailCheckoutNavigation { get; set; }
    }
}
