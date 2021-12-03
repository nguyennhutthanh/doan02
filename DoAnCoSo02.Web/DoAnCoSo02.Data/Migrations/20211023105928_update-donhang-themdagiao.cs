using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class updatedonhangthemdagiao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "DaGiao",
                table: "CheckoutProduct",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaGiao",
                table: "CheckoutProduct");
        }
    }
}
