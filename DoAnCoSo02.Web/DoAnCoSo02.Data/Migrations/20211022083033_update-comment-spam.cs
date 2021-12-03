using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class updatecommentspam : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Spam",
                table: "Comment",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Spam",
                table: "Comment");
        }
    }
}
