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
	public class HomeController : ControllerBase
	{
		private readonly HomeRepo homeRepo;
		IWebHostEnvironment _host;
		public HomeController(IWebHostEnvironment host)
		{
			_host = host;
			homeRepo = new HomeRepo();
		}
		[HttpGet(template: "SanPhamMoiNhat")]
		public async Task<IActionResult> GetSanPhamMoiNhat()
		{
			var list = await homeRepo.SanPhamMoiNhat();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "SanPhamCoHan")]
		public async Task<IActionResult> GetSanPhamCoHan()
		{
			var list = await homeRepo.SanPhamCoHan();
			var count = list.Count();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "SanPhamBanChay")]
		public async Task<IActionResult> GetSanPhamBanChay()
		{
			var list = await homeRepo.SanPhamBanChay();
			if(list == null) 
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "GetLoaiSanPham")]
		public async Task<IActionResult> GetListLoaiSanPham()
		{
			var listloai = await homeRepo.Getloaisanpham();
			if(listloai == null)
			{
				return Ok(false);
			}
			return Ok(listloai);
		}
		[HttpGet(template: "SanPhamKhuyenMai")]
		public async Task<IActionResult> GetSanPhamKhuyenMai()
		{
			var listkhuyenmai = await homeRepo.SanPhamKhuyenMai();
			if(listkhuyenmai == null)
			{
				return Ok(false);
			}
			return Ok(listkhuyenmai);
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetDetailProduct(int id)
		{
			var detail = await homeRepo.GetDetailtProduct(id);
			if(detail == null)
			{
				return Ok(false);
			}
			return Ok(detail);
		}
		[HttpGet(template:"SanPhamtheoLoai/{id}")]
		public async Task<IActionResult> GetSanPhamTheoLoai(int id)
		{
			var loaisanpham = await homeRepo.SanPhamTheoLoai(id);
			if(loaisanpham == null)
			{
				return Ok(false);
			}
			return Ok(loaisanpham);
		}
		[HttpGet(template:"ListDanhMucSp")]
		public async Task<IActionResult> GetListDanhMuc()
		{
			var list = await homeRepo.ListDanhMuc();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "GetListSanPhamLoai")]
		public async Task<IActionResult> SanPhamTheoLoai()
		{
			var list = await homeRepo.GetListSanPhamLoai();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
	}
}
