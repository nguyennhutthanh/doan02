using DoAnCoSo02.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.ViewModel
{
    public class Test
	{
		public int Id { get; set; }
		public int CartQuantity { get; set; }
		public int GiaSP { get; set; }
		public KhuyenMaiProductDTO KhuyenMaiNavigation { get; set; }
	}
}
