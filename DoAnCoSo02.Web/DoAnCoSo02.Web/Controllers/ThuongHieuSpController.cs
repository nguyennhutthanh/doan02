using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Web.Common;
using System.IO;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ThuongHieuSpController : ControllerBase
	{
		ThuongHieuRepo thuonghieuRepo;
		IWebHostEnvironment _host;
		public ThuongHieuSpController(IWebHostEnvironment host)
		{
			thuonghieuRepo = new ThuongHieuRepo();
			_host = host;
		}
		[HttpGet]
		public IActionResult GetListThuongHieu()
		{
			var list = thuonghieuRepo.ShowListThuongHieu();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpPost]
		public ActionResult PostThuongHieu([FromForm] ThuongHieuProductDTO thuonghieuSp)
		{
			if(thuonghieuSp.TenThuongHieu == null)
			{
				return Ok(false);
			}
			if(thuonghieuSp.AnhThuongHieu != null)
			{
				var IsImage = ImagesPath.IsImage(thuonghieuSp.AnhThuongHieu);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(thuonghieuSp.AnhThuongHieu.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesThuongHieu");
					var filePath = Path.Combine(uploads, uniqueFileName);
					thuonghieuSp.AnhThuongHieu.CopyTo(new FileStream(filePath, FileMode.Create));
					thuonghieuSp.UrlAnhThuongHieu = ImagesPath.PathImages("ImagesThuongHieu/",uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			thuonghieuRepo.AddTrademark(thuonghieuSp);
			thuonghieuRepo.Save();
			return Ok(thuonghieuSp);
		}
		[HttpPut("{id}")]
		public IActionResult PutThuongHieuSp([FromForm] ThuongHieuProductDTO thuonghieuSp)
		{
			var find = thuonghieuRepo.GetThuongHieu(thuonghieuSp.Id);
			if(thuonghieuSp.TenThuongHieu != null)
			{
				find.TenThuongHieu = thuonghieuSp.TenThuongHieu;
			}
			if (thuonghieuSp.AnhThuongHieu != null)
			{
				var IsImage = ImagesPath.IsImage(thuonghieuSp.AnhThuongHieu);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(thuonghieuSp.AnhThuongHieu.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesThuongHieu");
					var filePath = Path.Combine(uploads, uniqueFileName);
					thuonghieuSp.AnhThuongHieu.CopyTo(new FileStream(filePath, FileMode.Create));
					find.UrlAnhThuongHieu = ImagesPath.PathImages("ImagesThuongHieu/",uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			thuonghieuRepo.Save();
			return Ok(thuonghieuSp);
		}
		[HttpDelete("{id}")]
		public IActionResult DeleteThuongHieu(int id)
		{
			thuonghieuRepo.DeleteThuongHieu(id);
			thuonghieuRepo.Save();
			return Ok(true);
		}
	}
}
