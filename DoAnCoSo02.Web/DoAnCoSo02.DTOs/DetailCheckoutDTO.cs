using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoAnCoSo02.DTOs
{
	[Table("DetailCheckout")]
	public class DetailCheckoutDTO
	{
        public DetailCheckoutDTO()
		{
            CheckoutNavigation = new CheckoutProductDTO();
            CheckoutProduct = new DetailProductDTO();
        }
        public int SoLuong { get; set; }
        public int ThanhTien { get; set; }
        public bool TrangThai { get; set; }
        public int IdCheckout { get; set; }
        public int IdSanPham { get; set; }
        [ForeignKey("IdCheckout")]
        public CheckoutProductDTO CheckoutNavigation { get; set; }
        [ForeignKey("IdSanPham")]
        public virtual DetailProductDTO CheckoutProduct { get; set; }
    }
}
