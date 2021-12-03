using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class updatecheckousasf : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TrangThai",
                table: "CheckoutProduct",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "CheckoutProduct");
        }
    }
}
