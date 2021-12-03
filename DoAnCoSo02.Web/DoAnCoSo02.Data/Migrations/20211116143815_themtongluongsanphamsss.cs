using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class themtongluongsanphamsss : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TongSanPhamMua",
                table: "CheckoutProduct",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TongSanPhamMua",
                table: "CheckoutProduct");
        }
    }
}
