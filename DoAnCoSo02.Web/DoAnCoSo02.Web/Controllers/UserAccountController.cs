using DoAnCoSo02.Data.Respository;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Web.Common;
using DoAnCoSo02.Web.ViewModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserAccountController : ControllerBase
	{
		UserAccountRepo userRepo;
		IWebHostEnvironment _host;
		public UserAccountController(IWebHostEnvironment host)
		{
			userRepo = new UserAccountRepo();
			_host = host;
		}
		[HttpPost(template: "SignUpUser")]
		public async Task<IActionResult> SignUpUser([FromForm] CusTomerDTO cusTomer)
		{
			CusTomerDTO cus = new CusTomerDTO()
			{
				HoTen = cusTomer.HoTen,
				SDT = cusTomer.SDT,
				DiaChi = cusTomer.DiaChi,
				Email = cusTomer.Email,
				PassWp = PassWordHelper.MD5Hash(cusTomer.PassWp),
				UserName = cusTomer.UserName,
				NgayTaoTK = DateTime.Now
			};
			userRepo.CreateAccountUser(cus);
			return Ok(cus);
		}
		[HttpPost(template:"SignInUser")]
		public async Task<IActionResult> SignIn([FromForm] LoginUserViewModel loginUserView)
		{
			if (loginUserView.username != null && loginUserView.password != null)
			{
				string pass = PassWordHelper.MD5Hash(loginUserView.password);
				var isSuccess = userRepo.CheckKH(loginUserView.username, pass);
				if (isSuccess.IdKhach != 0)
				{
					return Ok(isSuccess);
				}
				else
				{
					return Ok(false);
				}
			}
			return Ok(false);
		}
	}
}
