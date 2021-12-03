using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class thembangdanhmucanh : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DanhMucHinhs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UrlAnh = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAnhSanPhamId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucHinhs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DanhMucHinhs_DetailProduct_IsAnhSanPhamId",
                        column: x => x.IsAnhSanPhamId,
                        principalTable: "DetailProduct",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DanhMucHinhs_IsAnhSanPhamId",
                table: "DanhMucHinhs",
                column: "IsAnhSanPhamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DanhMucHinhs");

            migrationBuilder.AddColumn<int>(
                name: "IdLoaiTrangTri",
                table: "TypeProduct",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LoaiTrangTriNavigationId",
                table: "TypeProduct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DecorativeType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdDanhMuc = table.Column<int>(type: "int", nullable: true),
                    TenTheLoai = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DecorativeType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TypeProduct_LoaiTrangTriNavigationId",
                table: "TypeProduct",
                column: "LoaiTrangTriNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_TypeProduct_DecorativeType_LoaiTrangTriNavigationId",
                table: "TypeProduct",
                column: "LoaiTrangTriNavigationId",
                principalTable: "DecorativeType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
