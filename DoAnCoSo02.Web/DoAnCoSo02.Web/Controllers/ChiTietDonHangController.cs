using DoAnCoSo02.Data.Respository;
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
	public class ChiTietDonHangController : ControllerBase
	{
		DonHangRepo donhangRepo;
		IWebHostEnvironment _host;
		public ChiTietDonHangController(IWebHostEnvironment host)
		{
			donhangRepo = new DonHangRepo();
			_host = host;
		}
		[HttpGet]
		public async Task<IActionResult> GetListDonHang()
		{
			var list = await donhangRepo.ShowListCheckout();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetChiTietDonHang(int id)
		{
			var listCt = await donhangRepo.DetailCheckout(id);
			if(listCt == null)
			{
				return Ok(false);
			}
			return Ok(listCt);
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteCheckout(int id)
		{
			donhangRepo.DeleteCheckout(id);
			donhangRepo.Save();
			return Ok(true);
		}
	}
}
