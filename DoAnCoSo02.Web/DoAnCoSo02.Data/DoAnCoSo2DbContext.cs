using DoAnCoSo02.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DoAnCoSo02.Data
{
	public class DoAnCoSo2DbContext : DbContext
	{
		public DoAnCoSo2DbContext() { }
		public DoAnCoSo2DbContext(DbContextOptions<DoAnCoSo2DbContext> options) : base(options) { }
		public virtual DbSet<AdminDTO> Admins { get; set; }
		public virtual DbSet<CheckoutProductDTO> CheckoutProducts { get; set; }
		public virtual DbSet<CommentDTO> Comments { get; set; }
		public virtual DbSet<ConfigDTO> Configs { get; set; }
		public virtual DbSet<ContactDTO> Contacts { get; set; }
		public virtual DbSet<CusTomerDTO> CusTomers { get; set; }
		public virtual DbSet<DanhMucProductDTO> DanhMucProducts { get; set; }
		public virtual DbSet<DetailCheckoutDTO> DetailCheckouts { get; set; }
		public virtual DbSet<DetailProductDTO> DetailProducts { get; set; }
		public virtual DbSet<ForgotPassDTO> ForgotPass { get; set; }
		public virtual DbSet<KhuyenMaiProductDTO> KhuyenMaiProducts { get; set; }
		public virtual DbSet<ProductMaterialDTO> ProductMaterials { get; set; }
		public virtual DbSet<ThuongHieuProductDTO> ThuongHieuProducts { get; set; }
		public virtual DbSet<DanhMucHinhDTO> DanhMucHinhs { get; set; }
		public virtual DbSet<InterfaceRoomDTO> danhmucRooms { get; set; }
		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			var Builder = new ConfigurationBuilder()
					.AddJsonFile("appsettings.json", optional: false)
					.Build();
			optionsBuilder.UseSqlServer(Builder.GetConnectionString("DoAnCoSo2Db"));
		}
		protected override void OnModelCreating(ModelBuilder modelBuilder){
			modelBuilder.Entity<DetailCheckoutDTO>().HasKey(x => new { x.IdCheckout, x.IdSanPham });
		}
	}
}
