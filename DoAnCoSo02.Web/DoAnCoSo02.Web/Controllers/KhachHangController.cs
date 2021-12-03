using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class KhachHangController : ControllerBase
	{
		KhachHangRepo userRepo;
		IWebHostEnvironment _host;
		public KhachHangController(IWebHostEnvironment host)
		{
			userRepo = new KhachHangRepo();
			_host = host;
		}
		[HttpGet(template: "listUser")]
		public async Task<IActionResult> GetListUser()
		{
			var list = await userRepo.ListUser();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "listblockUser")]
		public async Task<IActionResult> GetListUserBlock()
		{
			var list = await userRepo.ListBlockUser();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "blockuser/{id}")]
		public async Task<IActionResult> GetBlockUser(int id)
		{
			var block = await userRepo.BlockUser(id);
			if (block != null)
			{
				return Ok(block);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpGet(template: "unblockuser/{id}")]
		public async Task<IActionResult> GetUnBlockUser(int id)
		{
			var block = await userRepo.UnBlockUser(id);
			if (block != null)
			{
				return Ok(block);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteUser(int id)
		{
			userRepo.Delete(id);
			userRepo.SaveChangesAsync();
			return Ok(true);
		}
	}
}
