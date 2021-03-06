// <auto-generated />
using System;
using DoAnCoSo02.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DoAnCoSo02.Data.Migrations
{
    [DbContext(typeof(DoAnCoSo2DbContext))]
    [Migration("20210918102249_themdb")]
    partial class themdb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DoAnCoSo02.DTOs.AdminDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Avatar")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("bit");

                    b.Property<bool>("IsSuperAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("Password")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Salt")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("Id");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.CheckoutProductDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GhiChu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgayDat")
                        .HasColumnType("datetime2");

                    b.Property<string>("SDT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TongHoaDon")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("CheckoutProduct");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.CommentDTO", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgayBinhLuan")
                        .HasColumnType("datetime2");

                    b.Property<string>("NoiDung")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("TrangThai")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("IdProduct");

                    b.ToTable("Comment");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ConfigDTO", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Name");

                    b.ToTable("Config");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ContactDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NoiDung")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SDT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool?>("TrangThai")
                        .HasColumnType("bit");

                    b.HasKey("Id");

                    b.ToTable("Contact");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.CusTomerDTO", b =>
                {
                    b.Property<int>("IdKhach")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DiaChi")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HoTen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsBlocked")
                        .HasColumnType("bit");

                    b.Property<DateTime>("NgayTaoTK")
                        .HasColumnType("datetime2");

                    b.Property<string>("PassWp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SDT")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdKhach");

                    b.ToTable("CusTomer");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DanhMucProductDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("IdLoaiTrangTri")
                        .HasColumnType("int");

                    b.Property<string>("ImageName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LoaiTrangTriNavigationId")
                        .HasColumnType("int");

                    b.Property<string>("MaLoai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenLoai")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("urlAnhDaiDien")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("LoaiTrangTriNavigationId");

                    b.ToTable("TypeProduct");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DetailCheckoutDTO", b =>
                {
                    b.Property<int>("IdCheckout")
                        .HasColumnType("int");

                    b.Property<int>("IdSanPham")
                        .HasColumnType("int");

                    b.Property<int>("SoLuong")
                        .HasColumnType("int");

                    b.Property<int>("ThanhTien")
                        .HasColumnType("int");

                    b.HasKey("IdCheckout", "IdSanPham");

                    b.HasIndex("IdSanPham");

                    b.ToTable("DetailCheckout");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DetailProductDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BaoHanh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ChatLieuNavigationid")
                        .HasColumnType("int");

                    b.Property<int?>("DanhmucNavigationId")
                        .HasColumnType("int");

                    b.Property<double>("GiaSP")
                        .HasColumnType("float");

                    b.Property<int?>("IdBinhLuan")
                        .HasColumnType("int");

                    b.Property<int?>("IdChatLieu")
                        .HasColumnType("int");

                    b.Property<int?>("IdDanhMucHinh")
                        .HasColumnType("int");

                    b.Property<int?>("IdDanhmuc")
                        .HasColumnType("int");

                    b.Property<int?>("IdDatHang")
                        .HasColumnType("int");

                    b.Property<int?>("IdDiscount")
                        .HasColumnType("int");

                    b.Property<int?>("IdThuongHieu")
                        .HasColumnType("int");

                    b.Property<int?>("KhuyenMaiNavigationid")
                        .HasColumnType("int");

                    b.Property<string>("KichThuoc")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MaSP")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Mota")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("NgayThem")
                        .HasColumnType("datetime2");

                    b.Property<string>("Review")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Size")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Soluong")
                        .HasColumnType("int");

                    b.Property<string>("TenSP")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ThuongHieuNavigationId")
                        .HasColumnType("int");

                    b.Property<bool?>("TrangThai")
                        .HasColumnType("bit");

                    b.Property<string>("UrlAnhSanPham")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("XuatXu")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ChatLieuNavigationid");

                    b.HasIndex("DanhmucNavigationId");

                    b.HasIndex("KhuyenMaiNavigationid");

                    b.HasIndex("ThuongHieuNavigationId");

                    b.ToTable("DetailProduct");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ForgotPassDTO", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreateTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("GhoshTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdAdmin")
                        .HasColumnType("int");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.HasKey("id");

                    b.HasIndex("IdAdmin");

                    b.ToTable("ForgotPassWp");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.KhuyenMaiProductDTO", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Expire")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdProduct")
                        .HasColumnType("int");

                    b.Property<float>("Sale")
                        .HasColumnType("real");

                    b.HasKey("id");

                    b.ToTable("KhuyenMaiProducts");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.LoaiTrangTriDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("IdDanhMuc")
                        .HasColumnType("int");

                    b.Property<string>("TenTheLoai")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DecorativeType");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ProductMaterialDTO", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TenAnh")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TenChatLieu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("urlAnhChatLieu")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("id");

                    b.ToTable("MaterialProduct");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ThuongHieuProductDTO", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TenThuongHieu")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UrlAnhThuongHieu")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Trademark");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.CommentDTO", b =>
                {
                    b.HasOne("DoAnCoSo02.DTOs.DetailProductDTO", "IdComment")
                        .WithMany("CommentsNavigation")
                        .HasForeignKey("IdProduct")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdComment");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DanhMucProductDTO", b =>
                {
                    b.HasOne("DoAnCoSo02.DTOs.LoaiTrangTriDTO", "LoaiTrangTriNavigation")
                        .WithMany("DanhMucProducts")
                        .HasForeignKey("LoaiTrangTriNavigationId");

                    b.Navigation("LoaiTrangTriNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DetailCheckoutDTO", b =>
                {
                    b.HasOne("DoAnCoSo02.DTOs.CheckoutProductDTO", "CheckoutNavigation")
                        .WithMany("DetailCheckoutNavigation")
                        .HasForeignKey("IdCheckout")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("DoAnCoSo02.DTOs.DetailProductDTO", "CheckoutProduct")
                        .WithMany("DetaiCheckoutNavigation")
                        .HasForeignKey("IdSanPham")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CheckoutNavigation");

                    b.Navigation("CheckoutProduct");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DetailProductDTO", b =>
                {
                    b.HasOne("DoAnCoSo02.DTOs.ProductMaterialDTO", "ChatLieuNavigation")
                        .WithMany("ChatLieuNavigation")
                        .HasForeignKey("ChatLieuNavigationid");

                    b.HasOne("DoAnCoSo02.DTOs.DanhMucProductDTO", "DanhmucNavigation")
                        .WithMany("DanhMucSanPham")
                        .HasForeignKey("DanhmucNavigationId");

                    b.HasOne("DoAnCoSo02.DTOs.KhuyenMaiProductDTO", "KhuyenMaiNavigation")
                        .WithMany("ProductCodeNavigation")
                        .HasForeignKey("KhuyenMaiNavigationid");

                    b.HasOne("DoAnCoSo02.DTOs.ThuongHieuProductDTO", "ThuongHieuNavigation")
                        .WithMany("ThuongHieuProducts")
                        .HasForeignKey("ThuongHieuNavigationId");

                    b.Navigation("ChatLieuNavigation");

                    b.Navigation("DanhmucNavigation");

                    b.Navigation("KhuyenMaiNavigation");

                    b.Navigation("ThuongHieuNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ForgotPassDTO", b =>
                {
                    b.HasOne("DoAnCoSo02.DTOs.AdminDTO", "IsAdmin")
                        .WithMany("IsAdmin")
                        .HasForeignKey("IdAdmin")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IsAdmin");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.AdminDTO", b =>
                {
                    b.Navigation("IsAdmin");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.CheckoutProductDTO", b =>
                {
                    b.Navigation("DetailCheckoutNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DanhMucProductDTO", b =>
                {
                    b.Navigation("DanhMucSanPham");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.DetailProductDTO", b =>
                {
                    b.Navigation("CommentsNavigation");

                    b.Navigation("DetaiCheckoutNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.KhuyenMaiProductDTO", b =>
                {
                    b.Navigation("ProductCodeNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.LoaiTrangTriDTO", b =>
                {
                    b.Navigation("DanhMucProducts");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ProductMaterialDTO", b =>
                {
                    b.Navigation("ChatLieuNavigation");
                });

            modelBuilder.Entity("DoAnCoSo02.DTOs.ThuongHieuProductDTO", b =>
                {
                    b.Navigation("ThuongHieuProducts");
                });
#pragma warning restore 612, 618
        }
    }
}
