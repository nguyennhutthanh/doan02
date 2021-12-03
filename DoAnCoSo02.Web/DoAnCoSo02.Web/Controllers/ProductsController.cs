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
	public class ProductsController : ControllerBase
	{
		private readonly ProductsRepo productsRepo;
		IWebHostEnvironment _host;
		public ProductsController(IWebHostEnvironment host)
		{
			_host = host;
			productsRepo = new ProductsRepo();
		}
		[HttpGet(template: "GetAllSanPham")]
		public async Task<IActionResult> GetAllSanPham()
		{
			var list = await productsRepo.GetAllSanPham();
			if (list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "GetRoomsProduct")]
		public async Task<IActionResult> GetRoomsTypeProduct()
		{
			var list = await productsRepo.GetRoomsTypeProduct();
			if(list == null)
			{
				return Ok(false);
			}
			return Ok(list);
		}
		[HttpGet(template: "GetProductByMaterial")]
		public async Task<IActionResult> GetProductByMaterial()
		{
			var data = await productsRepo.GetProductByMaterial();
			if(data == null)
			{
				return Ok(false);
			}
			return Ok(data);
		}
		[HttpGet(template: "GetProductBythuongHieu")]
		public async Task<IActionResult> GetProductBythuongHieu()
		{
			var data = await productsRepo.GetProductByThuongHieu();
			if (data == null)
			{
				return Ok(false);
			}
			return Ok(data);
		}
		[HttpGet(template: "GetBestSelling")]
		public async Task<IActionResult> GetBestSelling()
		{
			var listkhuyenmai = await productsRepo.GetBestSelling();
			if (listkhuyenmai == null)
			{
				return Ok(false);
			}
			return Ok(listkhuyenmai);
		}
		[HttpGet(template: "GetRelatedProduct/{id}")]
		public async Task<IActionResult> GetRelatedProduct(int id)
		{
			var ralated = await productsRepo.RelatedProducts(id);
			if (ralated == null)
			{
				return Ok(false);
			}
			return Ok(ralated);
		}
	}
}
