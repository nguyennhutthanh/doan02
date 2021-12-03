using DoAnCoSo02.Data.Respository;
using DoAnCoSo02.DTOs;
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
	public class KhuyenMaiController : ControllerBase
	{
		KhuyenMaiRepo khuyenmaiRepo;
		IWebHostEnvironment _host;
		public KhuyenMaiController(IWebHostEnvironment host)
		{
			khuyenmaiRepo = new KhuyenMaiRepo();
			_host = host;
		}
		[HttpGet]
		public async Task<ActionResult> GetListKhuyenMai()
		{
			var list = await khuyenmaiRepo.ListKhuyenMai();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpPost]
		public async Task<IActionResult> PostKhuyenMai([FromForm] KhuyenMaiProductDTO khuyenMai)
		{
			bool issucess = await khuyenmaiRepo.AddProduct(khuyenMai);
			if (issucess)
			{
				return Ok(khuyenMai);
			}else
			{
				return Ok(false);
			}	
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteDiscount(int id)
		{
			khuyenmaiRepo.DeleteDiscount(id);
			khuyenmaiRepo.Save();
			return Ok(true);
		}
	}
}
