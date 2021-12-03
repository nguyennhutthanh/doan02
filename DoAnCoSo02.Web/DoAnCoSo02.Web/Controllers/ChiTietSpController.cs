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
	public class ChiTietSpController : ControllerBase
	{
		IWebHostEnvironment _host;
		public ChiTietSanPhamRepo productRepo;
		public ChiTietSpController(IWebHostEnvironment host)
		{
			_host = host;
			productRepo = new ChiTietSanPhamRepo();
		}
		[HttpGet]
		public async Task<ActionResult> GetListSanPham()
		{
			var list = await productRepo.ShowList();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpPost]
		public async Task<IActionResult> PostChiTietSp([FromForm] DetailProductDTO chitietSp)
		{
			if (chitietSp.AnhSanPham != null)
			{
				var IsImage = ImagesPath.IsImage(chitietSp.AnhSanPham);
				if (IsImage == true)
				{
					var uniqueFileName = ImagesPath.GetUniqueFileName(chitietSp.AnhSanPham.FileName);
					var uploads = Path.Combine(_host.WebRootPath, "ImagesSanPham");
					var filePath = Path.Combine(uploads, uniqueFileName);
					chitietSp.AnhSanPham.CopyTo(new FileStream(filePath, FileMode.Create));
					chitietSp.UrlAnhSanPham = ImagesPath.PathImages("ImagesSanPham/", uniqueFileName);
				}
				else
				{
					throw new Exception("File ảnh không phù hợp");
				}
			}
			if (chitietSp.ListFileAnh != null || chitietSp.ListFileAnh.Count() > 0)
			{
				foreach (IFormFile item in chitietSp.ListFileAnh)
				{
					var IsImage = ImagesPath.IsImage(item);
					if (IsImage == true)
					{
						var uniqueFileName = ImagesPath.GetUniqueFileName(item.FileName);
						var uploads = Path.Combine(_host.WebRootPath, "ImagesListSanPham");
						var filePath = Path.Combine(uploads, uniqueFileName);
						item.CopyTo(new FileStream(filePath, FileMode.Create));
						chitietSp.DanhMucHinhNavigation.Add(new DanhMucHinhDTO()
						{
							UrlAnh = ImagesPath.PathImages("ImagesListSanPham/", uniqueFileName),
							TenAnh = uniqueFileName
						});
					}
					else
					{
						throw new Exception("File ảnh không phù hợp");
					}
				}
			}
			bool issucess = await productRepo.AddProduct(chitietSp);
			if (issucess)
			{
				return Ok(true);
			}
			else
			{
				return Ok(false);
			}
		}
		[HttpGet("{id}")]
		public async Task<IActionResult> GetSanPham(int id)
		{
			var find = await productRepo.GetSanPham(id);
			if(find != null)
			{
				return Ok(find);
			}
			return Ok(false);
		}
		[HttpPut("{id}")]
		public async Task<IActionResult> PutChiTietSp([FromForm] DetailProductDTO chitietSp)
		{
			var find = await productRepo.GetSanPham(chitietSp.Id);
			if(find != null)
			{
				if (chitietSp.AnhSanPham != null)
				{
					var IsImage = ImagesPath.IsImage(chitietSp.AnhSanPham);
					if (IsImage == true)
					{
						var uniqueFileName = ImagesPath.GetUniqueFileName(chitietSp.AnhSanPham.FileName);
						var uploads = Path.Combine(_host.WebRootPath, "ImagesSanPham");
						var filePath = Path.Combine(uploads, uniqueFileName);
						chitietSp.AnhSanPham.CopyTo(new FileStream(filePath, FileMode.Create));
						chitietSp.UrlAnhSanPham = ImagesPath.PathImages("ImagesSanPham/", uniqueFileName);
					}
					else
					{
						throw new Exception("File ảnh không phù hợp");
					}
				}
				if (chitietSp.ListFileAnh != null)
				{
					productRepo.DeleteListImage(chitietSp.Id);

					foreach (IFormFile item in chitietSp.ListFileAnh)
					{
						var IsImage = ImagesPath.IsImage(item);
						if (IsImage == true)
						{
							var uniqueFileName = ImagesPath.GetUniqueFileName(item.FileName);
							var uploads = Path.Combine(_host.WebRootPath, "ImagesListSanPham");
							var filePath = Path.Combine(uploads, uniqueFileName);
							item.CopyTo(new FileStream(filePath, FileMode.Create));
							chitietSp.DanhMucHinhNavigation.Add(new DanhMucHinhDTO()
							{
								UrlAnh = ImagesPath.PathImages("ImagesListSanPham/", uniqueFileName),
								TenAnh = uniqueFileName
							});
						}
						else
						{
							throw new Exception("File ảnh không phù hợp");
						}
					}
				}
				await productRepo.UpdateProduct(chitietSp);
				productRepo.SaveChangesAsync();
				return Ok(true);
			}else
			{
				return Ok(false);
			}	
		}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteChiTietSp(int id)
		{
			productRepo.DeleteProduct(id);
			return Ok(true);
		}
		[HttpGet(template: "GetlistdanhmucCT")]
		public IActionResult GetListDanhMucCT()
		{
			var list = productRepo.GetListDanhmuc();
			return Ok(list);
		}
		[HttpGet(template: "GetlistchatlieuCT")]
		public IActionResult GetListChatLieuCT()
		{
			var list = productRepo.GetListChatlieu();
			return Ok(list);
		}
		[HttpGet(template: "GetlistthuonghieuCT")]
		public IActionResult GetListThuongHieuCT()
		{
			var list = productRepo.GetListThuonghieu();
			return Ok(list);
		}
		[HttpGet(template: "GetlistkhuyenmaiCT")]
		public IActionResult GetListKhuyenMai()
		{
			var list = productRepo.GetListKhuyenmai();
			return Ok(list);
		}
	}
}
