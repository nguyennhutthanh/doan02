using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using DoAnCoSo02.Web.Common;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DonHangController : ControllerBase
	{
		DonHangRepo donhangRepo;
		IWebHostEnvironment _host;
		public DonHangController(IWebHostEnvironment host)
		{
			_host = host;
			donhangRepo = new DonHangRepo();
		}
		[HttpGet(template: "listdonhang")]
		public async Task<IActionResult> GetListDonHang()
		{
			var list = await donhangRepo.ShowListCheckout();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "listdonhangdagiao")]
		public async Task<IActionResult> GetListDonHangDaGiao()
		{
			var list = await donhangRepo.ShowListDonDaGiao();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "setdonhangdagiao/{id}")]
		public async Task<IActionResult> SetDonHangDaGiao(int id)
		{
			var result = await donhangRepo.SetDaGiaoHang(id);
			if(result != null)
			{
				return Ok(result);
			}else
			{
				return Ok(false);
			}	
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteDonHang(int id)
		{
			donhangRepo.DeleteCheckout(id);
			donhangRepo.Save();
			return Ok(true);
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetChiTietDon(int id)
		{
			await donhangRepo.SetTrangThai(id);
			var detail = await donhangRepo.DetailCheckout(id);
			if (detail != null)
			{
				return Ok(detail);
			}
			else
			{
				return Ok(false); 
			}
		}
		[HttpGet("CustommerProduct/{id}")]
		public async Task<IActionResult> GetChiTietDons(int id)
		{
			await donhangRepo.SetTrangThai(id);
			var detail = await donhangRepo.CustommerProduct(id);
			if (detail != null)
			{
				return Ok(detail);
			}
			else
			{
				return Ok(false);
			}
		}
	}
}