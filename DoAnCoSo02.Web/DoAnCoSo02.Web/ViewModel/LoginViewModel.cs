using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.ViewModel
{
	public class LoginViewModel
	{
		[DisplayName("Tên đăng nhập")]
		public string UserName { get; set; }
		[DisplayName("Mật khẩu")]
		[DataType(DataType.Password)]
		public string Password { get; set; }
		public bool check { get; set; }
	}
}
