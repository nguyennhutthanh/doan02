using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DoAnCoSo02.DTOs;
using DoAnCoSo02.Data.Respository;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using DoAnCoSo02.Data;
using DoAnCoSo02.Web.Common;

namespace DoAnCoSo02.Web.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DanhMucSpController : ControllerBase
	{
		DanhmucSanPhamRepo danhmucRepo;
		IWebHostEnvironment _host;
		public DanhMucSpController(IWebHostEnvironment host)
		{
			danhmucRepo = new DanhmucSanPhamRepo();
			_host = host;
		}
		//api/DanhMucSp
		[HttpGet]
		public IActionResult GetListDanhMuc()
		{
			var list = danhmucRepo.GetAllLoaiSanPham();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		//api/DanhMucSp
		[HttpPost]
		public ActionResult PostDanhMuc([FromForm] DanhMucProductDTO danhmuc)
		{
			if (danhmuc.TenLoai == null)
			{
				return Ok(false);
			}
			else
			{
				if (danhmuc.AnhDaiDien != null)
				{
					var IsImage = ImagesPath.IsImage(danhmuc.AnhDaiDien);
					if (IsImage == true)
					{
						var uniqueFileName = ImagesPath.GetUniqueFileName(danhmuc.AnhDaiDien.FileName);
						var uploads = Path.Combine(_host.WebRootPath, "Images");
						var filePath = Path.Combine(uploads, uniqueFileName);
						danhmuc.AnhDaiDien.CopyTo(new FileStream(filePath, FileMode.Create));
						danhmuc.ImageName = uniqueFileName;
						danhmuc.urlAnhDaiDien = ImagesPath.PathImages("Images/",uniqueFileName);
					}
					else
					{
						throw new Exception("File ảnh không phù hợp");
					}
				}
				danhmucRepo.AddDanhMuc(danhmuc);
				danhmucRepo.Save();
			}
			return Ok(danhmuc);
		}
		//api/DanhMucSp/id 
		[HttpPut("{id}")]
		public IActionResult PutDanhMuc([FromForm] DanhMucProductDTO danhMuc)
		{
			var find = danhmucRepo.GetLoaiSp(danhMuc.Id);
			if (danhMuc.TenLoai != null)
			{
				find.TenLoai = danhMuc.TenLoai;
			}
			if (danhMuc.AnhDaiDien != null)
			{
				var IsImage = ImagesPath.IsImage(danhMuc.AnhDaiDien);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(danhMuc.AnhDaiDien.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "Images");
					var filePath = Path.Combine(uploads, uniqueFileName);
					danhMuc.AnhDaiDien.CopyTo(new FileStream(filePath, FileMode.Create));
					find.ImageName = uniqueFileName;
					find.urlAnhDaiDien = ImagesPath.PathImages("Images/",uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			danhmucRepo.UpdateDanhMuc(danhMuc);
			danhmucRepo.Save();
			return Ok(danhMuc);
		}
		//api/DanhMucSp/id 
		[HttpDelete("{id}")]
		public IActionResult DeletetTheLoai(int id)
		{
			danhmucRepo.DeleteLoaiSp(id);
			danhmucRepo.Save();
			return Ok(true);
		}
	}
}
