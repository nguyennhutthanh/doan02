using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class themdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Salt = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    IsSuperAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsBlocked = table.Column<bool>(type: "bit", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CheckoutProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GhiChu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TongHoaDon = table.Column<int>(type: "int", nullable: false),
                    NgayDat = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CheckoutProduct", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Config",
                columns: table => new
                {
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Config", x => x.Name);
                });

            migrationBuilder.CreateTable(
                name: "Contact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CusTomer",
                columns: table => new
                {
                    IdKhach = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HoTen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SDT = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PassWp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsBlocked = table.Column<bool>(type: "bit", nullable: false),
                    NgayTaoTK = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CusTomer", x => x.IdKhach);
                });

            migrationBuilder.CreateTable(
                name: "DecorativeType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenTheLoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdDanhMuc = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecorativeType", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KhuyenMaiProducts",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sale = table.Column<float>(type: "real", nullable: false),
                    Expire = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdProduct = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhuyenMaiProducts", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "MaterialProduct",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenChatLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    urlAnhChatLieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenAnh = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaterialProduct", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Trademark",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenThuongHieu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlAnhThuongHieu = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trademark", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ForgotPassWp",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GhoshTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IdAdmin = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForgotPassWp", x => x.id);
                    table.ForeignKey(
                        name: "FK_ForgotPassWp_Admin_IdAdmin",
                        column: x => x.IdAdmin,
                        principalTable: "Admin",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TypeProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaLoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenLoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    urlAnhDaiDien = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IdLoaiTrangTri = table.Column<int>(type: "int", nullable: true),
                    LoaiTrangTriNavigationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TypeProduct_DecorativeType_LoaiTrangTriNavigationId",
                        column: x => x.LoaiTrangTriNavigationId,
                        principalTable: "DecorativeType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DetailProduct",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MaSP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenSP = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GiaSP = table.Column<double>(type: "float", nullable: false),
                    UrlAnhSanPham = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Soluong = table.Column<int>(type: "int", nullable: false),
                    NgayThem = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Mota = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Review = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    XuatXu = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BaoHanh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KichThuoc = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: true),
                    IdDanhmuc = table.Column<int>(type: "int", nullable: true),
                    IdBinhLuan = table.Column<int>(type: "int", nullable: true),
                    IdThuongHieu = table.Column<int>(type: "int", nullable: true),
                    IdDatHang = table.Column<int>(type: "int", nullable: true),
                    IdChatLieu = table.Column<int>(type: "int", nullable: true),
                    IdDanhMucHinh = table.Column<int>(type: "int", nullable: true),
                    IdDiscount = table.Column<int>(type: "int", nullable: true),
                    DanhmucNavigationId = table.Column<int>(type: "int", nullable: true),
                    ThuongHieuNavigationId = table.Column<int>(type: "int", nullable: true),
                    ChatLieuNavigationid = table.Column<int>(type: "int", nullable: true),
                    KhuyenMaiNavigationid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailProduct", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailProduct_KhuyenMaiProducts_KhuyenMaiNavigationid",
                        column: x => x.KhuyenMaiNavigationid,
                        principalTable: "KhuyenMaiProducts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DetailProduct_MaterialProduct_ChatLieuNavigationid",
                        column: x => x.ChatLieuNavigationid,
                        principalTable: "MaterialProduct",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DetailProduct_Trademark_ThuongHieuNavigationId",
                        column: x => x.ThuongHieuNavigationId,
                        principalTable: "Trademark",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DetailProduct_TypeProduct_DanhmucNavigationId",
                        column: x => x.DanhmucNavigationId,
                        principalTable: "TypeProduct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NgayBinhLuan = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrangThai = table.Column<bool>(type: "bit", nullable: true),
                    IdProduct = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.id);
                    table.ForeignKey(
                        name: "FK_Comment_DetailProduct_IdProduct",
                        column: x => x.IdProduct,
                        principalTable: "DetailProduct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailCheckout",
                columns: table => new
                {
                    IdCheckout = table.Column<int>(type: "int", nullable: false),
                    IdSanPham = table.Column<int>(type: "int", nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    ThanhTien = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailCheckout", x => new { x.IdCheckout, x.IdSanPham });
                    table.ForeignKey(
                        name: "FK_DetailCheckout_CheckoutProduct_IdCheckout",
                        column: x => x.IdCheckout,
                        principalTable: "CheckoutProduct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DetailCheckout_DetailProduct_IdSanPham",
                        column: x => x.IdSanPham,
                        principalTable: "DetailProduct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_IdProduct",
                table: "Comment",
                column: "IdProduct");

            migrationBuilder.CreateIndex(
                name: "IX_DetailCheckout_IdSanPham",
                table: "DetailCheckout",
                column: "IdSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_DetailProduct_ChatLieuNavigationid",
                table: "DetailProduct",
                column: "ChatLieuNavigationid");

            migrationBuilder.CreateIndex(
                name: "IX_DetailProduct_DanhmucNavigationId",
                table: "DetailProduct",
                column: "DanhmucNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailProduct_KhuyenMaiNavigationid",
                table: "DetailProduct",
                column: "KhuyenMaiNavigationid");

            migrationBuilder.CreateIndex(
                name: "IX_DetailProduct_ThuongHieuNavigationId",
                table: "DetailProduct",
                column: "ThuongHieuNavigationId");

            migrationBuilder.CreateIndex(
                name: "IX_ForgotPassWp_IdAdmin",
                table: "ForgotPassWp",
                column: "IdAdmin");

            migrationBuilder.CreateIndex(
                name: "IX_TypeProduct_LoaiTrangTriNavigationId",
                table: "TypeProduct",
                column: "LoaiTrangTriNavigationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.DropTable(
                name: "Config");

            migrationBuilder.DropTable(
                name: "Contact");

            migrationBuilder.DropTable(
                name: "CusTomer");

            migrationBuilder.DropTable(
                name: "DetailCheckout");

            migrationBuilder.DropTable(
                name: "ForgotPassWp");

            migrationBuilder.DropTable(
                name: "CheckoutProduct");

            migrationBuilder.DropTable(
                name: "DetailProduct");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "KhuyenMaiProducts");

            migrationBuilder.DropTable(
                name: "MaterialProduct");

            migrationBuilder.DropTable(
                name: "Trademark");

            migrationBuilder.DropTable(
                name: "TypeProduct");

            migrationBuilder.DropTable(
                name: "DecorativeType");
        }
    }
}
